import { elements } from './elements';
import * as paintingView from './paintingView';

export const renderDetails = painting => {
    if (painting.dataset.year && painting.dataset.artist && painting.dataset.desc) {
        elements.year.innerHTML = painting.dataset.year;
        elements.artist.innerHTML = painting.dataset.artist;
        elements.title.innerHTML = painting.dataset.desc;
        paintingView.showCurrent(painting);
    } else {
        clear();
    }
}

export const clear = () => {
    elements.year.innerHTML = '';
    elements.artist.innerHTML = 'Please select an artwork';
    elements.title.innerHTML = '';
}

export const noResults = () => {
    elements.year.innerHTML = '';
    elements.artist.innerHTML = 'No results found';
    elements.title.innerHTML = '';
}