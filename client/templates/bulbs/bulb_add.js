Template.bulbAdd.created = function () {
    Session.set ('bulbSubmitErrors', {});
};

Template.bulbAdd.helpers({
    errorMessage: function (field) {
        return Session.get('bulbSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('bulbSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.bulbAdd.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var bulb = {
            projectId: template.data._id,
            synopsis: $(e.target).find('[name=synopsis]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validateBulb(bulb);
        if (errors.title || errors.url)
            return Session.set('bulbSubmitErrors', errors);

        Meteor.call('bulbInsert', bulb, function(error, result) {

            if ( error )
                return throwError(error.reason);

            if (result.bulbExists) {
                throwError('This title has already been used');
            }

            $('#createBulbModal').modal('hide');
            $('form[name="createBulb"]').find('input[name="title"]').val('');
            $('form[name="createBulb"]').find('input[name="synopsis"]').val('');
            Router.go('projectPage', { _id: template.data._id});
        });
    }
});