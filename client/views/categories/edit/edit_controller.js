this.CategoriesEditController = RouteController.extend({
	template: "CategoriesEdit",
	

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


		

		var subs = [
			Meteor.subscribe("category_details", this.params.categoryId)
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
			category_details: Categories.findOne({_id:this.params.categoryId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});