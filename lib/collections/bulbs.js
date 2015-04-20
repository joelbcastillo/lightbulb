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
    //console.log(bulb);
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
            projectId: String,
            title: String,
            synopsis: String
        });

        var errors = validateBulb(bulbAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-bulb', "You must set a title and synopsis for your bulb");

        var bulbWithSameTitle = Bulbs.findOne({title: bulbAttributes.title});
        if (bulbWithSameTitle) {
            return {
                bulbExists: true,
                _id: bulbWithSameTitle._id
            }
        }

        var user = Meteor.user();
        var bulb = _.extend(bulbAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            sparksCount: 0,
            base_lum: 0,
            curr_lum: 0,
            max_lum: 0,
            isArchived: false
        });
        var bulbId = Bulbs.insert(bulb);
        BulbNotification(bulbId, "add");
        return {
            _id: bulbId
        };
    },
    bulbEdit: function(bulbAttributes) {
        check(Meteor.userId(), String);
        check(bulbAttributes, {
            _id: String,
            title: String,
            synopsis: String
        });

        var errors = validateBulb(bulbAttributes);
        if (errors.title || errors.url)
            throw new Meteor.Error('invalid-bulb', "You must set a title and synopsis for your bulb");

        var bulbWithSameTitle = Bulbs.findOne({title: bulbAttributes.title});
        if (bulbWithSameTitle) {
            return {
                bulbExists: true,
                _id: bulbWithSameTitle._id
            }
        }

        Bulbs.update({_id: bulbAttributes._id}, { $set:
        {
            title: bulbAttributes.title,
            synopsis: bulbAttributes.synopsis
        }
        });
        //BulbNotification(bulbId, "add");
        return {
            _id: bulbAttributes._id
        };
    },
    toggleArchived: function(bulbId) {
        check(bulbId, String);

        var bulb = Bulbs.findOne(bulbId);
        if (bulb.isArchived === true){
            Bulbs.update(bulbId, {$set: {isArchived: false}});
        } else {
            Bulbs.update(bulbId, {$set: {isArchived: true}});
        }
    }
});