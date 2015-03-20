Template.chatList.helpers({
    messages: function () {
	//var msgs = Messages.find({});
	//console.log(msgs);
	//msgs.reverse();        
	//return Messages.find({});
	return Messages.find({}, {sort: {createdDate: 1} });
    }
});

Template.chatList.rendered = function() {
    if(!this._rendered) {
        message_cont = document.getElementById('messages');
        message_cont.scrollTop = message_cont.scrollHeight;
    }
};
