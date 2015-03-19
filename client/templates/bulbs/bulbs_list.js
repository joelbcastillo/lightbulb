Template.bulbsList.helpers({
    bulbs: function() {
        return Bulbs.find({projectId: this._id});
    }
});