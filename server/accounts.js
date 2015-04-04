Accounts.onCreateUser(function(options, user) {
    user.pendingProjects = [];
    return user;
});
