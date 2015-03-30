Projects = new Mongo.Collection('projects');

Projects.allow({
    remove: function(userId, project) {
        return ownsDocument(userId, project);
    }
});

Meteor.methods({
    projectInsert: function(projectAttributes) {
        check(this.userId, String);
        check(projectAttributes, {
            name: String,
            description: String
        });

        var user = Meteor.user();
        var project = _.extend(projectAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            users: []
        });

        // insert into db finally
        var projectId = Projects.insert(project);

        return { _id: projectId };
    },
    projectAddUser: function(projectId, userAttributes){
        check(userAttributes, {
            email: String,
            username: String
        });
        check(this.userId, String);
        check(projectId, String);

        var error = validateUserInvite(userAttributes);
        if(error) {
            throw new Meteor.Error('invalid-invite', "Please fill at least one of the fields")
        }

        var user = null;

        if (userAttributes.username) {
            user = Meteor.users.findOne({username: userAttributes.username});
            console.log(user);
        }

        if (userAttributes.email) {
            user = Meteor.users.findOne({email: userAttributes.email});
        }

        if (!user) {
            return {userDoesNotExist: true}
        }

        Projects.update(projectId, {
            $addToSet: {users: user._id}
        }, function(error) {
            if (error)
                return error;
        });

        return true;
    }

});

validateUserInvite = function(user) {
    var error = null;

    if(!user.username && !user.email) {
        error = "Please enter at least one of the fields ";
    }
    if(user.username && user.email) {
        error = "Please enter one or the other";
    }
    return error;
};