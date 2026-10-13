# Tennis Tap
> Keep it bouncing. Keep the points coming!

## authorship
- [Sam Higgins](https://github.com/Samhiggins024), October 8th, 2026, Version 1.0

## user story 
- **As a super awesome gamer** ...be creative, the more specific the better 
- **I want to play a fun game that will challenge me with harder levels and a way to see my results** ...
- **so that I can have a fun game to play when I want to chill out,relax and have fun.** ...

## narrative
Get ready to test your timing with Tennis Tap! Move your paddle from side to side to keep falling tennis balls from hitting the ground. Every ball you keep in play earns you a point. Be careful, because if a ball hits the ground, the game is over! Play the Concept version to try the basic game or switch to Full Game mode for the complete experience. How high can you get your score?


## about the app
This is a simple game that requires little thinking but quick reaction. Tennis balls fall from the sky and you have you stop them from hitting the ground. For every ball you hit you earn a point. If the ball hits the ground you lose. The goal is to get as many points as you can!
The app includes two versions: Concept, which demonstrates the basic game idea, and Full Game, which provides the completed gameplay experience.

### wireframe & game ideas

- [wiki/wireframe]https://github.com/Samhiggins024/dev-charlie/wiki/Wireframe
- [issue/game idea]https://github.com/Samhiggins024/dev-charlie/issues/1 


### project directory structure
```
dev-charlie-main
|   index.html
│   README.md
|
├───assets
│   ├───scripts
│   │       game-script.js
│   │       small-script.js
│   │       
│   └───styles
│           smallstyle.css
│           styles.css
│           
└───pages
        fullgame.html
```
### tech stack

- HTML
- JavaScript
- CSS
- Google Fonts


### code snippet

```js
function startGame() {
    score = 0;
    balls = [];
    spawnTimer = 0;
    playing = true;

    paddle = {
        x: 350,
        y: 455,
        width: 100,
        height: 15,
        speed: 7
    };
```




### future ideas. 
> check out Sprint 99 for future app ideaa

- [milestone/sprint 99]([https://github.com/barrycumbie/bookish-doodle-charlie-game/milestone/1](https://github.com/Samhiggins024/dev-charlie/milestone/1))


