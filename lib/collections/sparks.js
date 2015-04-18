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


        var sparkId = Sparks.insert(spark);

        var userCount = Projects.findOne(bulb.projectId).users.length + 1; // + 1 for owner
        var baseLum = (bulb.sparksCount + 1) * userCount; // + 1 to account for wait time

        Bulbs.update(bulb._id, {$inc: {sparksCount: 1}});
        Bulbs.update(bulb._id, {$set: {base_lum: baseLum}});
        Bulbs.update(bulb._id, {$set: {max_lum: baseLum * 2}});

        if (bulb.sparksCount > 0) {
            Bulbs.update(bulb._id, {$inc: {curr_lum: userCount}});
        } else {
            Bulbs.update(bulb._id, {$set: {curr_lum: baseLum}});
        }

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
            Bulbs.update(spark.bulbId, {
                $inc: {curr_lum: 1}
            });
        }

        Sparks.update(spark._id, {
            $addToSet: {upvoters: this.userId},
            $inc: {upvotes: 1}
        });
        Bulbs.update(spark.bulbId, {
            $inc: {curr_lum: 1}
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
            Bulbs.update(spark.bulbId, {
                $inc: {curr_lum: -1}
            });
        }

        Sparks.update(spark._id, {
            $addToSet: {downvoters: this.userId},
            $inc: {downvotes: 1}
        });
        Bulbs.update(spark.bulbId, {
            $inc: {curr_lum: -1}
        });
    },
    removeSpark: function (sparkId){
        check(sparkId, String);
        var spark = Sparks.findOne(sparkId);
        console.log(spark);
        var bulb = Bulbs.findOne(spark.bulbId);
        if(!spark)
            throw new Meteor.Error('invalid', 'Spark not found');

        var upvotes = spark.upvotes;
        var downvotes = spark.downvotes;
        var userCount = Projects.findOne(bulb.projectId).users.length + 1;
        var lumShift = downvotes - upvotes - userCount;
        var baseLum = (bulb.sparksCount - 1) * userCount;

        console.log(lumShift);

        Bulbs.update(bulb._id, {$inc: {sparksCount: -1}});
        Bulbs.update(bulb._id, {$set: {base_lum: baseLum}});
        Bulbs.update(bulb._id, {$set: {max_lum: baseLum * 2}});

        if (bulb.sparksCount > 0) {
            Bulbs.update(bulb._id, {$inc: {curr_lum: lumShift}});
        } else {
            Bulbs.update(bulb._id, {$set: {curr_lum: baseLum}});
        }

        Sparks.remove(sparkId);
    }
});