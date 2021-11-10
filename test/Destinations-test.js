const expect = require('chai').expect;
const Destinations = require('../src/Destinations.js');

describe('Destinations', () => {

  let destination;

  beforeEach(function() {
    const destinationsData = [{
        id: 1,
        destination: 'Lima, Peru',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: 'imageURL1',
        alt: 'alt text 1'
      },
      {
        id: 2,
        destination: 'Cancun, Mexico',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: 'imageURL2',
        alt: 'alt text 2'
      },
      {
        id: 3,
        destination: 'London, England',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: 'imageURL3',
        alt: "alt text 3"
      }
    ]

    destination = new Destinations(destinationsData)
  })

  it('should be a function', function() {
    expect(Destinations).to.be.a('function')
  })

  it('should be an instance of Destinations', function() {
    expect(destination).to.be.an.instanceOf(Destinations)
  })

  it('should retrieve a destination based off destination id', function() {
    expect(destination.retrieveDestination(1)).to.deep.equal({
      id: 1,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'imageURL1',
      alt: 'alt text 1'
    })
  })

  it('should return undefined if the ID does not exist', function() {
    expect(destination.retrieveDestination(100)).to.equal(undefined)
  })

});
