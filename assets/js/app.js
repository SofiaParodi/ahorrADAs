 /* categories */
 const categoriesArray = ['Comida', 'Servicios', 'Salidas', 'Educación', 'Transporte', 'Trabajo'];
 const categoriesForm = document.getElementById('categories-form');
 const categoriesList = document.getElementById('categories-list');


categoriesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const categoriesInput = document.getElementById('categories-input');
    const categoryToAdd = categoriesInput.value;

    categoriesArray.push(categoryToAdd);
    

    categoriesForm.reset();
})


 /* burger menu */
const hamburgerMenu = document.getElementById('buttonMenu');
const headerNav = document.getElementById('headerNav');

buttonMenu.addEventListener('click', () => {
    headerNav.classList.toggle('hidden');
})

