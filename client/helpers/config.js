Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'firstName',
        fieldLabel: 'First name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'lastName',
        fieldLabel: 'Last name',
        inputType: 'text',
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'email',
        fieldLabel: 'Email',
        inputType: 'text',
        verified: true,
        visible: true,
        saveToProfile: true
    }, {
        fieldName: 'location',
        fieldLabel: 'City, State',
        inputType: 'text',
        verified: true,
        visible: true,
        saveToProfile: true
    }]

});

accountsUIBootstrap3.setCustomSignupOptions = function() {
    //if we want to add refer codes, stuff that user doesnt have to know.
    return {
        referrerId: Session.get('referrerId') // Or whatever
    }
};

accountsUIBootstrap3.logoutCallback = function(error) {
    if(error) console.log("Error:" + error);
    Router.go('home');
};