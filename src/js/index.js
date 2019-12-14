import '../css/main.scss';
import Search from './models/Search';
import { data } from './models/Data';
import { elements } from './views/elements';
import * as paintingView from './views/paintingView';
import * as settingsView from './views/settingsView';

const state = {};

// INIT APPLICATION
const init = () => {

    // Render data on screen
    data.classification.forEach((el, i) => {
        settingsView.renderSettings(data.classification[i], 'classification');
    })

    data.century.forEach((el, i) => {
        settingsView.renderSettings(data.century[i], 'century');
    })
}

init();

// SAVE NEW SETTINGS
const controlSettings = async () => {

    // Remove current paintings
    paintingView.clear();

    // Render loader icon
    paintingView.renderLoader();

    // Retrieve settings from settingsView
    const newSettings = settingsView.getSettings();

    // New Search object and add to state
    state.search = new Search(newSettings);

    // Retrieve paintings
    try {
        // 4) Search for paintings
        await state.search.getPaintings();

        // 5) Render results
        paintingView.renderPaintings(state.search.result);

    } catch (err) {
        alert(err);
    }

}

elements.generate.addEventListener('click', controlSettings);

// SLIDE PAINTINGS
elements.arrowLeft.addEventListener('click', paintingView.slide);
elements.arrowRight.addEventListener('click', paintingView.slide);

// TOGGLE BUTTONS - CHECK CHANGES IN SETTINGS
elements.settings.addEventListener('click', (e) => {
    if (!e.target.classList.contains('box__generate')) {
        const activeClassification = document.querySelector('.box__item.active[data-type="classification"]');
        const activeCentury = document.querySelector('.box__item.active[data-type="century"]');
        const target = e.target.closest('.box__item');
        if (target.dataset.type == 'classification' && activeClassification) {
            settingsView.toggle(activeClassification);
        }
        if (target.dataset.type == 'century' && activeCentury) {
            settingsView.toggle(activeCentury);
        }
        settingsView.toggle(target);
    }
})