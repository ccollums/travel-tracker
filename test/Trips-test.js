const expect = require('chai').expect;
const Trips = require('../src/Trips.js');

describe('Trips', () => {

  let trips;

  beforeEach(function() {
    const tripsData = [{
        id: 1,
        userID: 44,
        destinationID: 2,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: []
      },
      {
        id: 2,
        userID: 44,
        destinationID: 1,
        travelers: 1,
        date: "2022/09/20",
        duration: 10,
        status: "approved",
        suggestedActivities: []
      },
      {
        id: 3,
        userID: 30,
        destinationID: 49,
        travelers: 1,
        date: "2021/07/16",
        duration: 3,
        status: "approved",
        suggestedActivities: []
      },
    ]

    trips = new Trips(tripsData)
  })

  it('should be a function', function() {
    expect(Trips).to.be.a('function')
  })

  it('should be an instance of Trips', function() {
    expect(trips).to.be.an.instanceOf(Trips)
  })

  it('should retrieve a users trips based off a user id', function() {
    expect(trips.retrieveTripsForUser(44)).to.deep.equal([{
        id: 1,
        userID: 44,
        destinationID: 2,
        travelers: 1,
        date: "2022/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: []
      },
      {
        id: 2,
        userID: 44,
        destinationID: 1,
        travelers: 1,
        date: "2022/09/20",
        duration: 10,
        status: "approved",
        suggestedActivities: []
      }
    ])
  })
});
