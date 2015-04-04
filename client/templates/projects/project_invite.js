Template.projectInvite.created = function () {
    Session.set('userInviteErrors', {});
};

Template.projectInvite.helpers({
    errorMessage: function (field) {
        return Session.get('userInviteErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('userInviteErrors')[field] ? 'has-error' : '';
    }
});

Template.projectInvite.events ({
    'submit form': function(e) {
        Session.set('userInviteErrors', {});

        e.preventDefault();

        var currentProjectId = this._id;
        var currentProjectUsers = this.users;

        var user = {
            username: $(e.target).find('[name=username]').val(),
            email: $(e.target).find('[name=email]').val()
        };

        var errors = validateUserInvite(user);
        if (errors.username || errors.email)
            return Session.set('userInviteErrors', errors);

        Meteor.call('projectInviteUser', currentProjectId, currentProjectUsers, user, function(error, result) {

            if (error)
                return throwError(error.reason);

            $('#inviteUserModal').modal('hide');
            $('form[name="inviteUser"]').find('input[name="username"]').val('');
            $('form[name="inviteUser"]').find('input[name="email"]').val('');
            Router.go('projectPage', { _id: currentProjectId});
        });
    }
});