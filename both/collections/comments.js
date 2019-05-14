this.Comments = new Mongo.Collection("comments");

this.Comments.userCanInsert = function(userId, doc) {
	return true;
};

this.Comments.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Comments.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};
