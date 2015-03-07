Template.sparksList.helpers({
    sparks: function () {
        console.log(this._id);
        console.log(Sparks.find({parent: this._id}));
        return Sparks.find({parent: this._id});
    }
});