/**
 * Created by joel on 3/17/15.
 */

ownsDocument = function(userId, doc) {
    return doc && doc.userId == userId;
}