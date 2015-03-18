Template.projectCreate.events({
    'submit form': function(event) {
        event.preventDefault();
        var project = {
            name: $(event.target).find('[name=name]').val(),
            description: $(event.target).find('[name=description]').val()
        };

        $('body').removeClass('modal-open');  // or else scrolling won't work!

        Meteor.call('projectInsert', project, function (error, result) {
            if (error)
                return alert(error.reason);
            Router.go('projectPage', {_id: result._id});
        });
    }
});
