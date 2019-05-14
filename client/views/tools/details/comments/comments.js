Template.ToolsDetailsComments.onCreated(function() {
	
});

Template.ToolsDetailsComments.onDestroyed(function() {
	
});

Template.ToolsDetailsComments.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ToolsDetailsComments.events({
	
});

Template.ToolsDetailsComments.helpers({
	
});


var ToolsDetailsCommentsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("CommentsListPagedSearchString") || "",
		searchFields: Session.get("CommentsListPagedSearchFields") || ["comment"],
		sortBy: Session.get("CommentsListPagedSortBy") || "",
		sortAscending: Session.get("CommentsListPagedSortAscending") || true
	};

	var exportFields = [];

	Meteor.call("commentsListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ToolsDetailsCommentsView.onCreated(function() {
	
});

Template.ToolsDetailsCommentsView.onDestroyed(function() {
	
});

Template.ToolsDetailsCommentsView.onRendered(function() {
	Session.set("ToolsDetailsCommentsViewStyle", "table");
	
});

Template.ToolsDetailsCommentsView.events({
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
				Session.set("CommentsListPagedSearchString", searchString);
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
					Session.set("CommentsListPagedSearchString", searchString);
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
					Session.set("CommentsListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("tools.details.insert", mergeObjects(Router.currentRouteParams(), {toolId: this.params.toolId}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ToolsDetailsCommentsViewExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ToolsDetailsCommentsViewExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ToolsDetailsCommentsViewExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ToolsDetailsCommentsViewExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("CommentsListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("CommentsListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("CommentsListPagedPageNo") || 0;
		if(currentPage < this.comments_list_paged_page_count - 1) {
			Session.set("CommentsListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ToolsDetailsCommentsView.helpers({

	"insertButtonClass": function() {
		return Comments.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.comments_list_paged || this.comments_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.comments_list_paged && this.comments_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.comments_list_paged && this.comments_list_paged.count() == 0 && Session.get("CommentsListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("CommentsListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("CommentsListPagedPageNo") || 0) < this.comments_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("CommentsListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ToolsDetailsCommentsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ToolsDetailsCommentsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ToolsDetailsCommentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ToolsDetailsCommentsViewStyle") == "gallery";
	}

	
});


Template.ToolsDetailsCommentsViewTable.onCreated(function() {
	
});

Template.ToolsDetailsCommentsViewTable.onDestroyed(function() {
	
});

Template.ToolsDetailsCommentsViewTable.onRendered(function() {
	
});

Template.ToolsDetailsCommentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("CommentsListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("CommentsListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("CommentsListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("CommentsListPagedSortAscending", !sortAscending);
		} else {
			Session.set("CommentsListPagedSortAscending", true);
		}
	}
});

Template.ToolsDetailsCommentsViewTable.helpers({
});


Template.ToolsDetailsCommentsViewTableItems.onCreated(function() {
	
});

Template.ToolsDetailsCommentsViewTableItems.onDestroyed(function() {
	
});

Template.ToolsDetailsCommentsViewTableItems.onRendered(function() {
	
});

Template.ToolsDetailsCommentsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("commentsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("commentsRemove", me._id, function(err, res) {
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
		Router.go("tools.details.edit", mergeObjects(Router.currentRouteParams(), {toolId: UI._parentData(1).params.toolId, commentId: this._id}));
		return false;
	}
});

Template.ToolsDetailsCommentsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Comments.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Comments.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
