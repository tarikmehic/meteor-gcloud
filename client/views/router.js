Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.edit",
	"tools",
	"tools.insert",
	"tools.details",
	"tools.details.comments",
	"tools.details.insert",
	"tools.details.edit",
	"tools.edit",
	"categories",
	"categories.insert",
	"categories.details",
	"categories.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] }
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/tools", {name: "tools", title: "", controller: "ToolsController"});
	this.route("/tools/insert", {name: "tools.insert", title: "", controller: "ToolsInsertController"});
	this.route("/tools/details/:toolId", {name: "tools.details", title: "", controller: "ToolsDetailsController"});
	this.route("/tools/details/:toolId/comments", {name: "tools.details.comments", title: "", controller: "ToolsDetailsCommentsController"});
	this.route("/tools/details/:toolId/insert", {name: "tools.details.insert", title: "", controller: "ToolsDetailsInsertController"});
	this.route("/tools/details/:toolId/edit/:itemId", {name: "tools.details.edit", title: "", controller: "ToolsDetailsEditController"});
	this.route("/tools/edit/:toolId", {name: "tools.edit", title: "", controller: "ToolsEditController"});
	this.route("/categories", {name: "categories", title: "", controller: "CategoriesController"});
	this.route("/categories/insert", {name: "categories.insert", title: "", controller: "CategoriesInsertController"});
	this.route("/categories/details/:categoryId", {name: "categories.details", title: "", controller: "CategoriesDetailsController"});
	this.route("/categories/edit/:categoryId", {name: "categories.edit", title: "", controller: "CategoriesEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
});
