Template.sparkSubmit.created = function() {
    Session.set('sparkSubmitErrors', {});
}

Template.sparkSubmit.helpers({
    errorMessage: function(field) {
        return Session.get('sparkSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('sparkSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.sparkSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var $body = $(e.target).find('[name=body]');
        var spark = {
            body: $body.val(),
            bulbId: template.data._id
        };

        var errors = {};
        if (! spark.body) {
            errors.body = "Please write some content";
            return Session.set('sparkSubmitErrors', errors);
        }

        Meteor.call('sparkInsert', spark, function(error) {
            if (error){
                throwError(error.reason);
            } else {
                $body.val('');
            }
        });
    }
});
