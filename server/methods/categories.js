Meteor.methods({
	"categoriesInsert": function(data) {
		if(!Categories.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Categories.insert(data);
	},

	"categoriesUpdate": function(id, data) {
		var doc = Categories.findOne({ _id: id });
		if(!Categories.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Categories.update({ _id: id }, { $set: data });
	},

	"categoriesRemove": function(id) {
		var doc = Categories.findOne({ _id: id });
		if(!Categories.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Categories.remove({ _id: id });
	}
});
