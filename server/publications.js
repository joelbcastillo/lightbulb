Meteor.publish('bulbs', function() {
    return Bulbs.find();
});

Meteor.publish('sparks', function() {
    return Sparks.find();
});