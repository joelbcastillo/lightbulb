Template.projectPage.created = function() {
    if(Session.get('projectId') !== this.data._id){
        Session.set('messageLimit', 10);
        Session.set('viewArchives', false);
    }
    Session.set('projectId', this.data._id);
    localStorage.setItem('projectId', this.data._id);
}

Template.projectPage.helpers({
    viewingArchives: function(){
        console.log(Session.get('viewArchives'));
        return Session.get('viewArchives');
    }
});

Template.projectPage.events({
    'click .archives': function(e) {
        e.preventDefault();

        if(Session.get('viewArchives')){
            Session.set('viewArchives', false);
        } else {
            Session.set('viewArchives', true);
        }
    }
});