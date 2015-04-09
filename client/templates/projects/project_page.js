Template.projectPage.created = function() {
    if(Session.get('projectId') !== this.data._id){
        Session.set('messageLimit', 10);
    }
    Session.set('projectId', this.data._id);
}