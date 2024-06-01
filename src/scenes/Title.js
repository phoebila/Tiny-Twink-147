class Title extends Phaser.Scene {
    constructor(){
        super("titleScene")
    }

    // create

    create(){

        // this.scene.start("characterScene"
        this.scene.start("playScene")
    }
}