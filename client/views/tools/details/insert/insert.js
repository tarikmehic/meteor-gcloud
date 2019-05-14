var pageSession = new ReactiveDict();

Template.ToolsDetailsInsert.onCreated(function() {
	
});

Template.ToolsDetailsInsert.onDestroyed(function() {
	
});

Template.ToolsDetailsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsDetailsInsert.events({
	
});

Template.ToolsDetailsInsert.helpers({
	
});

Template.ToolsDetailsInsertInsertForm.onCreated(function() {
	
});

Template.ToolsDetailsInsertInsertForm.onDestroyed(function() {
	
});

Template.ToolsDetailsInsertInsertForm.onRendered(function() {
	

	pageSession.set("toolsDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("toolsDetailsInsertInsertFormErrorMessage", "");

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

Template.ToolsDetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("toolsDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("toolsDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var toolsDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(toolsDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("toolsDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.details", mergeObjects(Router.currentRouteParams(), {toolId: self.params.toolId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("toolsDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.toolId = self.params.toolId;

				Meteor.call("commentsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ToolsDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("toolsDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("toolsDetailsInsertInsertFormErrorMessage");
	}
	
});
