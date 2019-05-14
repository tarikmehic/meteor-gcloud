var pageSession = new ReactiveDict();

Template.ToolsInsert.onCreated(function() {
	
});

Template.ToolsInsert.onDestroyed(function() {
	
});

Template.ToolsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsInsert.events({
	
});

Template.ToolsInsert.helpers({
	
});

Template.ToolsInsertInsertForm.onCreated(function() {
	
});

Template.ToolsInsertInsertForm.onDestroyed(function() {
	
});

Template.ToolsInsertInsertForm.onRendered(function() {
	

	pageSession.set("toolsInsertInsertFormInfoMessage", "");
	pageSession.set("toolsInsertInsertFormErrorMessage", "");

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

Template.ToolsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("toolsInsertInsertFormInfoMessage", "");
		pageSession.set("toolsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var toolsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(toolsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("toolsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tools.details", mergeObjects(Router.currentRouteParams(), {toolId: result}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("toolsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("toolsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ToolsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("toolsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("toolsInsertInsertFormErrorMessage");
	}
	
});
