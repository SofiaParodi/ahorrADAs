/* Nueva Operación */

const form = document.getElementById('new-operation-input-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const objNewOperation = Object.fromEntries(formData);

  const jsonNewOperation = JSON.stringify(objNewOperation);  
  localStorage.setItem('newForm', jsonNewOperation);
  console.log(jsonNewOperation);

  const jsonNewOperationObj = localStorage.getItem('newForm');
  const objNewOperationObj = JSON.parse(jsonNewOperationObj);

console.log(objNewOperationObj);
})

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

/* burger menu */
const buttonMenu = document.getElementById("buttonMenu");
const headerNav = document.getElementById("headerNav");

buttonMenu.addEventListener("click", () => {
  headerNav.classList.toggle("hidden");
});





