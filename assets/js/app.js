const hamburgerMenu = document.getElementById('buttonMenu');
const headerNav = document.getElementById('headerNav');

buttonMenu.addEventListener('click', () => {
    headerNav.classList.toggle('hidden');
})