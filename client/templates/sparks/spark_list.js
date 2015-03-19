Template.sparksList.helpers({
    sparks: function() {
        return Sparks.find({bulbId: this._id})
    }
})