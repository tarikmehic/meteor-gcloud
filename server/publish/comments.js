Meteor.publish("comments_list", function(toolId) {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Comments.find({toolId:toolId}, {});
	}
	return this.ready();
});

Meteor.publish("comments_list_empty", function() {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Comments.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("comment", function(commentId) {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Comments.find({_id:commentId}, {});
	}
	return this.ready();
});

Meteor.publish("comments_list_paged", function(toolId, extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Comments.find(databaseUtils.extendFilter({toolId:toolId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("comments_list_paged_count", function(toolId, extraOptions) {
	Counts.publish(this, "comments_list_paged_count", Comments.find(databaseUtils.extendFilter({toolId:toolId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"commentsListPagedExport": function(toolId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["user","admin"])) {
			var data = Comments.find(databaseUtils.extendFilter({toolId:toolId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

