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
          status: "pending",
          suggestedActivities: []
        },
        {
          id: 4,
          userID: 1,
          destinationID: 25,
          travelers: 1,
          date: "2020/07/16",
          duration: 4,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 5,
          userID: 1,
          destinationID: 12,
          travelers: 3,
          date: "2021/11/10",
          duration: 6,
          status: "approved",
          suggestedActivities: []
        },
        {
          id: 6,
          userID: 1,
          destinationID: 45,
          travelers: 1,
          date: "2021/11/11",
          duration: 6,
          status: "pending",
          suggestedActivities: []
        },
        {
          id: 7,
          userID: 1,
          destinationID: 50,
          travelers: 2,
          date: "2021/11/11",
          duration: 6,
          status: "pending",
          suggestedActivities: []
        },
        {
          id: 8,
          userID: 1,
          destinationID: 34,
          travelers: 2,
          date: "2021/04/10",
          duration: 7,
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
        },
        {
          id: 12,
          destination: 'St. Petersburg, Russia',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 1100,
          image: 'imageURL4',
          alt: 'alt text 4'
          },
          {
          id: 25,
          destination: 'Marrakesh, Morocco',
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 830,
          image: 'imageURL5',
          alt: 'alt text 5'
          },
          {
          id: 45,
          destination: 'Laramie, Wyoming',
          estimatedLodgingCostPerDay: 80,
          estimatedFlightCostPerPerson: 700,
          image: 'imageURL6',
          alt: 'alt text 6'
          },
          {
          id: 50,
          destination: 'Denver, Colorado',
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 1000,
          image: 'imageURL6',
          alt: 'alt text 6'
          },
          {
          id: 34,
          destination: 'Aspen, Colorado',
          estimatedLodgingCostPerDay: 24,
          estimatedFlightCostPerPerson: 105,
          image: 'imageURL7',
          alt: 'alt text 7'
          },
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

  it('should retrieve total amount spent on trips this year', function() {
    expect(user.retrieveTotalSpentOnTripsThisYear(user.destinations)).to.equal(6210.60);
  });

  it('should retrieve the current trip the user is on', function() {
    expect(user.retrieveCurrentTrips()).to.deep.equal({
      id: 5,
      userID: 1,
      destinationID: 12,
      travelers: 3,
      date: "2021/11/10",
      duration: 6,
      status: "approved",
      suggestedActivities: []
    });
  });

  it('should only retrieve approved trips when searching for current trip', function() {
    expect(user.retrieveCurrentTrips()).to.deep.equal({
      id: 5,
      userID: 1,
      destinationID: 12,
      travelers: 3,
      date: "2021/11/10",
      duration: 6,
      status: "approved",
      suggestedActivities: []
    });
  });

  it('should retrieve the users past trips', function() {
    expect(user.retrievePastTrips()).to.deep.equal([
    {
      id: 4,
      userID: 1,
      destinationID: 25,
      travelers: 1,
      date: "2020/07/16",
      duration: 4,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 8,
      userID: 1,
      destinationID: 34,
      travelers: 2,
      date: "2021/04/10",
      duration: 7,
      status: "approved",
      suggestedActivities: []
    }]);
  });
  it('should only retrieve approved trips when searching for past trips', function() {
    expect(user.retrievePastTrips()).to.deep.equal([
    {
      id: 4,
      userID: 1,
      destinationID: 25,
      travelers: 1,
      date: "2020/07/16",
      duration: 4,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 8,
      userID: 1,
      destinationID: 34,
      travelers: 2,
      date: "2021/04/10",
      duration: 7,
      status: "approved",
      suggestedActivities: []
    }]);
  });

  it('should retrieve the users future trips', function() {
    expect(user.retrieveFutureTrips()).to.deep.equal([{
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
      }]);
  });

  it('should only retrieve approved trips when searching for future trips', function() {
    expect(user.retrieveFutureTrips()).to.deep.equal([{
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
      }]);
  });

  it('should retrieve the users pending trips', function() {
    expect(user.retrievePendingTrips()).to.deep.equal([{
      id: 3,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: "2021/07/16",
      duration: 3,
      status: "pending",
      suggestedActivities: []
    },
    {
      id: 6,
      userID: 1,
      destinationID: 45,
      travelers: 1,
      date: "2021/11/11",
      duration: 6,
      status: "pending",
      suggestedActivities: []
    },
    {
      id: 7,
      userID: 1,
      destinationID: 50,
      travelers: 2,
      date: "2021/11/11",
      duration: 6,
      status: "pending",
      suggestedActivities: []
    }]);
  });


});
