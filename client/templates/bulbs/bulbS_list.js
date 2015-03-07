Template.bulbsList.helpers({
    bulbs: function() {
        console.log(Bulbs.find());
        return Bulbs.find();
    }
});