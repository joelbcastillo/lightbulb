Messages = new Meteor.Collection("messages");

Meteor.methods({
    messageInsert: function(messageAttributes) {
        check(this.userId, String);
        check(messageAttributes, {
            message: String,
            username: String,
            projectId: String,
        });
        var user = Meteor.user();
        var message = _.extend(messageAttributes, {
            userId: user._id,
            createdDate: new Date()
        });
        // insert into db finally
        var messageId = Messages.insert(message);
        return { _id: messageId };
    }
});