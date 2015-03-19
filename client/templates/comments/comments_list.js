Template.commentsList.helpers({
    comments: function() {
        return Comments.find({}, {sort: {submitted: -1}});
    },
    isSelected: function() {
        return this._id === Session.get('bulbId');
    }
});