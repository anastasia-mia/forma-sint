const menuOpen = document.querySelector('.burger-menu-open');
const closeButton = document.querySelector('.burger-menu-close');
const burgerMenu = document.querySelector('.burger-menu');
const navBar = document.querySelector('.burger-menu-nav');
const burgerMenuWindow = document.querySelector('.burger-menu-window');

function closeBurgerMenu() {
    burgerMenu.style.display = 'none';
    burgerMenuWindow.classList.remove('active');
}

menuOpen.addEventListener('click', () => {
    burgerMenu.style.display = 'block';
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

navBar.addEventListener('click', closeBurgerMenu)