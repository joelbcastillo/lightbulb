/**
 * Created by joel on 3/17/15.
 */

Errors = new Mongo.Collection(null);

throwError = function(message) {
    Errors.insert({message: message});
};