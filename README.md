# Rick and Morty Charachters

This app shows all of the Rick and Morty charachters.

## Demo

You can see the demo here:
<!-- https://memory-game-ivory-theta.vercel.app/
 -->
## Installation

npm:

```bash
npm install
```

yarn:

```bash
yarn
```

## Deployment

To Start this project run

npm:

```bash
npm run start
```

yarn:

```bash
yarn start
```

To build the project run:

npm:

```bash
npm run build
```

yarn:

```bash
yarn build
```

## Testing

npm:

```bash
npm run test
```

yarn:

```bash
yarn test
```

## API Reference

For the api, I used (rickandmortyapi)[https://rickandmortyapi.com/]. 

#### Get all charachters


You can access the list of characters by using the ```/character``` endpoint.


```http
  GET https://rickandmortyapi.com/api/character
```

You should get the response like this.

‍‍‍

```bash
   {
    "info": {
      "count": 671,
      "pages": 34,
      "next": "https://rickandmortyapi.com/api/character/?page=2",
      "prev": null
    },
    "results": [
      {
        "id": 1,
        "name": "Rick Sanchez",
        "status": "Alive",
        "species": "Human",
        "type": "",
        "gender": "Male",
        "origin": {
          "name": "Earth",
          "url": "https://rickandmortyapi.com/api/location/1"
        },
        "location": {
          "name": "Earth",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "episode": [
          "https://rickandmortyapi.com/api/episode/1",
          "https://rickandmortyapi.com/api/episode/2",
          // ...
        ],
        "url": "https://rickandmortyapi.com/api/character/1",
        "created": "2017-11-04T18:48:46.250Z"
      },
      // ...
    ]
  }
```


### Get a single character


You can get a single character by adding the id as a parameter: ```/character/2```


You should get the response like this.

‍‍‍

```bash
   {
    "id": 2,
    "name": "Morty Smith",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    "url": "https://rickandmortyapi.com/api/character/2",
    "created": "2017-11-04T18:50:21.651Z"
  }
```
