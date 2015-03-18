/**
 * Created by joel on 3/17/15.
 */

Template.bulbsList.helpers({
   bulbs: function() {
       return Bulbs.find();
   }
});