const expect = require('chai').expect;
const User = require('../src/User.js');

describe('User', () => {

  let user;

  beforeEach(function() {
    user = new User({
      id: 1,
      name: 'Carly Collums',
      travelerType: 'relaxer',
      trips: [{
          id: 1,
          userID: 1,
          destinationID: 2,
          travelers: 1,
          date: "2022/09/16",
          duration: 8,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 2,
          userID: 1,
          destinationID: 1,
          travelers: 1,
          date: "2022/09/20",
          duration: 10,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 3,
          userID: 1,
          destinationID: 49,
          travelers: 1,
          date: "2021/07/16",
          duration: 3,
          status: "approved",
          suggestedActivities: []
        },
      ],
      destinations: [{
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
        }
      ]
    })
  })

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should store the id of user', function() {
    expect(user.id).to.equal(1);
  });

  it('should store name of user', function() {
    expect(user.name).to.equal('Carly Collums');
  });

  it('should store the type of traveler the user is', function() {
    expect(user.travelerType).to.equal('relaxer');
  });

  it('should return first name of user', function() {
    expect(user.returnFirstName()).to.equal('Carly');
  });
});
