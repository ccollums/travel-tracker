import {getData, addData} from './api';
import './css/base.scss';
import './images/beach.jpg';
import './images/travel-icon.svg';
import Travelers from './Travelers';
import User from './User';
import Trips from './Trips';
import Destinations from './Destinations';
import domUpdates from './domUpdates';
const dayjs = require('dayjs')


let user;
let travelers;
let trips;
let destinations;

const awayWeGoBtn = document.getElementById('submitButton');
const dateInput = document.getElementById('dateInput');
const durationInput = document.getElementById('durationInput');
const numberOfTravelersInput = document.getElementById('numberOfTravelersInput');
const destinationInput = document.getElementById('dropDownMenuDestinations');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');
const loginPage = document.getElementById('loginPage');
const mainDashboard = document.getElementById('mainDashboard')
const loginButton = document.getElementById('loginButton');

const retrieveData = (id) => {
  const allPromise = Promise.all([getData('travelers'), getData('trips'), getData('destinations'), getData(`travelers/${id}`)])
    .then(data => {createInitialDashboard(data)})
}

const createInitialDashboard = (data) => {
  travelers = new Travelers(data[0].travelers);
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations);
  user = new User(data[3])
  domUpdates.addDestinationsToDropDown(destinations.retrieveDestinationNames())
  addIndividualUserInfo();
  // domUpdates.glider();
}

const addIndividualUserInfo = () => {
  user.destinations = destinations.retrieveDestinationNames()
  user.trips = trips.retrieveTripsForUser(user.id)
  domUpdates.updateTotalSpent(user.retrieveTotalSpentOnTripsThisYear(destinations.data))
  domUpdates.displayUserGreeting(user);
  domUpdates.displayPendingTrips(user, destinations.data);
  domUpdates.displayUpcomingTrips(user, destinations.data);
  domUpdates.displayPastTrips(user, destinations.data);
  domUpdates.displayCurrentTrip(user, destinations.data);
}

const submitNewTripRequest = (event) => {
  event.preventDefault()
  // if (domUpdates.resolveTripRequest()) {
    const tripRequest = {
      id: Number(trips.data.length + 1),
      userID: Number(user.id),
      destinationID: Number(destinations.retrieveDestinationID(destinationInput.value)),
      travelers: Number(numberOfTravelersInput.value),
      date: dayjs(dateInput.value).format('YYYY/MM/DD'),
      duration: Number(durationInput.value),
      status: 'pending',
      suggestedActivities: [],
    }
    domUpdates.resolveTripRequest(trips.retrieveTripCost(destinations.data, tripRequest).toFixed(2));
    // domUpdates.displayPendingTrips(user, destinations.data);
    addData(tripRequest, 'trips')
      .then(data => updatePendingTrips(data), 'data')
      .catch(err => console.log(err, "error"))
  // }
}

const updatePendingTrips = (data) => {
  retrieveData(user.id)
}

const handleErrors = () => {

}

// const login = () => {
//   const findUserNameId = userNameInput.value.split('username');
//   const id = Number(findUserNameId[1]);
//   if (userNameInput.value && passwordInput.value) {
//     console.log('hi')
//     domUpdates.show('mainDashboard')
//     domUpdates.hide('loginPage');
//   }
// }

const uponLogIn = () => {
  const findUserNameId = userNameInput.value.split('traveler');
  const id = Number(findUserNameId[1]);
  if (id >= 1 && id <= 50 && userNameInput.value === `traveler${id}` && passwordInput.value === 'travel') {
    mainDashboard.classList.remove('hidden');
    loginPage.classList.add('hidden');
    return retrieveData(id);
  }
}

const login = () => {
  retrieveData(6);
}


window.addEventListener('load', login);
awayWeGoBtn.addEventListener('click', submitNewTripRequest);
loginButton.addEventListener('click', uponLogIn);
