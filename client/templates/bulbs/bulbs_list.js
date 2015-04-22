Template.bulbsList.helpers({
    bulbs: function () {
        if (Session.get('viewArchives')) {
            return Bulbs.find({projectId: this._id, isArchived: true});
        } else {
            return Bulbs.find({projectId: this._id, isArchived: false});
        }
    }
});