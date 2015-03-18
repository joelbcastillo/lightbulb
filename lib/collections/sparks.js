/**
 * Created by joel on 3/17/15.
 */
Sparks = new Mongo.Collection('sparks');

Meteor.methods({
    sparkInsert: function(sparkAttributes) {
        check(this.userId, String);
        check(sparkAttributes, {
            bulbId: String,
            body: String
        });
        var user = Meteor.user();
        var bulb = Bulbs.findOne(sparkAttributes.bulbId);
        if (!bulb)
            throw new Meteor.Error('invalid-spark', 'You can only add sparks to a bulb.');
        spark = _.extend(sparkAttributes, {
            userId: user._id,
            //author: user.username,
            submitted: new Date(),
            commentsCount: 0
        });

        Bulbs.update(spark.bulbId, {$inc: {sparksCount: 1}});

        return Sparks.insert(spark);
    }
});