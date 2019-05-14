var pageSession = new ReactiveDict();

Template.ToolsEdit.onCreated(function() {
	
});

Template.ToolsEdit.onDestroyed(function() {
	
});

Template.ToolsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsEdit.events({
	
});

Template.ToolsEdit.helpers({
	
});

Template.ToolsEditEditForm.onCreated(function() {
	
});

Template.ToolsEditEditForm.onDestroyed(function() {
	
});

Template.ToolsEditEditForm.onRendered(function() {
	

	pageSession.set("toolsEditEditFormInfoMessage", "");
	pageSession.set("toolsEditEditFormErrorMessage", "");

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

Template.ToolsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("toolsEditEditFormInfoMessage", "");
		pageSession.set("toolsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var toolsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(toolsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("toolsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("toolsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("toolsUpdate", t.data.tool_details._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tools", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ToolsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("toolsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("toolsEditEditFormErrorMessage");
	}
	
});
