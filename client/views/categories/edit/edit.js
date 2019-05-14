var pageSession = new ReactiveDict();

Template.CategoriesEdit.onCreated(function() {
	
});

Template.CategoriesEdit.onDestroyed(function() {
	
});

Template.CategoriesEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CategoriesEdit.events({
	
});

Template.CategoriesEdit.helpers({
	
});

Template.CategoriesEditEditForm.onCreated(function() {
	
});

Template.CategoriesEditEditForm.onDestroyed(function() {
	
});

Template.CategoriesEditEditForm.onRendered(function() {
	

	pageSession.set("categoriesEditEditFormInfoMessage", "");
	pageSession.set("categoriesEditEditFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.CategoriesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("categoriesEditEditFormInfoMessage", "");
		pageSession.set("categoriesEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var categoriesEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(categoriesEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("categoriesEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("categories", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("categoriesEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("categoriesUpdate", t.data.category_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("categories", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.CategoriesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("categoriesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("categoriesEditEditFormErrorMessage");
	}
	
});
