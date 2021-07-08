## Chat App

#### Installation
Clone this repo and run `yarn install` to pull down the required dependencies.

#### Running
Run the local server with `yarn start` and open http://localhost:3000

#### Design
I've used Node.js, Express, Socket.io, jQuery, Bootstrap, and Pug to build this app. I chose these based on my prior experiences building hobby projects with these technologies.

The main backend code is located at `bin/www` and the client-side JavaScript can be found at `public/javascripts/chat.js`. I've used Express to generate the directory structure and add some boilerplate code for running the server. The code in `app.js` is mostly comprised of this generated boilerplate, although I've removed some references to unused routes and dependencies.

The only design remark I have is regarding the namespacing of the client-side code in objects. I saw this pattern for the first time a couple years back, and I've applied it successfully in a few hobby projects. I think this makes the code much more organized and readable, and also gives us the benefit of saving references to DOM elements, rather than selecting them with the main jQuery function each time we need to interact with them.
