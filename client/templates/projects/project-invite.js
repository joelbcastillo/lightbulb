Template.projectInvite.helpers({
    errorMessage: function () {
        return Session.get('userInviteError');
    },
    errorClass: function () {
        return !!Session.get('userInviteError') ? 'has-error' : '';
    }
});

Template.projectInvite.events ({
    'submit form': function(e) {
        e.preventDefault();

        var currentProjectId = this._id;

        var user = {
            username: $(e.target).find('[name=username]').val(),
            email: $(e.target).find('[name=email]').val()
        };

        var error = validateUserInvite(user);
        if (error)
            return Session.set('userInviteError', error);

        Meteor.call('projectAddUser', currentProjectId, user, function(error, result) {

            if (error)
                return throwError(error.reason);

            if (result.userDoesNotExist)
                throwError('Cannot find user');

            $('#inviteUserModal').modal('hide');
            $('form[name="inviteUser"]').find('input[name="username"]').val('');
            $('form[name="inviteUser"]').find('input[name="email"]').val('');
            Router.go('projectPage', { _id: currentProjectId});
        });
    }
});