Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function () {
        return [ Meteor.subscribe('projects') ];
    }
});

Router.route('/', {name: 'account'});

ProjectPageController = RouteController.extend({
  template: 'projectPage',
  increment: 5, 
  messagesLimit: function() { 
    return parseInt(this.params.messagesLimit) || this.increment; 
  },
  projectId: function() {
    return Projects.findOne(this.params._id);
  },
  findOptions: function() { 
    return { sort: {createdDate: -1}, limit: this.messagesLimit() };
  },
  waitOn: function() {
    return Meteor.subscribe('messages', this.findOptions());
  },
  messages: function() {
    return Messages.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.messages().count() === this.messagesLimit();
    var nextPath = this.route.path({messagesLimit: this.messagesLimit() + this.increment});
    return {
      messages: this.messages(),
      nextPath: hasMore ? nextPath : null,
      project: this.projectId()
    };
  }
});

Router.route('/projects/:_id/:messagesLimit?', {
    name: 'projectPage'//,
   // waitOn: function() {
   //     var limit = parseInt(this.params.messagesLimit) || 5;
   //     return Meteor.subscribe('messages', {sort: {submitted: -1}, limit: limit});
   // },
   // data: function() {
   // var limit = parseInt(this.params.messagesLimit) || 5; 
   // return {
   //   messages: Messages.find({}, {sort: {submitted: -1}, limit: limit})
   // };
  //}
});

//Router.route('/projects/:_id', {
//    name: 'projectPage',
//    data: function(){
//        return Projects.findOne(this.params._id);
//    }
//});

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

