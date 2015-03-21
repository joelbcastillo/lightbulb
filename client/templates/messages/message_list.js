Template.messageList.helpers({
    messages: function () {
        return Messages.find({projectId: (this.projectId || this._id)}, {sort: {createdDate: 1} });
    }
});


Template.messageList.rendered = function() {
    if(!this._rendered) {
	$("#messages").animate({ scrollTop: $("#messages")[0].scrollHeight}, 1000);
    }
};
