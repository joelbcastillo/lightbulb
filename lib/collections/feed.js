Notifications = new Mongo.Collection('notifications');

BulbNotification = function(bulb, type) {
    console.log(bulb);
    var user = Meteor.user();
    Notifications.insert({
        userId: user._id,
        username: user.username,
        bulbId: bulb,
        bulbTitle: bulb.title,
        type: type,
        read: false
    });

};
