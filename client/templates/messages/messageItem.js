/**
 * Created by Sam on 4/20/2015.
 */

Template.messageItem.helpers({
    prettyDate: function() {
        return this.createdDate.toLocaleTimeString() + ", " + this.createdDate.toDateString();
    }
});