class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
    this.trips = user.trips;
    this.destinations = user.destinations;
  }

  returnFirstName () {
    return this.name.split(' ')[0];
  }
}

// {
// "id": 1,
// "name": "Ham Leadbeater",
// "travelerType": "relaxer"
// },




module.exports = User;
