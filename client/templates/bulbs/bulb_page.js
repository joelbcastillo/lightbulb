Template.bulbPage.helpers({
    // limit what is sent
    project : function() {
        return Projects.findOne({_id: this.projectId});//, {name: 1, description: 1});
    },
    archived: function() {
        return this.isArchived;
    }
});

Template.bulbPage.events({
    'click .archive': function(e) {
        e.preventDefault();

        Meteor.call('toggleArchived', this._id);
    }
})