Template.Tools.onCreated(function() {
	
});

Template.Tools.onDestroyed(function() {
	
});

Template.Tools.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Tools.events({
	
});

Template.Tools.helpers({
	
});


var ToolsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ToolListPagedSearchString") || "",
		searchFields: Session.get("ToolListPagedSearchFields") || ["title", "description", "link", "video", "possibilities", "category", "contact_email", "topic", "company"],
		sortBy: Session.get("ToolListPagedSortBy") || "",
		sortAscending: Session.get("ToolListPagedSortAscending") || true
	};

	var exportFields = [];

	Meteor.call("toolListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ToolsView.onCreated(function() {
	
});

Template.ToolsView.onDestroyed(function() {
	
});

Template.ToolsView.onRendered(function() {
	Session.set("ToolsViewStyle", "table");
	
});

Template.ToolsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("ToolListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("ToolListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("ToolListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("tools.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ToolsViewExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ToolsViewExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ToolsViewExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ToolsViewExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ToolListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ToolListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ToolListPagedPageNo") || 0;
		if(currentPage < this.tool_list_paged_page_count - 1) {
			Session.set("ToolListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ToolsView.helpers({

	"insertButtonClass": function() {
		return Tools.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.tool_list_paged || this.tool_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.tool_list_paged && this.tool_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.tool_list_paged && this.tool_list_paged.count() == 0 && Session.get("ToolListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ToolListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ToolListPagedPageNo") || 0) < this.tool_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ToolListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ToolsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ToolsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ToolsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ToolsViewStyle") == "gallery";
	}

	
});


Template.ToolsViewTable.onCreated(function() {
	
});

Template.ToolsViewTable.onDestroyed(function() {
	
});

Template.ToolsViewTable.onRendered(function() {
	
});

Template.ToolsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ToolListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ToolListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ToolListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ToolListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ToolListPagedSortAscending", true);
		}
	}
});

Template.ToolsViewTable.helpers({
});


Template.ToolsViewTableItems.onCreated(function() {
	
});

Template.ToolsViewTableItems.onDestroyed(function() {
	
});

Template.ToolsViewTableItems.onRendered(function() {
	
});

Template.ToolsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("tools.details", mergeObjects(Router.currentRouteParams(), {toolId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("toolsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("toolsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("tools.edit", mergeObjects(Router.currentRouteParams(), {toolId: this._id}));
		return false;
	}
});

Template.ToolsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Tools.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Tools.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
