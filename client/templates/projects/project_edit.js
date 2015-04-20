Template.projectEdit.created = function () {
    Session.set ('projectSubmitErrors', {});
};

Template.projectEdit.helpers({
    errorMessage: function (field) {
        return Session.get('projectSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('projectSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.projectEdit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var project = {
            _id: template.data._id,
            description: $(e.target).find('[name=description]').val(),
            name: $(e.target).find('[name=name]').val()
        };

        var errors = validateProject(project);
        if (errors.name || errors.url)
            return Session.set('projectSubmitErrors', errors);

        Meteor.call('projectEdit', project, function(error, result) {

            if ( error )
                return throwError(error.reason);

            if (result.projectExists) {
                throwError('This name has already been used');
            }

            $('#editProjectModal').modal('hide');
            $('form[name="editProject"]').find('input[name="name"]').val('');
            $('form[name="editProject"]').find('input[name="description"]').val('');
            Router.go('projectPage', { _id: template.data._id});
        });
    }
});