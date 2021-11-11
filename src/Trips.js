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

  // retrieveTripDestinationsForUser(id) {
  //   const destinations = new Destinations()
  //   const tripDestinationIds = this.retrieveTripsForUser(id).map((trip) => {
  //     return trip.destinationID;
  //   })
  //   console.log(destinations)
  //   console.log(tripDestinationIds)
  //   // const tripDestinationNames = destinations.filter(())
  // }
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


module.exports = Trips;
