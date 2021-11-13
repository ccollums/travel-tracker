// user dashboard selectors
const totalSpentInPastYear = document.getElementById('totalSpentInPastYear');
const userGreeting = document.getElementById('userGreeting');
const awayWeGoBtn = document.getElementById('submitButton');
const dateInput = document.getElementById('dateInput');
const durationInput = document.getElementById('durationInput');
const numberOfTravelersInput = document.getElementById('numberOfTravelersInput');
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

  displayPendingTrips(user, destinations) {
    console.log(user.retrievePendingTrips(), 'pending trips')
    user.retrievePendingTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pendingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2>${destination.destination}</h2>
              <h2>${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayUpcomingTrips(user, destinations) {
    console.log(user.retrieveFutureTrips(), 'future trips')
    user.retrieveFutureTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          upcomingTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2>${destination.destination}</h2>
              <h2>${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayPastTrips(user, destinations) {
    console.log(user.retrievePastTrips(), 'past trips')
    user.retrievePastTrips().forEach((trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          pastTripsContainer.innerHTML += `
          <section class='trip'>
            <section class="trip-info">
              <h2>${destination.destination}</h2>
              <h2>${trip.date}</h2>
            </section>
            <img class="trip-image" src="${destination.image}" alt=""${destination.alt}"/>
          </section>`
        }
      })
    })
  },

  displayCurrentTrip(user, destinations) {
    console.log(user.retrieveCurrentTrips(), 'current trip')
    if (user.retrieveCurrentTrips()) {
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

}


export default domUpdates;
