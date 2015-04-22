Template.messageItem.helpers({
    prettyDate: function() {
        return this.createdDate.toLocaleTimeString() + ", " + this.createdDate.toDateString();
    }
});