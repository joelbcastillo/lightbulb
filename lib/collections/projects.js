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

        var projectId = Projects.insert(project);

        return { _id: projectId };
    },
    projectInviteUser: function(projectId, projectUsers, userAttributes){
        check(userAttributes, {
            email: String,
            username: String
        });
        check(this.userId, String);
        check(projectId, String);

        var errors = validateUserInvite(userAttributes);
        if(errors.username || errors.email) {
            throw new Meteor.Error('invalid-invite', 'Please make sure you have provided an existing username or email.')
        }

        var user = null;

        if (userAttributes.username) {
            user = Meteor.users.findOne({username: userAttributes.username});
        }
        else if (userAttributes.email) {
            user = Meteor.users.findOne({email: userAttributes.email});
        }

        if (Projects.findOne({_id: {$in: user.pendingProjects}})) {
            throw new Meteor.Error('invalid-invite', 'This user has already been invited to this project');
        }

        if (Meteor.users.findOne({_id: {$in: projectUsers}})) {
            throw new Meteor.Error('invalid-invite', 'This user is already a member of this project');
        }

        Meteor.users.update(user._id, {
            $addToSet: {pendingProjects: projectId}
        }, function(error) {
            if (error)
                return error;
        });

        return true;
    },
    projectAddUser: function(projectId, userId) {
        check(projectId, String);
        check(userId, String);

        Meteor.users.update(userId, {
            $pull: {pendingProjects: projectId}
        }, function(error) {
            if (error)
                return error;
        });

        Projects.update(projectId, {
            $addToSet: {users: userId}
        }, function(error) {
            if (error)
                return error;
        });

        return true;
    },
    //this should really be under a user method as userProjectDecline
    projectUserDecline: function(projectId, userId) {
        check(projectId, String);
        check(userId, String);

        Meteor.users.update(userId, {
            $pull: {pendingProjects: projectId}
        }, function(error) {
            if (error)
                return error;
        });

        return true;
    }

});

validateUserInvite = function(user) {
    var errors = {};

    if(!user.username && !user.email) {
        errors.username = "Please provide a username";
        errors.email = "Please provide an email";

        return errors;
    }
    if(user.username && user.email) {
        errors.username = "Please search only by username";
        errors.email = "Please search only by email";

        return errors;
    }

    if(user.username && !Meteor.users.findOne({username: user.username})) {
        errors.username = "We cannot find a user associated with that username."
    }
    if(user.email && !Meteor.users.findOne({email: user.email})) {
        errors.email = "We cannot find a user associated with that email."
    }

    return errors;
};