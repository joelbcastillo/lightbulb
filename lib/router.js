Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return Meteor.subscribe('projects');
    }
});

//Router.route('/', {name: 'projectsList'});
Router.route('/', {name: 'account'});

Router.route('/projects/:_id', {
    name: 'projectPage',
    data: function(){
        return Projects.findOne(this.params._id);
    }
});

Router.route('/projects/:_id/edit', {
    name: 'projectEdit',
    data: function(){
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

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});
Router.onBeforeAction(requireLogin, {only: 'projectCreate'});

