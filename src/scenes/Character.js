class Character extends Phaser.Scene {
    constructor(){
        super("characterScene")
    }

    // create
    create(){
        this.map = this.add.image(0, 0, 'map').setOrigin(0)


        // add arrows 
        // add buttons
    // this.scene.start("playScene")
    }

    update(){
        // update the character image based on selection
        // random button
        // then play button
    }

}