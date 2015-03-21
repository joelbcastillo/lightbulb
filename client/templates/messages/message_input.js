Template.messageInput.events({
    'submit form': function(event, template) {
        event.preventDefault();

        message_cont = $('#messages');
        message_cont.scrollTop = message_cont.scrollHeight;

        $('#enteredMessage').keyup(function(e) {

            if (e.keyCode == 13) {
                message_cont.scrollTop = message_cont.scrollHeight;
                $(this).val('');
            }
        }).focus();

        var messageProperties = {
            message: $('#enteredMessage').val(),
            username: Meteor.user().username,
            projectId: (template.data.projectId || template.data._id)
        };

        if (!messageProperties.message || !messageProperties.username) {
            return;
        }
        Meteor.call('messageInsert', messageProperties, function (error, result) {
            if (error)
                return alert(error.reason);
        });
    }
});