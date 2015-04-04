Template.account.created = function() {
    return Session.set('inProject', false);
};

$('#projects a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
});

$('#teams a').click(function (e) {
    e.preventDefault();
    $(this).tab('show')
});

Template.account.helpers({
    pendingProjects: function() {
        return !!Projects.find({_id: {$in: Meteor.user().pendingProjects}}).count();
    }
});

//Template.account.helpers ({
//    selfProjectCount: function() {
//        return Projects.find({userId: Meteor.userId()}).count();
//    },
//    otherProjectCount: function () {
//        //return Projects.find({userId: {$ne: Meteor.userId()}}).count();
//    }
//});