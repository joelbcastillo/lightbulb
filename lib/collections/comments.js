Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            sparkId: String,
            body: String
        });
        var user = Meteor.user();
        var spark = Sparks.findOne(commentAttributes.sparkId);
        if (!spark)
            throw new Meteor.Error('invalid-comment', 'You can only add comments to a spark.');
        comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        Sparks.update(comment.sparkId, {$inc: {commentsCount: 1}});

        return Comments.insert(comment);
    }
});