Template.projectUserInvited.helpers({
    pendingProjects: function() {
        return Projects.find({_id: {$in: Meteor.user().pendingProjects}});
    },
    dismiss: function() {
        return Projects.find({_id: {$in: Meteor.user().pendingProjects}}).count() === 1 ? 'modal' : '';
    }
});

Template.projectUserInvited.events({
    'click .accept': function() {
        //'this' is the project object
        Meteor.call('projectAddUser', this._id, Meteor.userId(), function(error) {

            if (error)
                return throwError(error.reason);

            Router.go('account');
        });
    },
    'click .decline': function() {
        Meteor.call('projectUserDecline', this._id, Meteor.userId(), function(error) {

            if (error)
                return throwError(error.reason);

            Router.go('account');
        });
    }
});