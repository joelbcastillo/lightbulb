Template.bulbPage.helpers({
    // limit what is sent
    project : function() {
        return Projects.findOne({_id: this.projectId});//, {name: 1, description: 1});
    }
});