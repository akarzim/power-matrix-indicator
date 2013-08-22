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
        if (mood) { document.querySelector('link[rel="icon"]').setAttribute('href', chrome.extension.getURL(mood + '.png')); }
        return this;
    }

		// create an observer
		var
		updateIndicatorOnClassMutation = function (mutation) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'class' ) {
				$(mutation.target).updateIndicator();
			}
		},
		observer = new MutationObserver(function(mutations) {
			mutations.forEach(this);
		}.bind(updateIndicatorOnClassMutation));
		// observe happiness
		observer.observe(document.getElementById('happiness'), {attributes: true});
		$('#happiness').updateIndicator();

});
