Template.sparkItem.helpers({
    status: function() {
        var stat = (this.upvotes / (this.downvotes + this.upvotes)).toFixed(2);
        if (stat > .66) {
            return 'spark-good';
        } else if (stat < .33) {
            return 'spark-bad';
        } else {
            return 'spark-neutral';
        }
    },
    submittedText: function(){
        return this.submitted.toString();
    }//,
    //comments: function() {
    //    return Comments.find({ sparkId: this._id });
    //},
    //selectedSpark: function(){
    //    return Session.get("sparkId") === this._id;
    //}
});

Template.sparkItem.events({
    'click .spark-comment': function(e) {
        e.preventDefault();

        Session.set("bulbId", this.bulbId);
        Session.set("sparkId", this._id);
    },
    'click .upvote': function(e) {
        e.preventDefault();

        Meteor.call('upvote', this._id);
    },
    'click .downvote': function(e) {
        e.preventDefault();

        Meteor.call('downvote', this._id);
    },
    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this spark?")) {
            Meteor.call('removeSpark', this._id);
        }
    }
});