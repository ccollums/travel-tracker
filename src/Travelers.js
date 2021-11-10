class Travelers {
  constructor(travelersData) {
    this.data = travelersData;
  }

  retrieveUser(id) {
      return this.data.find((user) => {
        return user.id === id;
      });
    }

    retrieveRandomUser() {
      return Math.floor(Math.random() * this.data.length);
    }
  }



module.exports = Travelers;
