/* arrays */
const categories = JSON.parse(localStorage.getItem("Categories")) || [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];

/* Nueva Operación */
const newOperationSection = document.getElementById('new-operation-section');
const operationsSection = document.getElementById('operations-section');
const newOperationBtn = document.getElementById('button-nueva-operacion')
const cancelOpBtn = document.getElementById('cancelOpBtn');
const filterCategorySelect = document.getElementById('filtro-categoria');
const newOpCategorySelect = document.getElementById('new-operation-category');

// const form = document.getElementById('new-operation-input-container');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = new FormData(form);
//   const objNewOperation = Object.fromEntries(formData);

//   const jsonNewOperation = JSON.stringify(objNewOperation);  
//   localStorage.setItem('newForm', jsonNewOperation);
//   console.log(jsonNewOperation);

//   const jsonNewOperationObj = localStorage.getItem('newForm');
//   const objNewOperationObj = JSON.parse(jsonNewOperationObj);

// console.log(objNewOperationObj);
// })
if (window.location.pathname.includes("index.html")) {
  function populateCategoriesSelect (selectElement, categories) {
    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category;
      optionElement.textContent = category;
      selectElement.appendChild(optionElement);
  })
}

populateCategoriesSelect(filterCategorySelect, categories);
populateCategoriesSelect(newOpCategorySelect, categories);

function toggleNewOpForm() {
  operationsSection.classList.toggle('hidden');
  operationsSection.classList.toggle('md:hidden');
  newOperationSection.classList.toggle('hidden');
}

newOperationBtn.addEventListener('click', () => {
  toggleNewOpForm();
})

cancelOpBtn.addEventListener('click', () => {
  toggleNewOpForm();
})
}

/* mostrar/ocultar filtros */
const toggleFiltersBtn = document.getElementById('button-ocultar-filtros');
const filtersContainer = document.getElementById('container-inputs-filtros');
let showFilters = true;

toggleFiltersBtn.addEventListener('click', () => {
  if (showFilters) {
    filtersContainer.classList.add('hidden');
    toggleFiltersBtn.innerText = 'Mostrar filtros';
  } else {
    filtersContainer.classList.remove('hidden');
    toggleFiltersBtn.innerText = 'Ocultar filtros';
  }
  
  showFilters = !showFilters;
})



/* categories */
const categoriesForm = document.getElementById("categories-form");
const categoriesList = document.getElementById("categories-list");
const categoriesInput = document.getElementById("categories-input");
const categoriesListSection = document.getElementById("categories-list-section");
const editCategorySection = document.getElementById("edit-category-section");
const editCategoryInput = document.getElementById("edit-category-input");
const editCategoryForm = document.getElementById("edit-category-form");
const cancelEditBtn = document.getElementById("cancel-edit-button")
let categoryIndex;


if (window.location.pathname.includes("categories.html")) {
/* on init */
renderCategories();

/* add */
categoriesForm.addEventListener("submit", (e) => {
  const categoryToAdd = categoriesInput.value.trim();

  e.preventDefault();
  categories.push(categoryToAdd);
  localStorage.setItem("Categories", JSON.stringify(categories));

  renderCategories();
  categoriesForm.reset();
});

function renderCategories() {
  categoriesList.innerHTML = "";
  categories.forEach((category, index) => {
    const li = document.createElement("li");
    li.classList.add("py-3", "flex", "justify-between", "items-center");
    li.innerHTML = `
            <div>
                <p>${category}</p>
            </div>
            <div>
            <button data-index="${index}" class="editBtn mx-2 px-3 py-1 bg-blue-200 rounded-md">Editar</button>
            <button data-index="${index}" class="deleteBtn mx-2 px-3 py-1 bg-red-400 rounded-md">Eliminar</button>
            </div>
        `;

    categoriesList.appendChild(li);
  });

  deleteBtnEvent();
  editBtnEvent();
}

/* delete button */
function deleteBtnEvent() {
const deleteBtns = document.querySelectorAll(".deleteBtn");

deleteBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const index = e.target.getAttribute("data-index");
    const category = categories[index];
    if (confirm(`¿Estás seguro de que deseas eliminar la categoría "${category}"?`)) {
      categories.splice(index, 1);
      localStorage.setItem("Categories", JSON.stringify(categories));
      renderCategories();
    }
  });
});
}

/* edit button */
function editBtnEvent() {
    const editBtns = document.querySelectorAll(".editBtn");

    editBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        toggleCategoriesList();

        categoryIndex = e.target.getAttribute("data-index");
        const category = categories[categoryIndex];
        editCategoryInput.value = category;
      });
    });
  }

  editCategoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editedCategory = editCategoryInput.value.trim();
    categories.splice(categoryIndex, 1, editedCategory);
    localStorage.setItem("Categories", JSON.stringify(categories));
    renderCategories();
    toggleCategoriesList();
  })

  /* cancel button */
  function toggleCategoriesList() {
    categoriesListSection.classList.toggle("hidden");
    editCategorySection.classList.toggle("hidden");
  }

  cancelEditBtn.addEventListener('click', () => {
    toggleCategoriesList();
  })
  }

/* burger menu */
const buttonMenu = document.getElementById("buttonMenu");
const headerNav = document.getElementById("headerNav");

buttonMenu.addEventListener("click", () => {
  headerNav.classList.toggle("hidden");
});





