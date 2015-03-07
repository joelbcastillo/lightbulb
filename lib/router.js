Router.configure({
    layoutTemplate: 'layout',
    waitOn: function() {
        return Meteor.subscribe('bulbs'), Meteor.subscribe('sparks');
    }
});

Router.route('/', {name: 'bulbsList'});

Router.route('/bulbs/:_id', {
    name: 'bulbPage',
    data: function() {
        return Bulbs.findOne(this.params._id);
    }
});