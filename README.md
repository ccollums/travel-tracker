# Travel Tracker - Voyager 

### Mod2 2108 Final Solo Project 

## Table of Contents
- [Abstract](#Abstract)
- [Contributors](#Contributors)
- [Technologies](#Technologies)
- [Artists](#Artists)
- [Installation](#Installation and Setup)
- [Illustrations](#Illustrations)
- [Wins](#Wins)
- [Challenges](#Challenges)
- [Future Additions](#Additions)
- [Specs](#Specs)


## Abstract
Travel Tracker is an application that allows users to track their travels (past, present, and future). It also gives the user the ability to request a new trip for a travel agent to either approve or deny. A user will arrive on a login page, upon logging in they will be taken to their travel dashboard. This dashboard will show them how much money they have spent in the past year, their past approved trips, upcoming approved trips, and pending trips (trips that have not yet been approved by an agent). If the user is on a trip during the time of login, the current trip will be shown on the dashboard as well. 

Let the adventures begin!

## Contributors
- [Carly Collums](https://github.com/ccollums)

## Technologies
-  HTML
-  CSS
-  SCSS/SASS
-  JavaScript
-  Mocha/Chai
-  Webpack
-  Node.js
-  Day.js
-  fetch API (GET & POST)
-  ESLint

## Artists 
- Travel by Vectplus from the Noun Project (Globe Travel Icon)

### Installation and Setup:
**To navigate the website live, a server download is required.**
  1. Download the necessary server and API [here](https://github.com/turingschool-examples/travel-tracker-api)
  2. Clone this repo down to your local machine 
  3. Cd into the `server` directory (travel-tracker-api)
  4. In the command line, run `npm install`
  5. In the command line, run `npm start`
**Then clone down this repository**
  1. In your command line, `cd` into your local directory and clone down this repository -<br>
      `git clone https://github.com/ccollums/travel-tracker`
  2. Cd into the repo 
  3. Install the necessary package dependencies - <br>
      `npm install`
  4. Run the command `npm start`
  5. With both the server running and this package running, then visit `http://localhost:8080/` in your browser.
**Upon arriving to application 
  1. In order to login to the application pick a user id between 1 and 50. (there are 50 users in the API)
  2. The username is `traveler(theUserId)` and the password is `travel`
  3. For example: `traveler34` and `travel`

## Illustrations

![fitlitgif_small](https://user-images.githubusercontent.com/70819338/140833863-b19bfef8-f4b0-4d96-84af-796f630c5a7a.gif)   

![fitlit_input_gif](https://user-images.githubusercontent.com/70819338/140833938-28c56a28-7e96-43b6-94d4-b38fe90a5787.gif)

## Wins
- Having an appealing UI/UX 
- Using Day.js to find future/current/past trips to display to user. 
- Implementing SCSS

## Challenges
- Learning Day.js 
- Error handling for POST requests 

## Additions
### Future Iterations
- Add the ability for an administrator (agent) to log in. 
- The agent should have the ability to approve and deny trip reuqests.
- Have a count down to the users next trip. 

## Project Spec
Project specs can be found here
-  [Travel Tracker](https://frontend.turing.edu/projects/travel-tracker.html)





## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
