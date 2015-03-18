/**
 * Created by joel on 3/17/15.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('bulbs');
    }
});

Router.route('/', {name: 'bulbsList'});

Router.route('/bulbs/:_id', {
    name: 'bulbPage',
    waitOn: function() {
        return Meteor.subscribe('sparks', this.params._id);
    },
    data: function() { return Bulbs.findOne(this.params._id); }
});

Router.route('/bulbs/:_id/edit', {
    name: 'bulbEdit',
    data: function() { return Bulbs.findOne(this.params._id); }
});

Router.route('/submit', { name: 'bulbSubmit'});

var requireLogin = function() {
    if (! Meteor.user()) {
        if ( Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
        }
        this.render('accessDenied');
    }
    else {
        this.next();
    }
}

Router.onBeforeAction('dataNotFound', { only: 'bulbPage' });
Router.onBeforeAction(requireLogin, {only: 'bulbSubmit'});