this.ToolsDetailsInsertController = RouteController.extend({
	template: "ToolsDetails",
	

	yieldTemplates: {
		'ToolsDetailsInsert': { to: 'ToolsDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("ToolsDetails"); this.render("loading", { to: "ToolsDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("comments_list_empty"),
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
			comments_list_empty: Comments.findOne({_id:null}, {}),
			tool_details: Tools.findOne({_id:this.params.toolId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});