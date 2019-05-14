this.CategoriesController = RouteController.extend({
	template: "Categories",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.categoryListPagedExtraParams = {
			searchText: Session.get("CategoryListPagedSearchString") || "",
			searchFields: Session.get("CategoryListPagedSearchFields") || ["title"],
			sortBy: Session.get("CategoryListPagedSortBy") || "",
			sortAscending: Session.get("CategoryListPagedSortAscending"),
			pageNo: Session.get("CategoryListPagedPageNo") || 0,
			pageSize: Session.get("CategoryListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("category_list_paged", this.categoryListPagedExtraParams),
			Meteor.subscribe("category_list_paged_count", this.categoryListPagedExtraParams)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			category_list_paged: Categories.find(databaseUtils.extendFilter({}, this.categoryListPagedExtraParams), databaseUtils.extendOptions({}, this.categoryListPagedExtraParams)),
			category_list_paged_count: Counts.get("category_list_paged_count")
		};
		

		
		data.category_list_paged_page_count = this.categoryListPagedExtraParams && this.categoryListPagedExtraParams.pageSize ? Math.ceil(data.category_list_paged_count / this.categoryListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.categoryListPagedExtraParams.pageNo >= data.category_list_paged_page_count) {
			Session.set("CategoryListPagedPageNo", data.category_list_paged_page_count > 0 ? data.category_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});