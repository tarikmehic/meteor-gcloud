Meteor.publish("tool_list", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Tools.find({}, {});
	}
	return Tools.find({ownerId:this.userId}, {});
});

Meteor.publish("tools_empty", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Tools.find({_id:null}, {});
	}
	return Tools.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("tool_details", function(toolId) {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Tools.find({_id:toolId}, {});
	}
	return Tools.find({_id:toolId,ownerId:this.userId}, {});
});

Meteor.publish("tool_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin"])) {
		return Tools.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Tools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("tool_list_paged_count", function(extraOptions) {
	Counts.publish(this, "tool_list_paged_count", Tools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"toolListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin"])) {
			var data = Tools.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Tools.find(databaseUtils.extendFilter({ownerId:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

