Template._loginButtonsLoggedInDropdown.events({
    'click #login-buttons-edit-profile': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('profileEdit');
    },
    'click #login-buttons-my-projects': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('projectsList');
    },
    'click #login-buttons-my-teams': function(event) {
        event.stopPropagation();
        Template._loginButtons.toggleDropdown();
        Router.go('teamsList');
    }
});