export const apiUrl = `https://mindhub-xj03.onrender.com/api/amazing`
export const eventosContainer = document.getElementById("eventosContainer");
export const checkboxContainer = document.getElementById("checkboxContainer");
export const eventNameInput = document.getElementById("eventNameInput");
export const searchButton = document.getElementById("searchButton");

export const eventsIn2023 = data.events.filter(event => event.date.startsWith("2023"));
export const eventsIn2022 = data.events.filter(event => !event.date.startsWith("2023"));



export const eventsToShow22 = eventsIn2022.slice(0, 7);
export const eventsToShow = eventsIn2023.slice(0, 7);

export function createCategoryCheckbox(category) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `filter${category}`;
  checkbox.className = "filter-checkbox";
  checkboxContainer.appendChild(checkbox);

  const label = document.createElement("label");
  label.htmlFor = `filter${category}`;
  label.innerText = category;
  checkboxContainer.appendChild(label);
}

export function createCategoryCheckbox2(category) {
  category.forEach((category) => {
    const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `filter${category}`;
  checkbox.className = "filter-checkbox";
  checkboxContainer.appendChild(checkbox);

  const label = document.createElement("label");
  label.htmlFor = `filter${category}`;
  label.innerText = category;
  checkboxContainer.appendChild(label);
    

  });
  }


export function mostrarEventos(eventos) {
    eventosContainer.innerHTML = "";

    if (eventos.length === 0) {
      document.getElementById("noResultsMessage").classList.remove("d-none");
    } else {
      document.getElementById("noResultsMessage").classList.add("d-none");
    }

    eventos.forEach((evento) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${evento.image}" alt="${evento.name}">
        <h2>${evento.name}</h2>
        <p>Descripción: ${evento.description}</p>
        <p>Precio: $${evento.price}</p>
        <a class="btn btn-secondary " role="button" href="details.html?_id=${evento._id}" aria-disabled="true">Details</a>
        
      `;

      eventosContainer.appendChild(card);
    });
}




export function filtrarEventos() {
    const categoriasSeleccionadas = [...document.querySelectorAll('.filter-checkbox')]
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.id.replace("filter", ""));

    const nombreBuscado = eventNameInput.value.toLowerCase().trim();

    const eventosFiltrados = data.events.filter((evento) => {
      const categoriaCoincide = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
      const nombreCoincide = evento.name.toLowerCase().includes(nombreBuscado);
      return categoriaCoincide && nombreCoincide;
    });

    mostrarEventos(eventosFiltrados);
}

export function crearTable(params) {
    
}

export function filtrarEventos2() {
  const categoriasSeleccionadas = [...document.querySelectorAll('.filter-checkbox')]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id.replace("filter", ""));

  const nombreBuscado = eventNameInput.value.toLowerCase().trim();

  const eventosFiltrados = eventsToShow.filter((evento) => {
    const categoriaCoincide = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
    const nombreCoincide = evento.name.toLowerCase().includes(nombreBuscado);
    return categoriaCoincide && nombreCoincide;
  });

  mostrarEventos(eventosFiltrados);
}


export function filtrarEventos22() {
  const categoriasSeleccionadas = [...document.querySelectorAll('.filter-checkbox')]
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id.replace("filter", ""));

  const nombreBuscado = eventNameInput.value.toLowerCase().trim();

  const eventosFiltrados = eventsToShow22.filter((evento) => {
    const categoriaCoincide = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
    const nombreCoincide = evento.name.toLowerCase().includes(nombreBuscado);
    return categoriaCoincide && nombreCoincide;
  });

  mostrarEventos(eventosFiltrados);
}