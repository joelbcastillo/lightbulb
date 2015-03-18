Bulbs = new Mongo.Collection('bulbs');

// TODO: create a Meteor method for bulbEdit (get rid of deny/allow garbage)

Bulbs.allow({
    update: function(userId, bulb) {
        return ownsDocument(userId, bulb);
    },
    remove: function(userId, bulb) {
        return ownsDocument(userId, bulb);
    }
});

Bulbs.deny({
    update: function(userId, bulb, fieldNames) {
        return (_.without(fieldNames, 'title', 'synopsis').length > 0);
    }
});

Bulbs.deny({
    update: function(userId, bulb, fieldNames, modifier) {
        var errors = validateBulb(modifier.$set);
        return errors.title || errors.url;
    }
});

validateBulb = function(bulb) {
    var errors = {};
    console.log(bulb);
    if(!bulb.title)
        errors.title = "Please enter a title";
    if(!bulb.synopsis)
        errors.synopsis = "Please enter a synopsis";
    return errors;
}

Meteor.methods({
    bulbInsert: function(bulbAttributes) {
        check(Meteor.userId(), String);
        check(bulbAttributes, {
            title: String,
            synopsis: String
        });

        var errors = validateBulb(bulbAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-bulb', "You must set a title and synopsis for your bulb");

        var bulbWithSameLink = Bulbs.findOne({title: bulbAttributes.title});
        if (bulbWithSameLink) {
            return {
                bulbExists: true,
                _id: bulbWithSameLink._id
            }
        }

        var user = Meteor.user();
        var bulb = _.extend(bulbAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            sparksCount: 0
        });
        var bulbId = Bulbs.insert(bulb);
        return {
            _id: bulbId
        };
    }
});