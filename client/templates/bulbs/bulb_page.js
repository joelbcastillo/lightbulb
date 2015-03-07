Template.bulbPage.helpers({
    bulb: function(){
        return Bulbs.find({bulbId: this._id});
    }
});

