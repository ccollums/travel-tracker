class Destinations {
  constructor(destinationData) {
    this.data = destinationData;
  }

  retrieveDestination(id) {
      return this.data.find((destination) => {
        return destination.id === id;
      });
    }

  retrieveDestinationNames() {
    const result = this.data.map((location) => {
      return location.destination
    }).sort((a, b) => {
      return a.localeCompare(b)
    })
    return result;
  }

  retrieveDestinationID(destinationName) {
    const result = this.data.find((destination) => {
      return destination.destination === destinationName
    })
    return result.id;
  }

}

module.exports = Destinations;
