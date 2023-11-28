const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-PT-SF/events";

const state = {
    events: []
};

const eventList =document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");

addEventForm .addEventListener("submit", addEvent);

// Function to render current list from API of Events from the state
async function render () {
    await getEvents ();
    renderEvents ();
};

render ();

// Function to call events list from API
async function getEvents () {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    };
};

// Function to render the list of events from state
function renderEvents () {
    if (!state.events.length) {
        eventList.innerHTML = "<li>No Events</li>";
        return;
    };

    const eventCards = state.events.map((event) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>${event.date}</p>
            <p>${event.location}</p>
            <button>Delete Event</button>
        `
        return li;
    });

    eventList.replaceChildren(...eventCards);
};

// Asks API to create a new event based on form data
async function addEvent (event) {
    event.preventDefault();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: addEventForm.name.value,
                description: addEventForm.description.value,
                date: new Date(addEventForm.date.value).toISOString(),
                location: addEventForm.location.value,
            })
        });

        if (!response.ok) {
            throw new Error("Failed to Create Event");
        };
        console.log(response);
        render();

    } catch (error) {
        console.error (error);
    };
};

// Asks API to delete an event based on user input
//TODO: Add in the function for deleting an event, adding the addEventListener for delete, and re-render list.