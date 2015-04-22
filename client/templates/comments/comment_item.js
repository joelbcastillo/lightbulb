Template.commentItem.helpers({
    submittedTime: function() {
        return this.submitted.toLocaleTimeString() + ", " + this.submitted.toDateString();
    }
});