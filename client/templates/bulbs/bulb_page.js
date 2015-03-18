Template.bulbPage.helpers({
    sparks: function() {
        return Sparks.find({ bulbId: this._id });
    }
});
