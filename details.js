
const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);

    const eventsIn2023 = data.events.filter(event => event.date);
    console.log(eventsIn2023);

    let eventsToShow = eventsIn2023.slice(0, 37);

    const urlparams = new URLSearchParams(window.location.search);
    const _id = urlparams.get("_id");

    let eventsEncontrados = eventsToShow.find((event) => event._id == _id);

    console.log(eventsEncontrados);

    const contenedor = document.getElementById("contenedor");

    function createCard(arrayevent) {
      const cardt = document.createElement("div");
      cardt.classList.add("card");
      cardt.innerHTML = `
        <img src="${arrayevent.image}" class="card-img-top imgcards p-1" alt="...">
        <div class="card-body">
          <h4 class="card-title p-1">${arrayevent.name}</h4>
          <h6 class="card-text p-1">DATE: ${arrayevent.date}</h6>
          <h6 class="card-text p-1">DESCRIPTION: ${arrayevent.description}</h6>
          <h6 class="card-text p-1">CATEGORY: ${arrayevent.category}</h6>
          <h6 class="card-text p-1">PLACE: ${arrayevent.place}</h6>
          <h6 class="card-text p-1">CAPACITY: ${arrayevent.capacity}</h6>
          <h6 class="card-text p-1">ASSISTANCE: ${arrayevent.assistance}</h6>
          <h6 class="card-text p-1">PRICE: ${arrayevent.price}</h6>
        </div>
      `;

      contenedor.appendChild(cardt);
    }

    createCard(eventsEncontrados);

  })
  .catch(error => {
    
    console.error('Error en la solicitud:', error);
  });
