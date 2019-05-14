this.Categories = new Mongo.Collection("Categories");

this.Categories.userCanInsert = function(userId, doc) {
	return true;
};

this.Categories.userCanUpdate = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};

this.Categories.userCanRemove = function(userId, doc) {
	return userId && (doc.ownerId == userId || Users.isInRoles(userId, ["admin"]));
};
