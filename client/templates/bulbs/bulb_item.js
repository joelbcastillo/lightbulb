Template.bulbPage.helpers({
    bulbs: function() {
        return Bulbs.find(this.id);
    }
});