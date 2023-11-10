document.addEventListener("DOMContentLoaded", function () {
  const eventosContainer = document.getElementById("eventosContainer");
  const checkboxContainer = document.getElementById("checkboxContainer");
  const eventNameInput = document.getElementById("eventNameInput");
  const searchButton = document.getElementById("searchButton");
  let eventsToShow = []; 

 
  const apiUrl = `https://mindhub-xj03.onrender.com/api/amazing`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      
      console.log(data);
      
      const eventsIn2022 = data.events.filter(event => !event.date.startsWith("2023"));
      console.log(eventsIn2022);

      eventsToShow = eventsIn2022.slice(0, 22);

      const uniqueCategories = Array.from(new Set(data.events.map(event => event.category)));
      console.log(uniqueCategories);

      uniqueCategories.forEach(createCategoryCheckbox);

      eventNameInput.addEventListener("input", filtrarEventos2);
      searchButton.addEventListener("click", filtrarEventos2);
      document.querySelectorAll('.filter-checkbox').forEach(checkbox => checkbox.addEventListener("change", filtrarEventos2));

      mostrarEventos(eventsToShow);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });

  function createCategoryCheckbox(category) {
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

  function mostrarEventos(eventos) {
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

  function filtrarEventos2() {
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
});
