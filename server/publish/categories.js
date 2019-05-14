Meteor.publish("category_list", function() {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Categories.find({}, {});
	}
	return this.ready();
});

Meteor.publish("categories_empty", function() {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Categories.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("category_details", function(categoryId) {
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Categories.find({_id:categoryId}, {});
	}
	return this.ready();
});

Meteor.publish("category_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["user","admin"])) {
		return Categories.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return this.ready();
});

Meteor.publish("category_list_paged_count", function(extraOptions) {
	Counts.publish(this, "category_list_paged_count", Categories.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"categoryListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["user","admin"])) {
			var data = Categories.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
	}
});

