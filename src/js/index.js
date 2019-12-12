import '../css/main.scss';

// TOGGLE BUTTONS 

const buttons = document.querySelectorAll('.box__item');

const btnClick = (event) => {
    event.target.classList.toggle("active");
}

buttons.forEach(button => button.addEventListener('click', btnClick));

// SLIDE FUNCTIONALITY 

const arrowLeft = document.querySelector('.circle__left');
const arrowRight = document.querySelector('.circle__right');
const artWrapper = document.querySelector('.art__wrapper');
const paintings = document.querySelectorAll('.painting');

const slide = (event) => {
    let direction, currentMargin, maxWidth;

    maxWidth = (paintings.length) * 300;

    const style = artWrapper.currentStyle || window.getComputedStyle(artWrapper);
    currentMargin = parseInt(style.marginLeft.replace('px', ''));

    if (event.target.classList.contains("circle__left") || event.target.parentNode.classList.contains("circle__left")) {
        // LEFT
        let currentMargin = parseInt(style.marginLeft.replace('px', ''));
        if (currentMargin < maxWidth) artWrapper.style.marginLeft = currentMargin + 300;

    } else {
        // RIGHT
        let currentMargin = parseInt(style.marginLeft.replace('px', ''));
        if (currentMargin > (maxWidth * -1)) artWrapper.style.marginLeft = currentMargin - 300;
    }
}

arrowLeft.addEventListener('click', slide);
arrowRight.addEventListener('click', slide);