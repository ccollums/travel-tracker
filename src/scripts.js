import {getData, addData} from './api';
import './css/base.scss';
import './images/travel-icon.svg';
import User from './User';
import Trips from './Trips';
import Destinations from './Destinations';
import domUpdates from './domUpdates';
const dayjs = require('dayjs');

let user;
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
const mainDashboard = document.getElementById('mainDashboard');
const loginButton = document.getElementById('loginButton');

const retrieveData = (id) => {
  const allPromise = Promise.all([getData('trips'), getData('destinations'), getData(`travelers/${id}`)])
    .then(data => {createInitialDashboard(data)})
}

const createInitialDashboard = (data) => {
  trips = new Trips(data[0].trips);
  destinations = new Destinations(data[1].destinations);
  user = new User(data[2]);
  domUpdates.addDestinationsToDropDown(destinations.retrieveDestinationNames());
  addIndividualUserInfo();
}

const addIndividualUserInfo = () => {
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
  if (dateInput.value && durationInput.value && numberOfTravelersInput.value && destinationInput.value) {
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
    domUpdates.resolveTripRequestCompletedInputs(trips.retrieveTripCost(destinations.data, tripRequest).toFixed(2));
    addData(tripRequest, 'trips')
      .then(data => updatePendingTrips(data), 'data')
      .catch(err => domUpdates.handleErrors(err))
  } else {
    domUpdates.tripRequestFeedback();
  }
}

const updatePendingTrips = (data) => {
  retrieveData(user.id)
}

const uponLogIn = () => {
  const findUserNameId = userNameInput.value.split('traveler');
  const id = Number(findUserNameId[1]);
  if (id >= 1 && id <= 50 && userNameInput.value === `traveler${id}` && passwordInput.value === 'travel') {
    mainDashboard.classList.remove('hidden');
    loginPage.classList.add('hidden');
    return retrieveData(id);
  } else {
    domUpdates.loginFeedback();
  }
}

awayWeGoBtn.addEventListener('click', submitNewTripRequest);
loginButton.addEventListener('click', uponLogIn);
