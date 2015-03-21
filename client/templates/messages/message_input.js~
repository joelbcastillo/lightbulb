Template.messageInput.events({
    'submit form': function(event, template) {
        event.preventDefault();
        
        var messageProperties = {
            message: $('#enteredMessage').val(),
            username: Meteor.user().username,
            projectId: (template.data.projectId || template.data._id)
        };

	$('#enteredMessage').val('');

        if (!messageProperties.message || !messageProperties.username) {
            return;
        }
        Meteor.call('messageInsert', messageProperties, function (error, result) {
            if (error)
                return alert(error.reason);
        });
	$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
    }
});
