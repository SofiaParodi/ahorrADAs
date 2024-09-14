/* arrays */
const operations = JSON.parse(localStorage.getItem("Operations")) || [];

const categories = JSON.parse(localStorage.getItem("Categories")) || [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];

/* operations*/

/* Nueva Operación */
const newOperationSection = document.getElementById("new-operation-section");
const operationsSection = document.getElementById("operations-section");
const newOperationBtn = document.getElementById("button-nueva-operacion");
const cancelOpBtn = document.getElementById("cancelOpBtn");
const filterCategorySelect = document.getElementById("filtro-categoria");
const newOpCategorySelect = document.getElementById("new-operation-category");

if (window.location.pathname.includes("index.html")) {
  function populateCategoriesSelect(selectElement, categories) {
    categories.forEach((category) => {
      const optionElement = document.createElement("option");
      optionElement.value = category;
      optionElement.textContent = category;
      selectElement.appendChild(optionElement);
    });
  }

  populateCategoriesSelect(filterCategorySelect, categories);
  populateCategoriesSelect(newOpCategorySelect, categories);

  function toggleNewOpForm() {
    operationsSection.classList.toggle("hidden");
    operationsSection.classList.toggle("md:hidden");
    newOperationSection.classList.toggle("hidden");
  }

  newOperationBtn.addEventListener("click", () => {
    toggleNewOpForm();
  });

  cancelOpBtn.addEventListener("click", () => {
    toggleNewOpForm();
  });

  /* mostrar/ocultar filtros */
  const toggleFiltersBtn = document.getElementById("button-ocultar-filtros");
  const filtersContainer = document.getElementById("container-inputs-filtros");
  let showFilters = true;

  toggleFiltersBtn.addEventListener("click", () => {
    if (showFilters) {
      filtersContainer.classList.add("hidden");
      toggleFiltersBtn.innerText = "Mostrar filtros";
    } else {
      filtersContainer.classList.remove("hidden");
      toggleFiltersBtn.innerText = "Ocultar filtros";
    }

    showFilters = !showFilters;
  });

  /* nueva operación */
  const newOpForm = document.getElementById("new-operation-form");
  const newOpDescriptionInput = document.getElementById(
    "new-operation-description"
  );
  const newOpAmountInput = document.getElementById("new-operation-amount");
  const newOpTypeSelect = document.getElementById("new-operation-type");
  const newOpDateInput = document.getElementById("new-operation-date");
  const emptyOperationList = document.getElementById("empty-operation-list");

  newOpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = newOpDescriptionInput.value;
    const amount = newOpAmountInput.value;
    const type = newOpTypeSelect.value;
    const category = newOpCategorySelect.value;
    const date = newOpDateInput.value;

    const operationToAdd = {
      description: description,
      amount: amount,
      type: type,
      category: category,
      date: date,
    };

    operations.push(operationToAdd);
    localStorage.setItem("Operations", JSON.stringify(operations));
    renderOperations();
    newOpForm.reset();
  });

  /* render operations */
  const operationsListMobile = document.getElementById("operation-list-mobile");
  const operationsListDesktop = document.getElementById(
    "operation-list-desktop"
  );

  function renderOperations() {
    /* mobile */
    operationsListMobile.innerHTML = "";
    operations.forEach((operation, index) => {
      const li = document.createElement("li");
      li.classList.add("mb-5");
      li.innerHTML = `
            <div class="flex justify-between items-center">
              <p class="font-bold text-xl">${operation.description}</p>
              <p class="px-1 bg-green-200 text-green-800 rounded">${operation.category}</p>
            </div>

            <div class="mt-3 flex justify-between items-center">
              <div class="font-bold text-xl text-red-500">$ ${operation.amount}</div>

              <div>
                <button data-index="${index}" class="mr-3 px-2 py-1 bg-blue-400 rounded-md text-white">Editar</button>
                <button data-index="${index}" class="px-2 py-1 bg-red-400 rounded-md text-white">Eliminar</button>
              </div>
            </div>
    `;
      operationsListMobile.appendChild(li);
    });

    /* desktop */
    operationsListDesktop.innerHTML = "";
    operations.forEach((operation, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
                <td class="px-1 py-3 text-center">${operation.description}</td>
                <td class="px-1 py-3 text-center">${operation.category}</td>
                <td class="px-1 py-3 text-center">${operation.date}</td>
                <td class="px-1 py-3 text-center">$ ${operation.amount}</td>
                <td class="px-1 py-3 text-center">
                  <div class="flex justify-center space-x-4">
                    <button data-index="${index}" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button data-index="${index}" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </td>
                `;
                operationsListDesktop.appendChild(tr);
    });
  }

  /* on init */
  renderOperations();
}

/* categories */
const categoriesForm = document.getElementById("categories-form");
const categoriesList = document.getElementById("categories-list");
const categoriesInput = document.getElementById("categories-input");
const categoriesListSection = document.getElementById(
  "categories-list-section"
);
const editCategorySection = document.getElementById("edit-category-section");
const editCategoryInput = document.getElementById("edit-category-input");
const editCategoryForm = document.getElementById("edit-category-form");
const cancelEditBtn = document.getElementById("cancel-edit-button");
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

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const category = categories[index];
        if (
          confirm(
            `¿Estás seguro de que deseas eliminar la categoría "${category}"?`
          )
        ) {
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

    editBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        toggleCategoriesList();

        categoryIndex = e.target.getAttribute("data-index");
        const category = categories[categoryIndex];
        editCategoryInput.value = category;
      });
    });
  }

  editCategoryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const editedCategory = editCategoryInput.value.trim();
    categories.splice(categoryIndex, 1, editedCategory);
    localStorage.setItem("Categories", JSON.stringify(categories));
    renderCategories();
    toggleCategoriesList();
  });

  /* cancel button */
  function toggleCategoriesList() {
    categoriesListSection.classList.toggle("hidden");
    editCategorySection.classList.toggle("hidden");
  }

  cancelEditBtn.addEventListener("click", () => {
    toggleCategoriesList();
  });
}

/* burger menu */
const buttonMenu = document.getElementById("buttonMenu");
const headerNav = document.getElementById("headerNav");

buttonMenu.addEventListener("click", () => {
  headerNav.classList.toggle("hidden");
});
