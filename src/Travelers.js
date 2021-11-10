class Travelers {
  constructor(travelersData) {
    this.data = travelersData;
  }

  retrieveUser(id) {
      return this.data.find((user) => {
        return user.id === id;
      });
    }
  }



module.exports = Travelers;
