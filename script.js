// Power Matrix Tool namespace
PMT = {};

PMT.moodList = ['happy', 'neutral', 'sad'];
PMT.mood = function (moodEl) {
	return PMT.moodList.reduce(function (prev, mood) { return prev || moodEl.classList.contains(mood) && mood}, false);
};

PMT.updateIndicator = function (target, moodEl) {
		var mood = PMT.mood(moodEl);
		if (mood) { target.setAttribute('href', chrome.extension.getURL(mood + '.png')); }
}

// create an observer
var
// find dom element needed
happiness = document.getElementById('happiness'),
icon = document.querySelector('link[rel="icon"]'),
// bind updateIndicator to icon
updateIconIndicator = PMT.updateIndicator.bind(null, icon),
updateIndicatorOnClassMutation = function (mutation) {
	if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
		updateIconIndicator(mutation.target);
	}
},
observer = new MutationObserver(function(mutations) {
	mutations.forEach(updateIndicatorOnClassMutation);
});
// observe happiness
observer.observe(happiness, {attributes: true});
updateIconIndicator(happiness);
