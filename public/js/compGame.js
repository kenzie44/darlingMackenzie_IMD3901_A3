'use strict';

AFRAME.registerComponent('spawn', {
    schema: {  
        width: {type: 'float', default: 30.0},
        height: {type: 'float', default: 10.0},
        timeLimit: {type: 'int', default: 10},
      },
    multiple: false,
    init: function() {
        const AF_GAME = this;
        AF_GAME.score = 0;
        AF_GAME.scoreText = document.querySelector('#scoreText');
        AF_GAME.endText = document.querySelector('#startText');
        AF_GAME.spawnArea = document.querySelector('#spawnArea');

        createTimer(AF_GAME);
    },
});

function createTimer(AF_GAME) {
    var end = new Date().getSeconds() + AF_GAME.data.timeLimit;
    var timer = setInterval(function() {
        var now = new Date().getSeconds();
        var dist = end - now;

        console.log(dist);

        if (AF_GAME.spawnArea.getAttribute('visible') === true) {
            targetSpawn(AF_GAME);
        }

        if (dist <= 0) {
            clearInterval(timer);
            console.log('timer end');
            var targets = document.querySelectorAll('#target');
            targets.forEach(function(target) {
                target.parentNode.removeChild(target);
            });
            AF_GAME.endText.setAttribute('text', 'value', "Your final score was " + AF_GAME.score + "! Reload the page to play again!");
            AF_GAME.endText.setAttribute('visible', 'true');
        }
    }, 1000)
}

function targetSpawn(AF_GAME) {
    var target = document.createElement('a-entity');
    if (AF_GAME.spawnArea.getAttribute('visible') === true) {
        target.setAttribute('id', 'target');
        target.setAttribute('class', 'interactive');
        target.setAttribute('scale', '0.15 0.15 0.15');
        target.setAttribute('gltf-model', '#target_model')
        var Ymax = AF_GAME.data.height / 2;
        var Ymin = -Ymax;
        var Ypos = randNum(Ymin, Ymax);
        var Xmax = AF_GAME.data.width / 2;
        var Xmin = -Xmax;
        var Xpos = randNum(Xmin, Xmax);
        target.setAttribute('position', Xpos + ", " + Ypos + ", 1");

        AF_GAME.spawnArea.appendChild(target);

        target.addEventListener('click', function() {
            AF_GAME.score = AF_GAME.score + 10;
            AF_GAME.scoreText.setAttribute('text', 'value', AF_GAME.score);
            target.parentNode.removeChild(target);
        });
    }
}

function randNum(min, max) {
    return(Math.floor(Math.random() * (max - min)) + min);
}