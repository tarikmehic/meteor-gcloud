this.Reviews = new Mongo.Collection("reviews");

this.Reviews.userCanInsert = function(userId, doc) {
	return true;
};

this.Reviews.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Reviews.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};
