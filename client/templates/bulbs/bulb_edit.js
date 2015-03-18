/**
 * Created by joel on 3/17/15.
 */

Template.bulbEdit.created = function(){
    Session.set('bulbEditErrors', {});
}
Template.bulbEdit.helpers({
    errorMessage: function(field){
        return Session.get('bulbEditErrors')[field];
    },
    errorClass: function(field){
        return !!Session.get('bulbEditErrors')[field] ? 'has-error' : '';
    }
});

Template.bulbEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentbulbId = this._id;

        var bulbProperties = {
            synopsis: $(e.target).find('[name=synopsis]').val(),
            title: $(e.target).find('[name=title]').val()
        }

        var errors = validateBulb(bulbProperties);
        if(errors.title || errors.synopsis)
            return Session.set('bulbEditErrors', errors);

        Bulbs.update(currentbulbId, {$set: bulbProperties}, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                Router.go('bulbPage', {_id: currentbulbId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this bulb?")) {
            var currentbulbId = this._id;
            Bulbs.remove(currentbulbId);
            Router.go('bulbsList');
        }
    }
});