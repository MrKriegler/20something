# 20something
20something is a game with the same rules of 20 Questions. 20 Questions is a classic game that has been played since the 19th century.
To play 20something, the ninja (person holding the secret) thinks of a secret and the detective (person guessing)
can ask 20 yes/no questions to try see what the secret is. The detective can guess the secret at any point but beware it counts as a question.

## Notes

Thanks for sending me the test project. I really enjoyed building this game which took up most of my time over the weekend.

I really put a lot of effort into the test project as I would like to show you what I know in a usable manner.
Because of this I created 2 of my API calls in a RESTFUL manner and the others through the socket server.
I also decided to build a basic state machine for the game, its not really needed at the moment but as I work on the game
I think it will make adding rules between game states easier.

There are improvements to be made and I will definitely keep working on the project to make them in the future but I am happy with the
result

I decided to use Nodejs, REACT, Redux and Mongodb for my stack as its one I have worked with before besides REACT.
I am more of a VUEjs user but after reading that you use REACT-NATIVE (although not 100% the same) I decided to build the frontend
in REACT with REDUX. I made it easier to talk to the websockets by adding a redux middleware to handle socket events.

If I had more time I would ideally like to write some tests and will be doing so in the future to make it easier to contribute to.
I like to use mocha and chai when testing the api and cypress for the front end.

Thanks again and I look forward to your feedback

## Run Game

ENV files for the frontend are found in `/client/.env`.
ENV files for the backend can be set in the `docker-compose.yml`

Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)

```bash
cd 20something/
docker-compose
```

Open [http://localhost:1337](http://localhost:1337)

I am using the [wait-for-it.sh](https://github.com/vishnubob/wait-for-it/blob/master/wait-for-it.sh) for the api to wait for mongodb to accept connections before spinning up.

### Directory layout
    .
    ├───api                       #Node api
    │   ├───lib
    │   │   └───common
    │   │       └───src
    │   └───src
    │       ├───controllers
    │       ├───managers
    │       ├───states
    │       │   ├───closed
    │       │   ├───create
    │       │   ├───inprogress
    │       │   └───new
    │       ├───stores
    │       └───websockets
    └───client                     #React fronend
        ├───public
        └───src
            ├───actions
            ├───dashboard
            │   └───styles
            ├───game
            │   └───styles
            ├───messages
            │   └───styles
            └───reducers

The main business logic of the game in the API sits in the `GameManager`. The `GameManager` manages the state of the game while using the store for CRUD into mongo. The `GameManager` is used by both the `GameController` and `GameWebsockets`.

The Game states are as follows.

- create: This is as the game is created and sets the initial values for the game.
- new: This is set as the ninja joins the game and is waiting for the detective to join.
- inprogress: This is set as the detective joins the game and starts the game.
- closed: This is set when the detective either wins or loses.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
