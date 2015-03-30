Template.bulbItem.helpers({
    luminance: function() {
        var opacity = Math.random();
        console.log('background: rgba(255,255,0,' + opacity + ')');
        return 'background: rgba(255,255,0,' + opacity + ')';
    }
});