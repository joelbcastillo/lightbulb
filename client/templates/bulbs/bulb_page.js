Template.bulbPage.helpers({
    // limit what is sent
    project : function() {
        return Projects.findOne({_id: this.projectId});//, {name: 1, description: 1});
    },
    archived: function() {
        return this.isArchived;
    },
    luminance_css: function() {
        var opacity = (this.sparksCount > 0) ? this.curr_lum / this.max_lum : 0.5;
        return 'opacity: ' + opacity;
    },
    luminance_value: function() {
        var opacity = (this.sparksCount > 0) ? this.curr_lum / this.max_lum : 0.5;
        return Math.round(opacity * 100);
    }
});

Template.bulbPage.rendered = function() {
    var firstSpark = Sparks.findOne({bulbId: this.data._id});
    Session.set("bulbId", this.data._id);
    Session.set('sparkId', firstSpark._id);
};

Template.bulbPage.events({
    'click .archive': function(e) {
        e.preventDefault();

        Meteor.call('toggleArchived', this._id);
    }
});