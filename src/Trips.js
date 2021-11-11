const Destinations = require('../src/Trips.js');

class Trips {
  constructor(tripsData) {
    this.data = tripsData;
  }

  retrieveTripsForUser(id) {
    return this.data.filter((user) => {
      return user.userID === id;
    });
  }

  retrieveTripCost(destinations, trip) {
    return destinations.reduce((sum, destination) => {
      if (trip.destinationID === destination.id) {
        sum += (((trip.duration * destination.estimatedLodgingCostPerDay) +
          destination.estimatedFlightCostPerPerson) * trip.travelers) * 1.1
      }
      return sum;
    }, 0)
  }

}

module.exports = Trips;
