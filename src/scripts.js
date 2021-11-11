import {getData, addData} from './api'
import './css/base.scss';
import './images/beach.jpg'
import './images/travel-icon.svg'
import Travelers from './Travelers';
import User from './User';
import Trips from './Trips';
import Destinations from './Destinations';

let user;
let travelers;
let trips;
let destinations;

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
  user.trips = trips.retrieveTripsForUser(user.id)
  user.destinations = destinations.retrieveDestinationNames()
  console.log(user.trips)
  console.log(user.destinations)
}

const onPageLoad = () => {
  return retrieveData(Math.floor(Math.random() * 50));
}


window.addEventListener('load', onPageLoad);
