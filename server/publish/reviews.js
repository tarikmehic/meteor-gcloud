Meteor.publish("reviews_list", function(toolId) {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Reviews.find({toolId:toolId}, {});
	}
	return this.ready();
});

Meteor.publish("reviews_list_empty", function() {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Reviews.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("review", function(reviewId) {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Reviews.find({_id:reviewId}, {});
	}
	return this.ready();
});

