
(function (es) { //myNS = "myNameSpace" ... for example purposes

	if (typeof (es) === undefined) {
		throw "Please Load EntitySpaces.Core First";
	}

	es.objects.Staff = es.defineEntity(function () {

		// core columns
		this.Id = ko.observable();
		this.BranchId = ko.observable();
		this.FirstName = ko.observable();
		this.LastName = ko.observable();
		this.Designation = ko.observable();
		this.WorkPhone = ko.observable();
		this.HomePhone = ko.observable();
		this.Mobile = ko.observable();
		this.Email = ko.observable();
		this.EmailIsHtml = ko.observable();
		this.BirthDate = ko.observable();
		this.Gender = ko.observable();
		this.HomeAddress = ko.observable();
		this.ImageCount = ko.observable();
		this.Username = ko.observable();
		this.Password = ko.observable();
		this.PasswordChanged = ko.observable();
		this.PasswordResetRequired = ko.observable();
		this.PasswordSalt = ko.observable();
		this.Notes = ko.observable();
		this.Profile = ko.observable();
		this.RoleIsAccounts = ko.observable();
		this.RoleIsAdmin = ko.observable();
		this.RoleCanManageStock = ko.observable();
		this.RoleIsSales = ko.observable();
		this.RoleIsAhContact = ko.observable();
		this.RoleIsDecisionMaker = ko.observable();
		this.StartDate = ko.observable();
		this.EndDate = ko.observable();
		this.Status = ko.observable();
		this.LoginLastDate = ko.observable();
		this.LoggedIn = ko.observable();
		this.LockTime = ko.observable();
		this.LockUserId = ko.observable();
		this.LoginToken = ko.observable();
		this.LoginTokenExpires = ko.observable();
		this.DisplayOrder = ko.observable();
		this.ReceivesVehiclesWanted = ko.observable();
		this.ReceivesNewsletter = ko.observable();

		// extended colulmns
		this.esExtendedData = undefined;


		// Hierarchical Properties

		this.esTypeDefs = {
		};
	});

	//#region Routing
	es.objects.Staff.prototype.routes = {
		'commit': { method: 'PUT', url: '/API/Staff/' },
		'delete': { method: 'DELETE', url: '/API/Staff/' },
		'loadByPrimaryKey': { method: 'GET', url: '/API/Staff/{id}'}
	};

	//#endregion

}(window.es, window.myNS));

(function (es) {

	es.objects.StaffCollection = es.defineCollection('StaffCollection', 'Staff');

	//#region Routing
	es.objects.StaffCollection.prototype.routes = {
		commit: { method: 'PUT', url: '/API/StaffCollection_Save'},
		loadAll: { method: 'GET', url: '/API/StaffCollection_LoadAll'}
	};

	//#endregion

}(window.es));
