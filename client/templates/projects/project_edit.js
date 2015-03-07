Template.projectEdit.events({
    'submit form': function(event) {
        event.preventDefault();

        var currentProjectId = this._id;

        var projectProperties = {
            name: $(event.target).find('[name=name]').val(),
            description: $(event.target).find('[name=description]').val()
        };

        Projects.update(currentProjectId, {$set: projectProperties}, function (error){
            if (error) {
                alert(error.reason);
            } else {
                Router.go('projectPage', {_id: currentProjectId});
            }
        });
    },

    'click .delete': function(event) {
        event.preventDefault();

        if (confim("Delete this project?")) {
            var currentProjectId = this.id;
            Projects.remove(currentProjectId);
            Router.go('projectsList');
        }
    }
});