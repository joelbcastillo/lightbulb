Template.chat.helpers({
    hasMore: function() {
        var numMessages = Messages.find({projectId: (this.projectId || this._id)}, {sort: {createdDate: 1} }).count();
        if(numMessages < Session.get('messageLimit')){
            return false;
        } else {
            return true;
        }
    }
});

Template.chat.events({
    'click .load-more': function(e) {
        e.preventDefault();

        Session.set('animateChat', true)
        if(Session.get('messageLimit'))
        {
            var increment = Session.get('messageLimit');
            increment += 10;
            Session.set('messageLimit', increment);
        }
        else{
            Session.set('prevMessageLimit', 10);
            Session.set('messageLimit', 20);
        }
    }
});