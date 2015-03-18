Template.signup.events({
    'submit form' : function(event) {
        event.preventDefault();

        username = $(event.target).find('[name=username]').val(),
            firstName = $(event.target).find('[name=firstName]').val(),
            lastName =  $(event.target).find('[name=lastName]').val(),
            email= $(event.target).find('[name=email]').val(),
            password =$(event.target).find('[name=password]').val()
        
        Accounts.createUser({
            username: username,
            email : email,
            password : password,
            profile  : {
                firstname: firstName,
                lastname: lastName
            }

        });
        console.log('javlon rocks');
    }

});