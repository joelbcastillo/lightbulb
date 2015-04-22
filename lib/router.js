Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs'), Meteor.subscribe('users'), Meteor.subscribe('notifications') ];
    }
});


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


Router.route('/', {name: 'account'});

Router.route('/projects/:_id', {
    name: 'projectPage',
    waitOn: function(){
        console.log(this.params._id);
        return  Meteor.subscribe('messages', {projectId: this.params._id, sort: {createdDate: -1}/*, limit: Session.get('messageLimit') || 10*/ });
    },
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

Router.route('/bulbs/:_id', {
    name: 'bulbPage',
    loadingTemplate: 'bulbPage',
    waitOn: function() {
        return (Session.get('sparkId') && Session.get('bulbId') === this.params._id) ? [ Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('comments', Session.get('sparkId')), Meteor.subscribe('messages', {projectId: Session.get('projectId'), sort: {createdDate: -1} })] : Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('messages', {projectId: localStorage.getItem('projectId'), sort: {createdDate: -1} });
        //return (Session.get('sparkId') && Session.get('bulbId') === this.params._id) ? [ Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('comments', Session.get('sparkId')), Meteor.subscribe('messages', {projectId: Session.get('projectId'), sort: {createdDate: -1}, limit: Session.get('messageLimit') || 10 })] : Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('messages', {projectId: localStorage.getItem('projectId'), sort: {createdDate: -1}, limit: Session.get('messageLimit') || 10 });
    },
    data: function() {
        return Bulbs.findOne(this.params._id);
    }
});

Router.onBeforeAction('dataNotFound', {only: 'account'});
Router.onBeforeAction(requireLogin, {only: 'account'});
Router.onBeforeAction(requireLogin, {only: 'projectPage'});
Router.onBeforeAction('dataNotFound', {only: 'projectPage'});
Router.onBeforeAction(requireLogin, {only: 'bulbPage'});
Router.onBeforeAction('dataNotFound', {only: 'bulbPage'});
