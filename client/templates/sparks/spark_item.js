Template.sparkItem.helpers({
    submittedText: function(){
        return this.submitted.toString();
    },
    comments: function() {
        return Comments.find({ sparkId: this._id });
    }
});
