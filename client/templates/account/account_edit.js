Template.accountEdit.events({
    'submit form': function(event) {
        event.preventDefault();

        var user = {
            firstName: $(event.target).find('[name=firstName]').val(),
            lastName: $(event.target).find('[name=lastName]').val(),
            email: $(event.target).find('[name=email]').val(),
            location: $(event.target).find('[name=location]').val()
        }
        //firstName = $(event.target).find('[name=firstName]').val();
        //lastName = $(event.target).find('[name=lastName]').val();
        //email = $(event.target).find('[name=email]').val();
        //location = $(event.target).find('[name=location]').val();

        console.log(user.firstName);
        console.log(user.lastName);
        console.log(user.email);
        console.log(user.location);

        //$('body').removeClass('modal-open');  // or else scrolling won't work!
        $('#editProfileModal').modal('hide');
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { "profile.firstName": user.firstName, "profile.lastName": user.lastName, "profile.email": user.email, "profile.location": user.location }});
        Router.go('/')
    }
});