Template.sparkItem.helpers({
    submittedText: function(){
        return this.submitted.toString();
    },
    comments: function() {
        return Comments.find({ sparkId: this._id });
    },
    selectedSpark: function(){
        return Session.get("sparkId") === this._id;
    }
});

Template.sparkItem.events({
    'click .spark': function(e){
        e.preventDefault();

        Session.set( "sparkId", this._id );
    }
});