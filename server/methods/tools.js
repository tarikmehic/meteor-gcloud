Meteor.methods({
	"toolsInsert": function(data) {
		if(!Tools.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Tools.insert(data);
	},

	"toolsUpdate": function(id, data) {
		var doc = Tools.findOne({ _id: id });
		if(!Tools.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Tools.update({ _id: id }, { $set: data });
	},

	"toolsRemove": function(id) {
		var doc = Tools.findOne({ _id: id });
		if(!Tools.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Tools.remove({ _id: id });
	}
});
