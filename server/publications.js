Meteor.publish('projects', function() {
   return Projects.find();
});

Meteor.publish('messages', function(options) {
    check(options, {
	sort: Object,
        limit: Number
    });
    return Messages.find({}, options);
});
