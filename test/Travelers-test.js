const expect = require('chai').expect;
const Travelers = require('../src/Travelers.js');

describe('Travelers', () => {

  let traveler;
  let travelersInfo;

  beforeEach(function() {
    const travelersInfo = [{
        id: 1,
        name: 'Carly Collums',
        travelerType: 'relaxer'
      },
      {
        id: 2,
        name: 'Trenton Nalepa',
        travelerType: 'thrill-seeker'
      },
      {
        id: 3,
        name: 'Michele Comfort',
        travelerType: 'shopper'
      },
      {
        id: 4,
        name: 'Grey Sloan',
        travelerType: 'photographer'
      },
      {
        id: 5,
        name: 'Nora Jones',
        travelerType: 'history-buff'
      },
      {
        id: 6,
        name: 'Sierra Bartsch',
        travelerType: 'relaxer'
      }
    ]

    traveler = new Travelers(travelersInfo);
  })

  it('should be a function', function() {
    expect(Travelers).to.be.a('function');
  })

  it('should be an instance of Travelers', function() {
    expect(traveler).to.be.an.instanceOf(Travelers);
  })

  it('should retrieve user data', function() {
    expect(traveler.retrieveUser(1)).to.deep.equal({
        id: 1,
        name: 'Carly Collums',
        travelerType: 'relaxer'
      })
  })

  it('should return undefined if no user matches id', function() {
    expect(traveler.retrieveUser(10)).to.equal(undefined)
  })

});
