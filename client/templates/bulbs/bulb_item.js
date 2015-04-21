Template.bulbItem.helpers({
    luminance_css: function() {
        var opacity = (this.sparksCount > 0) ? this.curr_lum / this.max_lum : 0.5;
        return 'opacity: ' + opacity;
    },
    luminance_value: function() {
        var opacity = (this.sparksCount > 0) ? this.curr_lum / this.max_lum : 0.5;
        return opacity * 100;
    }
});