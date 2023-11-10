
const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
    console.log(data);

    const eventsIn2023 = data.events.filter(event => event.date);
    console.log(eventsIn2023);
    const uniqueCategories = Array.from(new Set(data.events.map(event => event.category)));
      console.log(uniqueCategories);
   
const getCurrentDateInMillis = () => new Date(data.currentDate).getTime();


const upcomingEvents = data.events.filter(event => new Date(event.date).getTime() >= getCurrentDateInMillis());
const pastEvents = data.events.filter(event => new Date(event.date).getTime() < getCurrentDateInMillis());


const eventsByAssistance = data.events.slice().sort((a, b) => b.assistance - a.assistance);
const eventsByCapacity = data.events.slice().sort((a, b) => b.capacity - a.capacity);


document.getElementById('highestAssistanceEvent').innerText = eventsByAssistance[0].name;
document.getElementById('lowestAssistanceEvent').innerText = eventsByAssistance[eventsByAssistance.length - 1].name;
document.getElementById('largerCapacityEvent').innerText = eventsByCapacity[0].name;


const upcomingEventsBody = document.getElementById('upcomingEventsBody');
upcomingEvents.forEach(event => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${event.name}</td><td>${event.date}</td><td>${event.estimate}</td>`;
  upcomingEventsBody.appendChild(row);
});

const pastEventsBody = document.getElementById('pastEventsBody');
pastEvents.forEach(event => {
  const row = document.createElement('tr');
  row.innerHTML = `<td>${event.name}</td><td>${event.date}</td><td>${event.assistance}</td>`;
  pastEventsBody.appendChild(row);
});


    

  })
  .catch(error => {
    
    console.error('Error en la solicitud:', error);
  });






