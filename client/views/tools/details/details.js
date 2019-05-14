var pageSession = new ReactiveDict();

Template.ToolsDetails.onCreated(function() {
	
});

Template.ToolsDetails.onDestroyed(function() {
	
});

Template.ToolsDetails.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsDetails.events({
	
});

Template.ToolsDetails.helpers({
	
});

Template.ToolsDetailsDetailsForm.onCreated(function() {
	
});

Template.ToolsDetailsDetailsForm.onDestroyed(function() {
	
});

Template.ToolsDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("toolsDetailsDetailsFormInfoMessage", "");
	pageSession.set("toolsDetailsDetailsFormErrorMessage", "");

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

Template.ToolsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("toolsDetailsDetailsFormInfoMessage", "");
		pageSession.set("toolsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var toolsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(toolsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("toolsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("toolsDetailsDetailsFormErrorMessage", message);
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

		Router.go("tools", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ToolsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("toolsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("toolsDetailsDetailsFormErrorMessage");
	}
	
});
