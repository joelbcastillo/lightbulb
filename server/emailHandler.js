Meteor.methods({
    sendEmail: function (to, from, replyTo, subject, text) {
        check([from, replyTo, subject, text], [String]);
        check(to, Array);

        this.unblock();

        Email.send({
            to: to,
            from: from,
            replyTo: replyTo,
            subject: subject,
            text: text
        });
    }
});