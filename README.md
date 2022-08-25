# sd-challenges

Solutions for SD Challenges

**Requirements:**

- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Code Editor - VSCode](https://code.visualstudio.com/)
- [Live Sass Compiler : VSCode Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- [Code Injector - google chrome extension](https://chrome.google.com/webstore/detail/code-injector/edkcmfocepnifkbnbkmlcmegedeikdeb?hl=en)
- [Google chrome browser](https://www.google.com/intl/en_uk/chrome/)

## How to run your code

### Download files and run local server

1. Clone repository on to your local machine
2. Use the terminal to navigate into the cloned folder (sd-challenges)
3. run the following command `node server.js` within the CLI / Terminal
4. After executing the command this `Server running at 7000` should appear on the next line (this indicates that the local server is running)

### Insert localstorage path into code injector

1. Open the Chrome browser extension (Code Injector)
2. Add a new rule with the following values
   - Insert `https://www.onefinestay.com/search/*` into the URL Pattern input section
   - Within the files section add two local paths
     - `http://localhost:7000/challenge-1.js`
     - `http://localhost:7000/challenge-1.css`
3. Click save the rules

4. Add a new rule with the following values
   - Insert `https://www.onefinestay.com/*` into the URL Pattern input section
   - Within the files section add two local paths
     - `http://localhost:7000/challenge-2.js`
     - `http://localhost:7000/challenge-2.css`
5. Click save the rules

### Testing challenges 1 & 2
<sub>You can pause the rules incase you want to test individually, click on code injector extension icon > click on facedown chevron > click "Enabled"<sub>

- Navigate to `https://www.onefinestay.com/` on your browser to begin testing.
  - For mobile testing make sure to open the chrome dev tool and select a mobile device from the device toolbar (chromes device simulator)
- Testing Challenge 1 - Select mobile device from the device simulator and navigate to a search page and the changes will appear.
- Testing challenge 2 - Switch back to normal viewport (without device simulator) and search/navigate to a location search page and return to the homepage to see the location blocks appear.

## Explanation of the structure of your Project

All the files are within the root directory (sd-challenges), the scripts / stylesheets are within their own suborder's and the server script is in the root directory.
I decided to keep the server script at the root because facilitates testing (no need to run `node server.js` twice when testing each challenge).
When building activities / tests I normally begin with the logic aspect which in this case is the javascript and I found it simpler to batch the file types in their own directory.

**Directory Structure**

```bash
    sd-challengers
    |-- README.md
    |-- servers.js
    |-- js
    |   |__ challenge-1.js
    |   |__ challenge-2.js
    |
    |-- css
    |   |__ challenge-1.css
    |   |__ challenge-1.scss
    |   |__ challenge-1.map
    |   |__ challenge-2.css
    |   |__ challenge-2.scss
    |   |__ challenge-2.map
```

## Explanation Challenge 1

- First step was to understand how the page works and I noticed that the entire page is dynamically loaded through javascript on a single page (Single Page Application).
- It is important to have an eventlistener ( observerDOM ) which fires when the page changes, that way if anything changes I can check if my amendments remain.
- Created a javascript module called ( challenge1 ) which contains all the main functions / Classes such as getCards(), implementDiscount(), applyDisc() and more.
- Inside challenge1 module I first created a class which would allow me to keep my code clean and not pollute the global scope with functions and variables.
- Inside the class I created methods what would collect the correct data from the stored element e.g get price, number of rooms, calculating new price ect, These are methods each object will be able to execute for their stored element variable.
- I then created an implementation function inside the challenge1 module which would carry about checks before making the necessary amendments to each card.
- Before firing the functions / methods I added an eventlistener which waits until the document is at readystate which allows it to be interactive and allows my code to run as soon as possible so there aren't any delays with the rendering.
- The observerDOM function triggers every time there are changes to the page, my code does checks and if my amendments are missing it then re-implements the amendments as long as the conditions meet the criteria set e.g mobileCheck(), page url contains `www.onefinestay.com/search/` and number of amended cards are less than the total number of cards on the page.

## Explanation Challenge 2

- For this challenge I followed similar start to challenge1 because the page works in a similar way but this time I monitored the url changes, as this is the key part for this challenge.
- I created two javascript modules for this, the first is for collecting search pages and the second is for implementing the locations on the homepage.
- The storeSearch module collects the url if its matches the criteria and stores it within a variable and converts it into a JSON and stores it within the localStorage for use later on the home page.
- The buildLoc module is used to pull the stored locations within the localStorage and converts it back into an array and loops through the values and creates the most recent location blocks on the homepage.
