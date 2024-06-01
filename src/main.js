// Code Practice: Scrolling States
// Name:
// Date: 

'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 1280,
    height: 720,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Title, Character, Play ]
}

const game = new Phaser.Game(config)