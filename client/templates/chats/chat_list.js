Template.chatList.helpers({
    messages: function () {
        return Messages.find({}, {sort: {time: -1}});
    }
});

Template.chatList.rendered = function() {
    if(!this._rendered) {
        message_cont = document.getElementById('messages');
        message_cont.scrollTop = message_cont.scrollHeight;
    }
};