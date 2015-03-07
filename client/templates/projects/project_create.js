Template.projectCreate.events({
    'submit form': function(event) {
        event.preventDefault();
        var project = {
            name: $(event.target).find('[name=name]').val(),
            description: $(event.target).find('[name=description]').val()
        };

        Meteor.call('projectInsert', project, function (error, result) {
            if (error)
                return alert(error.reason);
            Router.go('projectPage', {_id: result._id});
        });
    }
});
