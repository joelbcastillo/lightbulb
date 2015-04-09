Template.feedList.helpers({
    notifications: function () {
        return Notifications.find({}
        );
    }
});