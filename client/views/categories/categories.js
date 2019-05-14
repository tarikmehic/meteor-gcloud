Template.Categories.onCreated(function() {
	
});

Template.Categories.onDestroyed(function() {
	
});

Template.Categories.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Categories.events({
	
});

Template.Categories.helpers({
	
});


var CategoriesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("CategoryListPagedSearchString") || "",
		searchFields: Session.get("CategoryListPagedSearchFields") || ["title"],
		sortBy: Session.get("CategoryListPagedSortBy") || "",
		sortAscending: Session.get("CategoryListPagedSortAscending") || true
	};

	var exportFields = [];

	Meteor.call("categoryListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CategoriesView.onCreated(function() {
	
});

Template.CategoriesView.onDestroyed(function() {
	
});

Template.CategoriesView.onRendered(function() {
	Session.set("CategoriesViewStyle", "table");
	
});

Template.CategoriesView.events({
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
				Session.set("CategoryListPagedSearchString", searchString);
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
					Session.set("CategoryListPagedSearchString", searchString);
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
					Session.set("CategoryListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("categories.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CategoriesViewExport("csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CategoriesViewExport("csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CategoriesViewExport("tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CategoriesViewExport("json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("CategoryListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("CategoryListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("CategoryListPagedPageNo") || 0;
		if(currentPage < this.category_list_paged_page_count - 1) {
			Session.set("CategoryListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CategoriesView.helpers({

	"insertButtonClass": function() {
		return Categories.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.category_list_paged || this.category_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.category_list_paged && this.category_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.category_list_paged && this.category_list_paged.count() == 0 && Session.get("CategoryListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("CategoryListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("CategoryListPagedPageNo") || 0) < this.category_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("CategoryListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CategoriesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CategoriesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CategoriesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CategoriesViewStyle") == "gallery";
	}

	
});


Template.CategoriesViewTable.onCreated(function() {
	
});

Template.CategoriesViewTable.onDestroyed(function() {
	
});

Template.CategoriesViewTable.onRendered(function() {
	
});

Template.CategoriesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("CategoryListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("CategoryListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("CategoryListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("CategoryListPagedSortAscending", !sortAscending);
		} else {
			Session.set("CategoryListPagedSortAscending", true);
		}
	}
});

Template.CategoriesViewTable.helpers({
});


Template.CategoriesViewTableItems.onCreated(function() {
	
});

Template.CategoriesViewTableItems.onDestroyed(function() {
	
});

Template.CategoriesViewTableItems.onRendered(function() {
	
});

Template.CategoriesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("categories.details", mergeObjects(Router.currentRouteParams(), {categoryId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("categoriesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("categoriesRemove", me._id, function(err, res) {
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
		Router.go("categories.edit", mergeObjects(Router.currentRouteParams(), {categoryId: this._id}));
		return false;
	}
});

Template.CategoriesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Categories.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Categories.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
