this.ToolsDetailsCommentsController = RouteController.extend({
	template: "ToolsDetails",
	

	yieldTemplates: {
		'ToolsDetailsComments': { to: 'ToolsDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ToolsDetails"); this.render("loading", { to: "ToolsDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.commentsListPagedExtraParams = {
			searchText: Session.get("CommentsListPagedSearchString") || "",
			searchFields: Session.get("CommentsListPagedSearchFields") || ["comment"],
			sortBy: Session.get("CommentsListPagedSortBy") || "",
			sortAscending: Session.get("CommentsListPagedSortAscending"),
			pageNo: Session.get("CommentsListPagedPageNo") || 0,
			pageSize: Session.get("CommentsListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("comments_list_paged", this.params.toolId, this.commentsListPagedExtraParams),
			Meteor.subscribe("comments_list_paged_count", this.params.toolId, this.commentsListPagedExtraParams),
			Meteor.subscribe("tool_details", this.params.toolId)
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
			comments_list_paged: Comments.find(databaseUtils.extendFilter({toolId:this.params.toolId}, this.commentsListPagedExtraParams), databaseUtils.extendOptions({}, this.commentsListPagedExtraParams)),
			comments_list_paged_count: Counts.get("comments_list_paged_count"),
			tool_details: Tools.findOne({_id:this.params.toolId}, {})
		};
		

		
		data.comments_list_paged_page_count = this.commentsListPagedExtraParams && this.commentsListPagedExtraParams.pageSize ? Math.ceil(data.comments_list_paged_count / this.commentsListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.commentsListPagedExtraParams.pageNo >= data.comments_list_paged_page_count) {
			Session.set("CommentsListPagedPageNo", data.comments_list_paged_page_count > 0 ? data.comments_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});