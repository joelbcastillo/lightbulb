Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
       // return Session.get('inProject') ? [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs'), Meteor.subscribe('messages', Session.get('currentProjectId')) ] : [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs') ];
        return [ Meteor.subscribe('projects'), Meteor.subscribe('bulbs'), Meteor.subscribe('users') ];
    }
});

//Router.route('/', {name: 'projectsList'});
Router.route('/', {name: 'account'});

/*Router.route('/projects/:_id', {
    name: 'projectPage',
    increment: 10,
    messagesLimit: function() {
        return Session.get('messagesLimit') || this.increment;
    },
    findOptions: function() {
        return {projectId: this.params._id, sort: {createdDate: -1}, limit: this.messagesLimit() };
    },
    waitOn: function(){
        console.log(this.params._id);
        return  Meteor.subscribe('messages', this.findOptions());
    },
    messages: function() {
        return Messages.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.messages().count() === this.messagesLimit();
        var nextMessages = this.route.path({messagesLimit: this.messagesLimit() + this.increment});
        return {
            project: Projects.findOne(this.params._id),
            messages: this.messages(),
            nextMessages: hasMore ? nextMessages : null
        }
    }
});*/

Router.route('/projects/:_id', {
    name: 'projectPage',
    waitOn: function(){
        console.log(this.params._id);
        return  Meteor.subscribe('messages', {projectId: this.params._id, sort: {createdDate: -1}, limit: Session.get('messageLimit') || 10 });
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
    //loadingTemplate: 'bulbPage',
    waitOn: function() {
        return (Session.get('sparkId') && Session.get('bulbId') === this.params._id) ? [ Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('comments', Session.get('sparkId')), Meteor.subscribe('messages', {projectId: Session.get('projectId'), sort: {createdDate: -1}, limit: Session.get('messageLimit') || 10 })] : Meteor.subscribe('sparks', this.params._id), Meteor.subscribe('messages', {projectId: Session.get('projectId'), sort: {createdDate: -1}, limit: Session.get('messageLimit') || 10 });
    },
    data: function() {
        return Bulbs.findOne(this.params._id);
    }
});

Router.onBeforeAction('dataNotFound', {only: 'projectPage'});
Router.onBeforeAction(requireLogin, {only: 'account'});
