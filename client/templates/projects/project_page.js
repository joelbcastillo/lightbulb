Template.projectPage.created = function() {
    Session.set('inProject', true);
    console.log(this.params._id);
    Session.set('currentProjectId', this.params._id);
};