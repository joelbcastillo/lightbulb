Template.messageList.helpers({
    messages: function () {
        return Messages.find({projectId: (this.projectId || this._id)}, {sort: {createdDate: 1} });
    }
});


Template.messageList.rendered = function() {
    if(!this._rendered) {
        if(Session.get('animateChat')){
            $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
            Session.set('animateChat', false);
        }
	    else{
            $("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1);
        }
    }
};