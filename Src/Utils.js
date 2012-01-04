/*globals es, ko*/

/// <reference path="../Libs/jquery-1.7.1.js" />
/// <reference path="../Libs/knockout-2.0.0.debug.js" />

var utils = {

	extendObservable: function (target, source) {
		var prop;

		if (!target || !source) {
			return;
		}

		for (prop in target) {

			if (source.hasOwnProperty(prop)) {

				if (ko.isObservable(target[prop])) { //set the observable property

					target[prop](source[prop]); // set the observable
				} else {

					target[prop] = source[prop];
				}
			}
		}

		return target;
	},

	extend: function (target, source) {
		var prop;

		if (!target || !source) {
			return;
		}

		for (prop in source) {
			target[prop] = source[prop];
		}

		return target;
	},

	addPropertyChangedHandlers: function (obj, propertyName) {

		var property = obj[propertyName];
		if (ko.isObservable(property) && !(property instanceof Array)) {

			// This is the actual PropertyChanged event
			property.subscribe(function () {

				if (obj.ignorePropertyChanged === false) {

					if (ko.utils.arrayIndexOf(obj.ModifiedColumns(), propertyName) === -1) {

						if (propertyName !== "RowState") {
							obj.ModifiedColumns.push(propertyName);

							if (obj.RowState() !== es.RowState.MODIFIED && obj.RowState() !== es.RowState.ADDED) {
								obj.RowState(es.RowState.MODIFIED);
							}
						}
					}
				}
			});
		}
	},

	startTracking: function (entity) {

		var propertyName;

		if (!entity.hasOwnProperty("RowState")) {
			entity.RowState = ko.observable(es.RowState.ADDED);
			if (entity.hasOwnProperty("__ko_mapping__")) {
				entity.__ko_mapping__.mappedProperties["RowState"] = true;
			}
		} else {
			if (!ko.isObservable(entity.RowState)) {
				entity.RowState = ko.observable(entity.RowState);
			}
		}

		if (!entity.hasOwnProperty("ModifiedColumns")) {
			entity.ModifiedColumns = ko.observableArray();
			if (entity.hasOwnProperty("__ko_mapping__")) {
				entity.__ko_mapping__.mappedProperties["ModifiedColumns"] = true;
			}
		} else {
			// Overwrite existing data
			entity.ModifiedColumns = ko.observableArray();
		}

		for (propertyName in entity) {
			if (propertyName !== 'RowState' && propertyName !== "ModifiedColumns" && propertyName !== '__type' && propertyName !== 'esExtendedData') {

				var property = entity[propertyName];

				if (property instanceof Array) {
					continue;
				}

				if (entity.hasOwnProperty(propertyName) && ko.isObservable(property)) {
					utils.addPropertyChangedHandlers(entity, propertyName);
				}
			}
		}

		return entity;
	},

	expandExtraColumns: function (entity, shouldMakeObservable) {
		var data, i, ext,
                makeObservable = arguments[1] || false;

		if (entity.esExtendedData && es.isArray(entity.esExtendedData)) {

			data = ko.utils.unwrapObservable(entity.esExtendedData);

			for (i = 0; i < data.length; i++) {

				if (makeObservable) {
					entity[ko.utils.unwrapObservable(data[i].Key)] = ko.observable(ko.utils.unwrapObservable(data[i].Value));
				} else {
					entity[ko.utils.unwrapObservable(data[i].Key)] = ko.utils.unwrapObservable(data[i].Value);
				}

				if (entity.hasOwnProperty("__ko_mapping__")) {
					if (entity.__ko_mapping__.hasOwnProperty("mappedProperties")) {
						entity.__ko_mapping__.mappedProperties[ko.utils.unwrapObservable(data[i].Key)] = true;
					}
				}
			}

			ext = ko.utils.unwrapObservable(entity.esExtendedData);
			delete entity.esExtendedData;
		}

		if (data !== undefined) {

			entity["esExtendedData"] = [];

			for (i = 0; i < data.length; i++) {
				entity.esExtendedData.push(ko.utils.unwrapObservable(data[i].Key));
			}
		}

		return entity;
	},

	removeExtraColumns: function (entity) {
		var i;

		if (entity.esExtendedData && es.isArray(entity.esExtendedData)) {

			var data = ko.utils.unwrapObservable(entity.esExtendedData);

			for (i = 0; i < data.length; i++) {
				delete entity[data[i]];
			}
			delete entity.esExtendedData;
		}

		return entity;
	},

	// Private function used by 'getDirtyEntities' below
	// NOTE: This strips out unwanted properties, this method is only to
	//       be used to by getDirtyEntities
	shallowCopy: function (src) {
		if (typeof src === 'object' && src !== null) {
			var dst;

			if (es.isArray(src)) {
				dst = [];
			}
			else if (src instanceof Date) {
				dst = new Date(src);
			}
			else if (src instanceof Boolean) {
				dst = new Boolean(src);
			}
			else if (src instanceof Number) {
				dst = new Number(src);
			}
			else if (src instanceof String) {
				dst = new String(src);
			}
			else if (Object.create && Object.getPrototypeOf) {
				dst = Object.create(Object.getPrototypeOf(src));
			}
			else if (src.__proto__ || src.constructor.prototype) {
				var proto = src.__proto__ || src.constructor.prototype || {};
				var T = function () { };
				T.prototype = proto;
				dst = new T;
				if (!dst.__proto__) { dst.__proto__ = proto; }
			}

			ko.utils.arrayForEach(es.objectKeys(src), function (key) {
				if (!es.isEsCollection(src[key])) {

					switch (key) {
						case '___esEntity___':
						case 'esTypeDefs':
						case 'routes':
						case 'ignorePropertyChanged':
							break;
						default:
							dst[key] = src[key];
							break;
					}
				}
			});
			return dst;
		} else {
			return src;
		}
	},

	getDirtyGraph: function (obj) {

		var i, k, dirty, paths = [], root = null;

		es.Visit(obj).forEach(function (theObj) {

			if (this.key === "esExtendedData") {
				this.block();
			} else {

				if (this.isLeaf === false) {

					if (theObj instanceof Array) { return theObj; }

					if (theObj.hasOwnProperty("RowState")) {

						switch (theObj.RowState) {

							case es.RowState.ADDED:
							case es.RowState.DELETED:
							case es.RowState.MODIFIED:

								paths.push(this.path);
								break;
						}
					}
				}
			}

			return theObj;
		});

		//#region Rebuild tree of dirty objects from "paths[]"
		if (paths.length > 0) {

			if (es.isArray(obj)) {
				dirty = [];
			} else {
				dirty = utils.shallowCopy(utils.removeExtraColumns(obj));
			}

			root = dirty;

			for (i = 0; i < paths.length; i++) {

				var thePath = paths[i];
				var data = obj;
				dirty = root;

				for (k = 0; k < thePath.length; k++) {

					if (!dirty.hasOwnProperty(thePath[k])) {

						if (es.isArray(data[thePath[k]])) {
							dirty[thePath[k]] = [];
							dirty = dirty[thePath[k]];
						}
					} else {
						dirty = dirty[thePath[k]];
					}

					data = data[thePath[k]];
				}

				data = utils.removeExtraColumns(data);

				if (es.isArray(dirty)) {
					dirty.push(utils.shallowCopy(data));
				} else {
					dirty = utils.shallowCopy(data);
				}
			}
		}
		//#endregion Save

		return root;
	}
};

utils.newId = (function () {
    var seedId = new Date().getTime();

    return function () {
        return ++seedId;
    };

} ());

es.utils = utils;
