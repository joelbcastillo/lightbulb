Meteor.publish('projects', function() {
   return Projects.find();
});

Meteor.publish('bulbs', function() {
    return Bulbs.find();
});

Meteor.publish('messages', function(options) {
    check(options, {
        projectId: String,
        sort: Object//,
        //limit: Number
    });
    /*var newOptions = _.extend(options, {
        limit: 10
    });
    console.log(newOptions.limit);*/
    return Messages.find({}, options);
});

Meteor.publish('sparks', function(bulbId) {
    check(bulbId, String);
    return Sparks.find({ bulbId: bulbId });
});

Meteor.publish('comments', function(sparkId)  {
    check(sparkId, String);
    return Comments.find({ sparkId: sparkId });
});

Meteor.publish('notifications', function() {
    return Notifications.find();
});

Meteor.publish('users', function() {
    return Meteor.users.find();
});
