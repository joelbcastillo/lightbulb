Projects = new Mongo.Collection('projects');

Projects.allow({
    remove: function(userId, project) {
        return ownsDocument(userId, project);
    }
});

Meteor.methods({
   projectInsert: function(projectAttributes) {
       check(this.userId, String);
       check(projectAttributes, {
           name: String,
           description: String
       });

       var user = Meteor.user();
       var project = _.extend(projectAttributes, {
           userId: user._id,
           author: user.username,
           submitted: new Date()
       });

       // insert into db finally
       var projectId = Projects.insert(project);

       return { _id: projectId };
   }
});