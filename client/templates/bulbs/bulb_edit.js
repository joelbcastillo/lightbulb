Template.bulbEdit.created = function () {
    Session.set ('bulbSubmitErrors', {});
};

Template.bulbEdit.helpers({
    errorMessage: function (field) {
        return Session.get('bulbSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('bulbSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.bulbEdit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var bulb = {
            _id: template.data._id,
            synopsis: $(e.target).find('[name=synopsis]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validateBulb(bulb);
        if (errors.title || errors.url)
            return Session.set('bulbSubmitErrors', errors);

        Meteor.call('bulbEdit', bulb, function(error, result) {

            if ( error )
                return throwError(error.reason);

            if (result.bulbExists) {
                throwError('This title has already been used');
            }

            $('#editBulbModal').modal('hide');
            $('form[name="editBulb"]').find('input[name="title"]').val('');
            $('form[name="editBulb"]').find('input[name="synopsis"]').val('');
            Router.go('bulbPage', { _id: template.data._id});
        });
    }
});