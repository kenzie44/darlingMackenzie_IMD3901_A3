'use strict';

AFRAME.registerComponent('start', {
    schema: {    },
    multiple: false,
    init: function() {
        const AF_START = this;
        AF_START.target = document.querySelector('#startTarget');
        AF_START.text = document.querySelector('#startText');
        AF_START.spawnArea = document.querySelector('#spawnArea');
    },
});