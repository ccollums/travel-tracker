import {getData, addData} from './api';
import './css/base.scss';
import './images/beach.jpg';
import './images/travel-icon.svg';
import Travelers from './Travelers';
import User from './User';
import Trips from './Trips';
import Destinations from './Destinations';
import domUpdates from './domUpdates';

let user;
let travelers;
let trips;
let destinations;

const awayWeGoBtn = document.getElementById('submitButton');

const retrieveData = (id) => {
  const allPromise = Promise.all([getData('travelers'), getData('trips'), getData('destinations'), getData(`travelers/${id}`)])
    .then(data => {createInitialDashboard(data)})
}

const createInitialDashboard = (data) => {
  console.log(data)
  travelers = new Travelers(data[0].travelers);
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations);
  user = new User(data[3])
  console.log(destinations.data, 'dest')
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
  console.log(user.trips)
}

const submitNewTripRequest = (event) => {
  event.preventDefault()
  if (domUpdates.resolveSleepForm()) {
    const tripRequest = {
      id: trips.length + 1,
      userID: user.id,
      destinationID: destination.id,
      date: Number(dateInput.value),
      duration: Number(durationInput.value),
      status: 'pending',
      suggestedActivities: [],
    }
    addData(userSleepData, 'sleep')
      .then(data => updateUserData('sleepData', data))
      .catch(err => console.log(err, "error"))
  }
}

// {
// "id": 1,
// "userID": 44,
// "destinationID": 49,
// "travelers": 1,
// "date": "2022/09/16",
// "duration": 8,
// "status": "approved",
// "suggestedActivities": []
// },

const onPageLoad = () => {
  return retrieveData(Math.floor(Math.random() * 50));
}


window.addEventListener('load', onPageLoad);
// awayWeGoBtn.addEventListener('click', submitNewTripRequest);
