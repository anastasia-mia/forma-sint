import {Slider} from "./swiper.js";

const menuOpen = document.querySelector('.burger-menu-open');
const closeButton = document.querySelector('.burger-menu-close');
const burgerMenu = document.querySelector('.burger-menu');
const navBar = document.querySelector('.burger-menu-nav');
const burgerMenuWindow = document.querySelector('.burger-menu-window');

function closeBurgerMenu() {
    burgerMenu.classList.remove('active');
    burgerMenuWindow.classList.remove('active');
}

menuOpen.addEventListener('click', () => {
    burgerMenu.classList.add('active');
    burgerMenuWindow.classList.add('active');
})

closeButton.addEventListener('click', closeBurgerMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBurgerMenu();
});

burgerMenu.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-background')) {
        closeBurgerMenu();
    }
});

navBar.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A' || target.closest('a')) {
        closeBurgerMenu();
    }
});

window.addEventListener('hashchange', () => {
    const id = location.hash.slice(1);
    const section = document.querySelector(`.${id}-name`);
    if (section) {
        section.classList.add('highlight');
        setTimeout(() => {
            section.classList.remove('highlight');
        }, 700);
    }
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
    new Slider({
        container: ".swiper",
        endpoint: "https://brandstestowy.smallhost.pl/api/random",
        templateId: "slide-template"
    });
});