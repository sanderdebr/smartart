import { elements } from './elements';
import * as detailView from './detailView';

// SLIDE FUNCTIONALITY 

export const slide = (event) => {
    let direction, currentMargin, maxWidth;

    maxWidth = (elements.paintings.length) * 300;

    const style = elements.artWrapper.currentStyle || window.getComputedStyle(elements.artWrapper);
    currentMargin = parseInt(style.marginLeft.replace('px', ''));

    if (event.target.classList.contains("circle__left") || event.target.parentNode.classList.contains("circle__left")) {
        // LEFT
        let currentMargin = parseInt(style.marginLeft.replace('px', ''));
        if (currentMargin < maxWidth) elements.artWrapper.style.marginLeft = currentMargin + 300;

    } else {
        // RIGHT
        let currentMargin = parseInt(style.marginLeft.replace('px', ''));
        if (currentMargin > (maxWidth * -1)) elements.artWrapper.style.marginLeft = currentMargin - 300;
    }
};

// CLEAR PAINTINGS

export const clear = () => {
    elements.paintings.forEach(painting => {
        painting.style.opacity = 0;
    })
    elements.paintingImg.forEach((img, i) => {
        img.src = '';
    })
}

// RENDER LOADER

export const renderLoader = () => {
    const loader = '<div class="lds-dual-ring painting"></div>';
    elements.artSection.insertAdjacentHTML('afterbegin', loader);
}

// RENDER PAINTINGS

export const renderPaintings = (paintings, likes) => {

    if (paintings.length > 1) {

            // Show paintings again
            elements.paintings.forEach(painting => {
                painting.style.opacity = 1;
            })

            let x = 0;
            // Replace paintings
            paintings.forEach((painting, i) => {
                const imgPath = paintings[i].primaryimageurl;
                const artist = paintings[i].title;
                const year = paintings[i].accessionyear;
                const desc = paintings[i].medium;
                const division = paintings[i].division;
                const objectnumber = paintings[i].objectnumber;
                if(imgPath) {
                    elements.paintings[i].style.display = 'block';
                    elements.paintingImg[i].src = imgPath;
                    elements.paintingImg[i].parentNode.setAttribute('data-year', year);
                    elements.paintingImg[i].parentNode.setAttribute('data-desc', desc);
                    elements.paintingImg[i].parentNode.setAttribute('data-artist', artist);
                    elements.paintingImg[i].parentNode.setAttribute('data-division', division);
                    elements.paintingImg[i].parentNode.setAttribute('data-objectnumber', objectnumber);
                } else {
                    x++;
                    elements.paintings[i].style.display = 'none';
                    console.log(elements.paintings.length);
                    if (x == elements.paintings.length) detailView.noResults();
                }
                // Check if painting isLiked
                let obj = likes.likes.find(o => o.object == objectnumber);
                if (obj) {
                    elements.likeButtons[i].name = 'heart';
                    const likeBtnArr = Array.from(elements.likeButtons[i].childNodes);
                    console.log(likeBtnArr);
                    likeBtnArr[0].name = 'heart';
                }
            })
    } else {
        detailView.noResults();
        removeLoader();
        throw "No images found";
    }
}

// Remove loader
export const removeLoader = () => {
    const loader = document.querySelectorAll(`.lds-dual-ring.painting`);
    if (loader) {
        loader.forEach(loader => loader.parentElement.removeChild(loader));
    }
}

// Show current painting
export const showCurrent = currentPainting => {
    Array.from(elements.paintings).forEach(painting => {
        painting.classList.remove('painting--active');

    });
    currentPainting.classList.add('painting--active');
}