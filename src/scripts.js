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
  console.log(trips)
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
  console.log(destinationInput.value, 'input')
  event.preventDefault()
  domUpdates.resolveTripRequest()
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
    console.log(tripRequest, 'request')
    addData(tripRequest, 'trips')
      .then(data => console.log(data, 'data'))
      .catch(err => console.log(err, "error"))
}

const onPageLoad = () => {
  return retrieveData(Math.floor(Math.random() * 50));
}


window.addEventListener('load', onPageLoad);
awayWeGoBtn.addEventListener('click', submitNewTripRequest);
