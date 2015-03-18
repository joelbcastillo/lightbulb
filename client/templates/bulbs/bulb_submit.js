Template.bulbSubmit.created = function () {
    Session.set ('bulbSubmitErrors', {});
};

Template.bulbSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('bulbSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('bulbSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.bulbSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var bulb = {
            synopsis: $(e.target).find('[name=synopsis]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        var errors = validateBulb(bulb);
        if (errors.title || errors.url)
            return Sessions.set('bulbSubmitErrors', errors);

        Meteor.call('bulbInsert', bulb, function(error, result) {

            console.log(result);

            if ( error )
                return throwError(error.reason);

            if (result.bulbExists) {
                throwError('This title has already been used');
            }

            Router.go('bulbPage', { _id: result._id});
        });
    }
});