const expect = require('chai').expect;
const Trips = require('../src/Trips.js');

describe('Trips', () => {

  let trips;
  let destinationsData;

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
    }]

    destinationsData = [{
      id: 2,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'imageURL1',
      alt: 'alt text 1'
    },
    {
      id: 1,
      destination: 'Cancun, Mexico',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'imageURL2',
      alt: 'alt text 2'
    },
    {
      id: 49,
      destination: 'London, England',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'imageURL3',
      alt: "alt text 3"
    }]

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
    }])
  })

  it('should return estimated cost of trip', function() {
    expect(trips.retrieveTripCost(destinationsData, trips.data[0])).to.equal(1056);
  })
});
