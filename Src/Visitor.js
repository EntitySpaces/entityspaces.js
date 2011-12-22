
es.Visit = function (obj) {
    if (!(this instanceof es.Visit)) {
        return new es.Visit(obj);
    }
    this.value = obj;
};

es.Visit.prototype.forEach = function (cb) {
    this.value = walk(this.value, cb, false);
    return this.value;
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var walk = function(root, cb, immutable) {
    var path = [];
    var parents = [];
    var alive = true;

    return (function walker(node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};

        var keepGoing = true;

        var state = {
            node: node,
            node_: node_,
            path: [].concat(path),
            parent: parents[parents.length - 1],
            parents: parents,
            key: path.slice(-1)[0],
            isRoot: path.length === 0,
            level: path.length,
            circular: null,
            update: function (x, stopHere) {
                if (!state.isRoot) {
                    state.parent.node[state.key] = x;
                }
                state.node = x;
                if (stopHere) { keepGoing = false; }
            },
            'delete': function (stopHere) {
                delete state.parent.node[state.key];
                if (stopHere) { keepGoing = false; }
            },
            remove: function (stopHere) {
                if (es.isArray(state.parent.node)) {
                    state.parent.node.splice(state.key, 1);
                } else {
                    delete state.parent.node[state.key];
                }
                if (stopHere) { keepGoing = false; }
            },
            keys: null,
            before: function (f) { modifiers.before = f; },
            after: function (f) { modifiers.after = f; },
            pre: function (f) { modifiers.pre = f; },
            post: function (f) { modifiers.post = f; },
            stop: function () { alive = false; },
            block: function () { keepGoing = false; }
        };

        if (!alive) { return state; }

        if (typeof node === 'object' && node !== null) {
            state.keys = es.objectKeys(node);

            state.isLeaf = state.keys.length === 0;

            for (var i = 0; i < parents.length; i++) {
                if (parents[i].node_ === node_) {
                    state.circular = parents[i];
                    break;
                }
            }
        }
        else {
            state.isLeaf = true;
        }

        state.notLeaf = !state.isLeaf;
        state.notRoot = !state.isRoot;

        // use return values to update if defined
        var ret = cb.call(state, state.node);
        if (ret !== undefined && state.update) state.update(ret);

        if (modifiers.before) modifiers.before.call(state, state.node);

        if (!keepGoing) return state;

        if (typeof state.node === 'object' && state.node !== null && !state.circular) {
            parents.push(state);

            forEach(state.keys, function (key, i) {
                path.push(key);

                if (modifiers.pre) modifiers.pre.call(state, state.node[key], key);

                var child = walker(state.node[key]);
                if (immutable && Object.hasOwnProperty.call(state.node, key)) {
                    state.node[key] = child.node;
                }

                child.isLast = i == state.keys.length - 1;
                child.isFirst = i == 0;

                if (modifiers.post) modifiers.post.call(state, child);

                path.pop();
            });
            parents.pop();
        }

        if (modifiers.after) modifiers.after.call(state, state.node);

        return state;
    })(root).node;
};



