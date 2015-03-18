Template.projectItem.helpers ({
   ownProject: function () {
       return this.userId === Meteor.userId();
   }
});

Template.projectItem.events ({
    'click .delete-project': function(event) {
        event.preventDefault();

        var currentProjectId = this._id;
        Projects.remove(currentProjectId);
        Router.go('account');
    }
});