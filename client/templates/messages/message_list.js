Template.messageList.helpers({
    messages: function () {
        return Messages.find({}, {sort: {createdDate: 1} });
    }
});


Template.messageList.rendered = function() {
    if(!this._rendered) {
        message_cont = $('#messages');
        message_cont.scrollTop = message_cont.scrollHeight;
    }
};
