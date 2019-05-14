this.ToolsController = RouteController.extend({
	template: "Tools",
	

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
		this.toolListPagedExtraParams = {
			searchText: Session.get("ToolListPagedSearchString") || "",
			searchFields: Session.get("ToolListPagedSearchFields") || ["title", "description", "link", "video", "possibilities", "category", "contact_email", "topic", "company"],
			sortBy: Session.get("ToolListPagedSortBy") || "",
			sortAscending: Session.get("ToolListPagedSortAscending"),
			pageNo: Session.get("ToolListPagedPageNo") || 0,
			pageSize: Session.get("ToolListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("tool_list_paged", this.toolListPagedExtraParams),
			Meteor.subscribe("tool_list_paged_count", this.toolListPagedExtraParams)
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
			tool_list_paged: Tools.find(databaseUtils.extendFilter({}, this.toolListPagedExtraParams), databaseUtils.extendOptions({}, this.toolListPagedExtraParams)),
			tool_list_paged_count: Counts.get("tool_list_paged_count")
		};
		

		
		data.tool_list_paged_page_count = this.toolListPagedExtraParams && this.toolListPagedExtraParams.pageSize ? Math.ceil(data.tool_list_paged_count / this.toolListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.toolListPagedExtraParams.pageNo >= data.tool_list_paged_page_count) {
			Session.set("ToolListPagedPageNo", data.tool_list_paged_page_count > 0 ? data.tool_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});