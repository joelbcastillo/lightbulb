Sparks = new Mongo.Collection('sparks');

Meteor.methods({
    sparkInsert: function (sparkAttributes) {
        check(this.userId, String);
        check(sparkAttributes, {
            bulbId: String,
            body: String
        });
        var user = Meteor.user();
        var bulb = Bulbs.findOne(sparkAttributes.bulbId);
        if (!bulb)
            throw new Meteor.Error('invalid-spark', 'You can only add sparks to a bulb.');
        var spark = _.extend(sparkAttributes, {
            userId: user._id,
            //author: user.username,
            submitted: new Date(),
            commentsCount: 0,
            upvoters: [],
            downvoters: [],
            upvotes: 0,
            downvotes: 0
        });

        Bulbs.update(spark.bulbId, {$inc: {sparksCount: 1}});

        return Sparks.insert(spark);
    },
    // TODO: fix like the book does (for double votes)
    upvote: function (sparkId) {
        check(this.userId, String);
        check(sparkId, String);
        var spark = Sparks.findOne(sparkId);
        if (!spark)
            throw new Meteor.Error('invalid', 'Spark not found');
        if (_.include(spark.upvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already upvoted this spark');

        if (_.include(spark.downvoters, this.userId)) {
            Sparks.update(spark._id, {
                $pull: {downvoters: this.userId},
                $inc: {downvotes: -1}
            });
        }

        Sparks.update(spark._id, {
            $addToSet: {upvoters: this.userId},
            $inc: {upvotes: 1}
        });

        Bulbs.update(spark.bulbId, {
            $inc: {luminance: .075}
        });
    },
    downvote: function (sparkId) {
        check(this.userId, String);
        check(sparkId, String);
        var spark = Sparks.findOne(sparkId);
        if (!spark)
            throw new Meteor.Error('invalid', 'Spark not found');
        if (_.include(spark.downvoters, this.userId))
            throw new Meteor.Error('invalid', 'Already downvoted this spark');

        if (_.include(spark.upvoters, this.userId)) {
            Sparks.update(spark._id, {
                $pull: {upvoters: this.userId},
                $inc: {upvotes: -1}
            });
        }

        Sparks.update(spark._id, {
            $addToSet: {downvoters: this.userId},
            $inc: {downvotes: 1}
        });

        Bulbs.update(spark.bulbId, {
            $inc: {luminance: -.075}
        });
    }
});