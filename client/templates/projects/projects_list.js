Template.projectsListSelf.helpers({
    projects: function () {
        return Projects.find({userId: Meteor.userId()}, {sort: {submitted: -1}});
    }
});

Template.projectsListOther.helpers({
    projects: function () {
        return Projects.find({userId: {$ne: Meteor.userId()}}, {sort: {submitted: -1}});
    }
});