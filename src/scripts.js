import {getData, addData} from './api'
import './css/base.scss';
import './images/turing-logo.png'
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
}

// const randomUserId = (data) => {
//   return Math.floor(Math.random() * data[0].travelers.length);
// }

const onPageLoad = () => {
  return retrieveData(1);
}


window.addEventListener('load', onPageLoad);
