Meteor.publish('projects', function() {
   return Projects.find();
});

Meteor.publish('bulbs', function() {
    return Bulbs.find();
});

Meteor.publish('messages', function(options) {
    check(options, {
        projectId: String,
        sort: Object,
        limit: Number
        //skip: Number
    })
    return Messages.find({},options);
});

/*Meteor.publish('messages', function(projectId) {
    check(projectId, String);
    return Messages.find({projectId: projectId});
});*/

Meteor.publish('sparks', function(bulbId) {
    check(bulbId, String);
    return Sparks.find({ bulbId: bulbId });
});

Meteor.publish('comments', function(sparkId)  {
    check(sparkId, String);
    return Comments.find({ sparkId: sparkId });
});

Meteor.publish('users', function() {
    return Meteor.users.find();//{}, {
    //    fields : {
    //        'username' : 1
    //        //'email' : 1
    //    }
    //});
});
