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

  retrieveTotalSpentOnTripsThisYear() {
    var today = dayjs().format('YYYY/MM/DD')
    console.log(today)
    const sup = dayjs().add(7, 'day').format('YYYY/MM/DD')
    console.log(sup)
  }

  retrieveCurrentTrips() {
    dayjs.extend(isBetween);
    var today = dayjs().format('YYYY/MM/DD')
    const between = this.trips.find((trip) => {
      const dates = (dayjs(today).isBetween(trip.date, dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')))
      console.log(dates)

      return trip
      // return dayjs(today).isBetween(today, dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')), [])
    })
    // const datesArray = this.trips.map((trip) => {
    //   return {startDate: trip.date, endDate: dayjs(trip.date).add(trip.duration, 'day').format('YYYY/MM/DD')}
    // })
    // const between = datesArray.filter((dates) => {
    //   dayjs.extend(isBetween);
    //   return dayjs().isBetween(dates.startDate, dayjs(dates.endDate), 'day', [])
    //     console.log('hi')
    //
    // })
  }

  retrievePastTrips() {

  }

  retrieveFutureTrips() {

  }

  retrievePendingTrips(currentDate) {

  }
}

// {
// "id": 1,
// "name": "Ham Leadbeater",
// "travelerType": "relaxer"
// },




module.exports = User;
