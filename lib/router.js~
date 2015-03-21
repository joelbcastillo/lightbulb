Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Session.get('inProject') ? [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs'), Meteor.subscribe('messages', Session.get('currentProjectId')) ] : [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs') ];
        //return [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs') ];
    }
});

//Router.route('/', {name: 'projectsList'});
Router.route('/', {name: 'account'});

Router.route('/projects/:_id', {
    name: 'projectPage',
    data: function() {
        return Projects.findOne(this.params._id);
    }
});

Router.route('/projects/:_id/edit', {
    name: 'projectEdit',
    data: function() {
        return Projects.findOne(this.params._id);
    }
});

Router.route('/projectCreate', {name: 'projectCreate'});

var requireLogin = function() {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.route('/bulbs/:_id', {
    name: 'bulbPage',
    loadingTemplate: 'bulbPage',
    waitOn: function() {
        return (Session.get('sparkId') && Session.get('bulbId') === this.params._id) ? [ Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('comments', Session.get('sparkId'))] : Meteor.subscribe('sparks', this.params._id);
    },
    data: function() {
        return Bulbs.findOne(this.params._id);
    }
});

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});
Router.onBeforeAction(requireLogin, {only: 'account'});