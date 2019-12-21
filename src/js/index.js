import '../css/main.scss';
import Search from './models/Search';
import { data } from './models/Data';
import { elements } from './views/elements';
import Likes from './models/Likes';
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
        paintingView.renderPaintings(state.search.result, state.likes);

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

// LIKE CONTROLLER

const controlLike = (e) => {
    let isLiked, objectnumber, division;

    if (!state.likes) state.likes = new Likes();

    objectnumber = e.target.parentNode.parentNode.dataset.objectnumber;
    division = e.target.parentNode.parentNode.dataset.division;

    // LIKE PAINTING
    if (e.target.name === 'heart-empty') {
        isLiked = true;
        e.target.name = 'heart';
        state.likes.addLike(objectnumber, division);
    
    // DISLIKE PAINTING
    } else {
        isLiked = false;
        e.target.name = 'heart-empty';
        state.likes.removeLike(objectnumber);
    }

    console.log(state.likes);

}

Array.from(elements.likeButtons).forEach(likeBtn => likeBtn.addEventListener('click', controlLike));

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

    // Render default likes
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    console.log('Likes: ', state.likes);

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

// Remove layer when all content has loaded
window.addEventListener('load', function() {
    elements.overlay.style.display = "none";
})