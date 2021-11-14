// import Glide from '@glidejs/glide'

// user dashboard selectors
const totalSpentInPastYear = document.getElementById('totalSpentInPastYear');
const userGreeting = document.getElementById('userGreeting');
// const dateInput = document.getElementById('dateInput');
// const durationInput = document.getElementById('durationInput');
// const numberOfTravelersInput = document.getElementById('numberOfTravelersInput');
const destinationInput = document.getElementById('dropDownMenuDestinations');
const estimatedCostDisplay = document.getElementById('estimatedCostOfTrip');
const pendingTripsContainer = document.getElementById('pendingTrips');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pastTripsContainer = document.getElementById('pastTrips');
const currentTripContainer = document.getElementById('currentTrip');
// login page selectors

const domUpdates = {

  updateTotalSpent(totalSpent) {
    totalSpentInPastYear.innerText = `$${totalSpent}`
  },

  displayUserGreeting(user) {
    userGreeting.innerText = `Hi, ${user.returnFirstName()}`
  },

  addDestinationsToDropDown(destinationNames) {
    destinationNames.forEach((destination) => {
      destinationInput.innerHTML += `<option value="${destination}">${destination}</option>`
    })
  },

  displayPendingTrips(user, destinations) {
    if (user.retrievePendingTrips().length === 0) {
      pendingTripsContainer.innerHTML += `<h2 class="no-date-found">No Pending Trips</h2>`
    }
    user.retrievePendingTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pendingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayUpcomingTrips(user, destinations) {
    if (user.retrieveFutureTrips().length === 0) {
      upcomingTripsContainer.innerHTML += `<h2 class="no-date-found">No Upcoming Trips</h2>`
    }
    user.retrieveFutureTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          upcomingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayPastTrips(user, destinations) {
    if (user.retrievePastTrips().length === 0) {
      pastTripsContainer.innerHTML += `<h2 class="no-date-found">No Past Trips</h2>`
    }
    user.retrievePastTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pastTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2 class="trip-details name">${destination.destination}</h2>
              <h2 class="trip-details">${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayCurrentTrip(user, destinations) {
    if (user.retrieveCurrentTrips()) {
      this.show(currentTripContainer);
    user.retrieveCurrentTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          currentTripContainer.innerHTML += `
          <h1>I hope you are enjoying your current trip in ${destination.destination}</h1>
          <img class="trip-image" src="${destination.image}" alt="${destination.alt}"/>`
        }
      })
    })
  }
},

  show(element) {
    element.classList.remove('hidden')
  },

  hide(element) {
    element.classList.add('hidden')
  },

  resolveTripRequest(tripEstimate) {
  if (dateInput.value && durationInput.value && numberOfTravelersInput.value && destinationInput.value) {
    estimatedCostDisplay.innerText = `This trip is estimated to cost ${tripEstimate}`;
  }
  else {
    estimatedCostDisplay.innerText = 'Please fill out all fields, to book your next adventure!'
  }
},

// glider() {
//   new Glide(document.querySelector('.glide')) {
//
//   }
// }

}


export default domUpdates;
