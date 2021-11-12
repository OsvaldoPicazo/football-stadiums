# Football Stadiums App

Map to locate football stadiums around the world.

## Setup

- Fork this repo
- Clone this repo

- Install dependencies and run the application:
```shell
$ cd football-stadiums
$ npm install
$ npm run dev:all
```

Alternatively, you can also run the frontend and backend individually.

- For frontend:
```shell
$ cd client
$ npm run serve
```

- For Backend:
```shell
$ cd football-stadiums
$ json-server --watch db.json --port 5000
```

- The frontend App should open in port 3000. You can also check it here:

    http://localhost:3000

- The backend is a FAKE API that runs locally in port 5000. You can check it here:

    http://localhost:5000/stadiums

## Features

- Create, Read update and delete stadium locations
- Frontend developed with Vue.js 3
- Backend runs with json-server, a fake REST API that runs locally
- Clicking on the map adds a new marker/entry to backend
- Double click on the stadium box to show its name and image
- Edit and delete buttons in each stadium element

## Backlog

- Functional Popup that displays information about the marker
- Use TypeScript
- Authentication
- Functionality to upload images in the browser
- Writing tests
