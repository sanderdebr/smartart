import { elements } from './elements';

export const renderSettings = (data, type) => {
    const markup = `
        <div data-type="${type}" class="box__item">${data}</div>
    `;
    type === 'classification' ? 
    elements.classification.insertAdjacentHTML('afterend', markup)
    : elements.century.insertAdjacentHTML('afterend', markup)
}

export const getSettings = () => {
    const userSettings = {
        classification: [],
        century: []
    }
    const active = document.querySelectorAll('.box__item.active');
    active.forEach(item => {
        const value = item.innerHTML;
        const type = item.dataset.type;
        if (type === 'classification') {
            userSettings.classification.push(value);
        } else if (type === 'century') {
            userSettings.century.push(value);
        }
    })
    return userSettings;
}

export const toggle = target => {
    target.classList.toggle("active");
}

export const renderDefault = (classification, century) => {
    const buttons = document.querySelectorAll('.box__item');
    buttons.forEach(button => {
        if (button.innerHTML == classification || button.innerHTML == century) {
            button.classList.toggle('active');
        }
    })
}