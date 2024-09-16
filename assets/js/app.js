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
let editIndex;

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
    editIndex = undefined;
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

  /* new operation */
  const newOpForm = document.getElementById("new-operation-form");
  const newOpDescriptionInput = document.getElementById(
    "new-operation-description"
  );
  const newOpAmountInput = document.getElementById("new-operation-amount");
  const newOpTypeSelect = document.getElementById("new-operation-type");
  const newOpDateInput = document.getElementById("new-operation-date");

  newOpForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const description = newOpDescriptionInput.value.trim();
    const amount = parseFloat(newOpAmountInput.value);
    const type = newOpTypeSelect.value;
    const category = newOpCategorySelect.value;
    const date = newOpDateInput.value;
  
    if (!description || !amount || !date) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const operationToAddOrUpdate = {
      description,
      amount,
      type,
      category,
      date
    };
  
    if (editIndex === undefined) {
      operations.push(operationToAddOrUpdate);
    } else {
      operations[editIndex] = operationToAddOrUpdate;
    }
  
    localStorage.setItem("Operations", JSON.stringify(operations));
    renderOperations();
    newOpForm.reset();
    toggleNewOpForm();

  });

  /* render operations */
  const operationsListMobile = document.getElementById("operation-list-mobile");
  const operationsListDesktop = document.getElementById(
    "operation-list-desktop"
  );
  const operationsListDesktopContainer = document.getElementById(
    "operation-list-desktop-container"
  );
  const emptyOperationList = document.getElementById("empty-operation-list");

  function renderOperations() {
    if (operations.length === 0) {
      emptyOperationList.classList.remove("hidden");
      operationsListMobile.classList.add("hidden");
      operationsListDesktop.classList.add("hidden");
      operationsListDesktopContainer.classList.add("md:hidden");
    } else {
      document.getElementById("empty-operation-list").classList.add("hidden");
      operationsListMobile.classList.remove("hidden");
      operationsListDesktopContainer.classList.remove("md:hidden");
      operationsListDesktop.classList.remove("hidden");
      renderMobileOperations();
      renderDesktopOperations();
      opDeleteBtns();
      opEditBtns();
      updateBalance();
    }
  }

  function renderMobileOperations() {
    operationsListMobile.innerHTML = "";

    operations.forEach((operation, index) => {
      const amountColor =
        operation.type === "gasto" ? "text-red-500" : "text-green-500";
      const amountDisplay =
        operation.type === "gasto"
          ? `- $${operation.amount}`
          : `$${operation.amount}`;

      const li = document.createElement("li");
      li.classList.add("mb-5");
      li.innerHTML = `
            <div class="flex justify-between items-center">
                <p class="font-semibold text-md">${operation.description}</p>
                <p class="px-1 bg-green-200 text-green-800 rounded">${operation.category}</p>
            </div>
            <div class="mt-3 flex justify-between items-center">
                <div class="font-bold text-2xl ${amountColor}">${amountDisplay}</div>
                <div>
                    <button data-index="${index}" class="editOperationMobile mr-3 px-2 py-1 bg-blue-400 rounded-md text-white">Editar</button>
                    <button data-index="${index}" class="deleteOperationMobile px-2 py-1 bg-red-400 rounded-md text-white">Eliminar</button>
                </div>
            </div>
        `;
      operationsListMobile.appendChild(li);
    });
  }

  function renderDesktopOperations() {
    operationsListDesktop.innerHTML = "";

    operations.forEach((operation, index) => {
      const amountColor =
        operation.type === "gasto" ? "text-red-500" : "text-green-500";
      const amountDisplay =
        operation.type === "gasto"
          ? `- $${operation.amount}`
          : `$ ${operation.amount}`;

      const tr = document.createElement("tr");
      tr.innerHTML = `
          <td class="px-1 py-3 text-center font-bold">${operation.description}</td>
          <td class="px-1 py-3 text-center">${operation.category}</td>
          <td class="px-1 py-3 text-center">${operation.date}</td>
          <td class="px-1 py-3 text-center font-bold ${amountColor}">${amountDisplay}</td>
          <td class="px-1 py-3 text-center">
              <div class="flex justify-center space-x-4">
                  <button data-index="${index}" class="editOperationDesktop text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"><i class="fa-solid fa-pen-to-square"></i></button>
                  <button data-index="${index}" class="deleteOperationDesktop text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"><i class="fa-solid fa-trash"></i></button>
              </div>
          </td>
      `;
      operationsListDesktop.appendChild(tr);
    });
  }

  function opDeleteBtns() {
    document.querySelectorAll(".deleteOperationMobile").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const operation = operations[index];
        if (
          confirm(
            `¿Estás seguro de que deseas eliminar la operación "${operation.description}"?`
          )
        ) {
          operations.splice(index, 1);
          localStorage.setItem("Operations", JSON.stringify(operations));
          renderOperations();
        }
      });
    });

    document.querySelectorAll(".deleteOperationDesktop").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        const operation = operations[index];
        if (
          confirm(
            `¿Estás seguro de que deseas eliminar la operación "${operation.description}"?`
          )
        ) {
          operations.splice(index, 1);
          localStorage.setItem("Operations", JSON.stringify(operations));
          renderOperations();
        }
      });
    });
  }

  /* edit operation */
  function showOperationForm(index = null) {
    if (index === null) {
      newOpDescriptionInput.value = "";
      newOpAmountInput.value = "";
      newOpTypeSelect.value = "gasto";
      newOpCategorySelect.value = categories[0];
      newOpDateInput.value = "";
      
      editIndex = undefined;
    } else {
      const operation = operations[index];
      
      newOpDescriptionInput.value = operation.description;
      newOpAmountInput.value = operation.amount;
      newOpTypeSelect.value = operation.type;
      newOpCategorySelect.value = operation.category;
      newOpDateInput.value = operation.date;

      editIndex = index;
    }
    
    toggleNewOpForm();
  }

  function opEditBtns() {
    document.querySelectorAll(".editOperationMobile").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        showOperationForm(index);
      });
    });

    document.querySelectorAll(".editOperationDesktop").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        showOperationForm(index);
      });
    });

  }

  /* on init */
  renderOperations();
  updateBalance();

  /* balance */
  function updateBalance() {
    const earningsNumber = document.getElementById("number-ganancias");
    const expensesNumber = document.getElementById("number-gastos");
    const totalNumber = document.getElementById("number-total");

    const earnings = operations
      .filter((operation) => operation.type === "ganancia")
      .reduce((total, op) => total + parseFloat(op.amount), 0);
    earningsNumber.textContent = `+ $${earnings}`;

    const expenses = operations
      .filter((operation) => operation.type === "gasto")
      .reduce((total, op) => total + parseFloat(op.amount), 0);
    expensesNumber.textContent = `- $${expenses}`;

    const total = earnings - expenses;
    totalNumber.textContent = `${total < 0 ? "- " : "+ "}$${Math.abs(total)}`;
    totalNumber.className =
      total < 0
        ? "text-red-500 font-bold text-xl"
        : "text-green-500 font-bold text-xl";
  }
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

/* Reportes */



