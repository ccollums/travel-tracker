class Trips {
  constructor(tripsData) {
    this.data = tripsData;
  }

  retrieveTripsForUser(id) {
    return this.data.filter((user) => {
      return user.userID === id;
    });
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


module.exports = Trips;
