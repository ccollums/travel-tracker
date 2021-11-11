const dayjs = require('dayjs')
var isBetween = require('dayjs/plugin/isBetween')

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

  retrieveTotalSpentOnTripsThisYear(destinations) {
    return this.trips.reduce((total, trip) => {
      destinations.forEach((destination) => {
        if (trip.destinationID === destination.id && dayjs().isAfter(dayjs(trip.date)) &&
        dayjs(trip.date).isAfter(dayjs().subtract(1, 'year')) && trip.status === 'approved') {
          total += (((trip.duration * destination.estimatedLodgingCostPerDay) +
          destination.estimatedFlightCostPerPerson) * trip.travelers) * 1.1
        }
      })
      return total
    }, 0)
  }

  retrieveCurrentTrips() {
    return this.trips.find((trip) => {
      const tripEndDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      return (dayjs().isBefore(dayjs(tripEndDate)) && dayjs().isAfter(dayjs(trip.date)) && trip.status === 'approved')
    })
  }

  retrievePastTrips() {
    return this.trips.filter((trip) => {
      const tripEndDate = dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')
      return (dayjs().isAfter(dayjs(tripEndDate)) && trip.status === 'approved')
    })
  }

  retrieveFutureTrips() {
    return this.trips.filter((trip) => {
      return (dayjs().isBefore(dayjs(trip.date)) && trip.status === 'approved')
    })
  }

  retrievePendingTrips() {
    return this.trips.filter((trip) => {
      return trip.status === 'pending'
    })
  }
}

module.exports = User;
