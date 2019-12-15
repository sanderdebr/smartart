import '../css/main.scss';
import Search from './models/Search';
import { data } from './models/Data';
import { elements } from './views/elements';
import * as paintingView from './views/paintingView';
import * as settingsView from './views/settingsView';
import * as detailView from './views/detailView';

const state = {};

// SAVE NEW SETTINGS
const controlSettings = async () => {

    // Remove current paintings and detail information
    paintingView.clear();
    detailView.clear();

    // Render loader icon
    paintingView.renderLoader();

    // Retrieve settings from settingsView
    const newSettings = settingsView.getSettings();

    // New Search object and add to state
    state.search = new Search(newSettings);

    // Retrieve paintings
    try {
        // Search for paintings
        await state.search.getPaintings();

        // Render results
        paintingView.renderPaintings(state.search.result);

        //Remove loader 
        paintingView.removeLoader();

        return true;

    } catch (err) {
        console.log(err);
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

// INIT APPLICATION
const init = () => {

    // Render settings on screen
    data.classification.forEach((el, i) => {
        settingsView.renderSettings(data.classification[i], 'classification');
    })

    data.century.forEach((el, i) => {
        settingsView.renderSettings(data.century[i], 'century');
    })
    
    // Render default artworks
    state.default = true;
    settingsView.renderDefault('Prints', '20th century');

    // Add event listeners for detail view
    let newPaintings = document.querySelectorAll('.painting');
    newPaintings.forEach(painting => {
        painting.addEventListener('click', () => {
                detailView.renderDetails(painting)
        });
    });

    // Render default information
    async function renderDefault() {
        try {
          const response = await controlSettings();
          if (response) {
                let defaultPainting = document.querySelector('.painting:nth-child(3)');
                detailView.renderDetails(newPaintings[2]);
          }
        }
        catch (err) {
          console.log('renderdefault failed', err);
        }
    }
     
    renderDefault();  

}

init();