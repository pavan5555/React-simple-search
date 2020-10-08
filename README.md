Sai Venkata Pavan Kumar, Vinnakota

project: acme Search

project structure:

acme-search/public : public assests
acme-search/public/data-sources: json files
acme-search/src/application: acme search application
acme-search/src/application/components: react components
acme-search/src/application/components/tests: basic tests
acme-search/src/application/css: css files
acme-search/src/application/resources: other resources


How to Run:

* Navigate to "acme-search" directory.
* Open the terminal/cmd and hit "npm install"
* Once the dependencies are installed, hit "npm run start" for development mode or "npm run build" for production mode
* Navigate to http://localhost:3000 in development mode or http://localhost:5000 in production mode
* For running tests hit "npm run test"

Additional Features:

* Dynamically updating as new data becomes avialable, you can modify the json files in the build/data-sources folder and hit the search button which will rerender with the updated search results.

* In Dropbox the File icons are displayed according to the file type.

* Maintaining the design in different views (example: mobile, tablet) using react bootstrap. 


Approach to the project:

* Implemented the project using React library, which makes it easy to implement UI component and update the dom when necessary.
* Used React-bootstrap as the css framework which helps us in creating complex UI design easily and glitch free.
* Used card components which displays different categories(contacts, calendar events, etc) in a single view instead of tabs to reduce the need of clicking multiple tabs to view their respective data.

Thoughts on Search result ranking:
* For contacts data, use Last contact to sort the results(i.e recent contacts will be displayed at the top)
* For calendar data, use Event date, time to sort the results(i.e upcoming events will be shown on top)
* For Dropox data, use uploaded date/ created date to sort the results(i.e recent created/modified will be shown on top)
* For slack data and tweets use time to sort the results(i.e recent message or tweets will be shown on top)  

Future Ideas:
* user interaction with search results.
* Implement search using NLP processing (example: search for acme in tweets, show acme tweets, would display tweets of acme)
