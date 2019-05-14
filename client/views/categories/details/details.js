var pageSession = new ReactiveDict();

Template.CategoriesDetails.onCreated(function() {
	
});

Template.CategoriesDetails.onDestroyed(function() {
	
});

Template.CategoriesDetails.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CategoriesDetails.events({
	
});

Template.CategoriesDetails.helpers({
	
});

Template.CategoriesDetailsDetailsForm.onCreated(function() {
	
});

Template.CategoriesDetailsDetailsForm.onDestroyed(function() {
	
});

Template.CategoriesDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("categoriesDetailsDetailsFormInfoMessage", "");
	pageSession.set("categoriesDetailsDetailsFormErrorMessage", "");

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

Template.CategoriesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("categoriesDetailsDetailsFormInfoMessage", "");
		pageSession.set("categoriesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var categoriesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(categoriesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("categoriesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("categoriesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("categories", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CategoriesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("categoriesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("categoriesDetailsDetailsFormErrorMessage");
	}
	
});
