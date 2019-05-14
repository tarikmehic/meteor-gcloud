this.ToolsDetailsEditController = RouteController.extend({
	template: "ToolsDetails",
	

	yieldTemplates: {
		'ToolsDetailsEdit': { to: 'ToolsDetailsSubcontent'}
		
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
			Meteor.subscribe("comment", this.params.commentId),
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
			comment: Comments.findOne({_id:this.params.commentId}, {}),
			tool_details: Tools.findOne({_id:this.params.toolId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});