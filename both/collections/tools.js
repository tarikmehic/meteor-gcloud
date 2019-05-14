this.Tools = new Mongo.Collection("tools");

this.Tools.userCanInsert = function(userId, doc) {
	return true;
};

this.Tools.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Tools.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};
