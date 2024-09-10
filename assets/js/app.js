/* categories */
const categories = JSON.parse(localStorage.getItem("Categories")) || [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];
const categoriesForm = document.getElementById("categories-form");
const categoriesList = document.getElementById("categories-list");
const categoriesInput = document.getElementById("categories-input");
const categoriesListSection = document.getElementById("categories-list-section");
const editCategorySection = document.getElementById("edit-category-section");
const editCategoryInput = document.getElementById("edit-category-input");
const editCategoryForm = document.getElementById("edit-category-form");
let categoryIndex;

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
        categoriesListSection.classList.add("hidden");
        editCategorySection.classList.remove("hidden");

        const categoryIndex = e.target.getAttribute("data-index");
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

    categoriesListSection.classList.remove("hidden");
    editCategorySection.classList.add("hidden");
  })



/* burger menu */
const buttonMenu = document.getElementById("buttonMenu");
const headerNav = document.getElementById("headerNav");

buttonMenu.addEventListener("click", () => {
  headerNav.classList.toggle("hidden");
});

