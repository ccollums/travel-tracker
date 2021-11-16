// user dashboard selectors
const totalSpentInPastYear = document.getElementById('totalSpentInPastYear');
const userGreeting = document.getElementById('userGreeting');
const destinationInput = document.getElementById('dropDownMenuDestinations');
const estimatedCostDisplay = document.getElementById('estimatedCostOfTrip');
const pendingTripsContainer = document.getElementById('userPendingTrips');
const upcomingTripsContainer = document.getElementById('userUpcomingTrips');
const pastTripsContainer = document.getElementById('userPastTrips');
const currentTripContainer = document.getElementById('currentTrip');
// login page selectors
const loginPage = document.getElementById('loginPage');
const mainDashboard = document.getElementById('mainDashboard');
const loginFeedback = document.getElementById('loginFeedback');
const userNameInput = document.getElementById('userNameInput');
const passwordInput = document.getElementById('passwordInput');


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
    pendingTripsContainer.innerHTML = '';
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
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayUpcomingTrips(user, destinations) {
    upcomingTripsContainer.innerHTML = '';
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
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayPastTrips(user, destinations) {
    pastTripsContainer.innerHTML = '';
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
              <h2 class="trip-details">${trip.duration} day stay</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayCurrentTrip(user, destinations) {
    currentTripContainer.innerHTML = '';
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
    console.log(element)
    console.log(element.classList.remove('hidden'))
    element.classList.remove('hidden')
  },

  hide(element) {
    element.classList.add('hidden')
  },

  resolveTripRequestCompletedInputs(tripEstimate) {
    if (dateInput.value && durationInput.value && numberOfTravelersInput.value && destinationInput.value) {
      estimatedCostDisplay.innerText = `This trip is estimated to cost $${tripEstimate} (10% agent fee included)`;
      dateInput.value = '';
      durationInput.value = '';
      numberOfTravelersInput.value = '';
      destinationInput.value = '';
    }
  },

  tripRequestFeedback() {
    estimatedCostDisplay.innerText = 'Please fill out all fields to book your next adventure!'
    dateInput.value = '';
    durationInput.value = '';
    numberOfTravelersInput.value = '';
    destinationInput.value = '';
  },

  loginFeedback() {
    loginFeedback.innerText = `Username or password are incorrect`;
    userNameInput.value = '';
    passwordInput.value = '';
  },

}

export default domUpdates;
