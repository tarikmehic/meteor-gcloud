var pageSession = new ReactiveDict();

Template.ToolsDetailsEdit.onCreated(function() {
	
});

Template.ToolsDetailsEdit.onDestroyed(function() {
	
});

Template.ToolsDetailsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsDetailsEdit.events({
	
});

Template.ToolsDetailsEdit.helpers({
	
});

Template.ToolsDetailsEditEditForm.onCreated(function() {
	
});

Template.ToolsDetailsEditEditForm.onDestroyed(function() {
	
});

Template.ToolsDetailsEditEditForm.onRendered(function() {
	

	pageSession.set("toolsDetailsEditEditFormInfoMessage", "");
	pageSession.set("toolsDetailsEditEditFormErrorMessage", "");

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

Template.ToolsDetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("toolsDetailsEditEditFormInfoMessage", "");
		pageSession.set("toolsDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var toolsDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(toolsDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("toolsDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.details", mergeObjects(Router.currentRouteParams(), {toolId: self.params.toolId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("toolsDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("commentsUpdate", t.data.comment._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tools.details", mergeObjects(Router.currentRouteParams(), {toolId: this.params.toolId}));
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

Template.ToolsDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("toolsDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("toolsDetailsEditEditFormErrorMessage");
	}
	
});
