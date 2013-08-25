// Power Matrix Tool namespace
PMT = {};

PMT.icon = null;
PMT.happiness = null;
PMT.moodList = ['happy', 'neutral', 'sad'];
PMT.mood = function () {
    var reduceMoodList = (function (prev, mood) { return prev || this.contains(mood) && mood }).bind(PMT.happiness.classList);
	return PMT.moodList.reduce(reduceMoodList, false);
};

PMT.updateIconIndicator = function (mood) {
    PMT.icon.setAttribute('href', chrome.extension.getURL(mood + '.png'));
}

PMT.updateMoodIndicator = function () {
    var mood = PMT.mood();
    if (mood) { PMT.updateIconIndicator(mood); }
}


// create an observer
// find dom element needed
PMT.gameWrapper = document.getElementById('game_wrapper');
PMT.happiness = document.getElementById('happiness');
PMT.icon = document.querySelector('link[rel="icon"]');

// bind updateIndicator to icon
var
updateIndicatorOnClassMutation = function (mutation) {
    if (mutation.target === PMT.happiness && mutation.type === 'attributes') {
        PMT.updateMoodIndicator();
    } else if (mutation.target === PMT.gameWrapper && mutation.addedNodes.length > 0 && document.querySelector('div#error_window')) {
        PMT.updateIconIndicator('error');
    }
},
observer = new MutationObserver(function(mutations) {
	mutations.forEach(updateIndicatorOnClassMutation);
});

// observe happiness
observer.observe(PMT.happiness, {attributes: true, attributeFilter: 'class'});
PMT.updateMoodIndicator();

// observe error window
observer.observe(PMT.gameWrapper, {childList: true});
