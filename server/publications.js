Meteor.publish('projects', function() {
   return Projects.find();
});

Meteor.publish('bulbs', function() {
    return Bulbs.find();
});

Meteor.publish('messages', function() {
    return Messages.find();
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
    return Meteor.users.find();//{}, {
    //    fields : {
    //        'username' : 1
    //        //'email' : 1
    //    }
    //});
});
