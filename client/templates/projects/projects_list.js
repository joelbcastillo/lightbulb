Template.projectsListSelf.helpers({
    projects: function () {
        return Projects.find({userId: Meteor.userId()}, {sort: {submitted: -1}});
    }
});

Template.projectsListOther.helpers({
    projects: function () {
        return Projects.find({users: Meteor.userId()}, {sort: {submitted: -1}});
    }
});