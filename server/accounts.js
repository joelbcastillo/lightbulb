Accounts.onCreateUser(function(options, user) {
    user.pendingProjects = [];
    user.profile = options.profile ? options.profile : {};
    return user;
});
