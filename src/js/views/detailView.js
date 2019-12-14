import { elements } from './elements';

export const renderDetails = painting => {
    elements.year.innerHTML = painting.dataset.year;
    elements.artist.innerHTML = painting.dataset.artist;
    elements.title.innerHTML = painting.dataset.desc;
}