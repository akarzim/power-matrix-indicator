$(document).ready(function ($) {
    $.fn.mood = function () {
        var i, moods = ['happy', 'neutral', 'sad'];
        for (i = 0; i < moods.length; i++) {
            if (this.hasClass(moods[i])) { return moods[i]; }
        }
        return null;
    }

     function updateIndicator (el) {
        var mood = $(el).mood();
        if (mood) { icon.setAttribute('href', chrome.extension.getURL(mood + '.png')); }
    }

		// create an observer
		var
		happiness = document.getElementById('happiness'),
		icon = document.querySelector('link[rel="icon"]'),
		updateIndicatorOnClassMutation = function (mutation) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class' ) {
				updateIndicator(mutation.target);
			}
		},
		observer = new MutationObserver(function(mutations) {
			mutations.forEach(this);
		}.bind(updateIndicatorOnClassMutation));
		// observe happiness
		observer.observe(happiness, {attributes: true});
		updateIndicator(happiness);

});
