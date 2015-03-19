/**
 * Created by joel on 3/17/15.
 */

Meteor.publish('bulbs', function() {
    return Bulbs.find();
});

Meteor.publish('sparks', function(bulbId) {
    check(bulbId, String);
    return Sparks.find({ bulbId: bulbId });
});

Meteor.publish('comments', function(sparkId)  {
    check(sparkId, String);
    return Comments.find({ sparkId: sparkId });
});