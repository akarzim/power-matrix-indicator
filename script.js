$(document).ready(function ($) {
    $.fn.mood = function () {
        var i, moods = ['happy', 'neutral', 'sad'];
        for (i = 0; i < moods.length; i++) {
            if (this.hasClass(moods[i])) { return moods[i]; }
        }
        return null;
    }

    $.fn.updateIndicator = function () {
        var mood = this.mood();
        if (mood) { $('link[rel="icon"]').attr('href', chrome.extension.getURL(mood + '.png')); }
        return this;
    }

    $('#happiness').watch('background-position', $.fn.updateIndicator).updateIndicator();
});
