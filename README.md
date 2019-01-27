# 20something
20something is a game with the same rules of 20 Questions. 20 Questions is a classic game that has been played since the 19th century.
To play 20something, the ninja (person holding the secret) thinks of a secret and the detective (person guessing)
can ask 20 yes/no questions to try see what the secret is. The detective can guess the secret at any point but beware it counts as a question.

## Notes

Thanks for sending me the test project. I really enjoyed building this game which took up most of my time over the weekend.

I really put a lot of effort into the test project as I would like to show you what I know in a usable manner.
Its this reason I did 2 of my API calls in a RESTFUL manner and the rest through the socket server.
I also decided to build a basic state machine for the game, its not really needed at the moment but as I work on the game
it will make adding rules between states easier.

There are improvements to be made and I will definitely keep working on the project to make them in the future but I am happy with the
result

I decided to use Nodejs, REACT, Redux and Mongodb for my stack as its one I have worked with before besides REACT.
I am more of a VUEjs user but after reading that you use REACT-NATIVE (although not 100% the same) I decided to build the frontend
in REACT with REDUX to help me communicate easier with the socket server. I did this by adding redux middleware to handle socket events.

Thanks again

## Run Game

Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/)

```bash
docker-compose
```
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
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)