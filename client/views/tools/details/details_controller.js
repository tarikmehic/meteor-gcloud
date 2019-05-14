this.ToolsDetailsController = RouteController.extend({
	template: "ToolsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		this.redirect('tools.details.comments', this.params || {}, { replaceState: true });
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
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
			tool_details: Tools.findOne({_id:this.params.toolId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});