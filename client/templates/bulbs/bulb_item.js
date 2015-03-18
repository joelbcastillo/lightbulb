Template.bulbItem.helpers({
    ownBulb: function () {
        return this.userId === Meteor.userId();
    }
});