class Title extends Phaser.Scene {
    constructor(){
        super("titleScene")
    }

    // create

    create(){

        // title text
        this.title = this.add.image(0, 0, "title").setOrigin(0)

        // start button
        this.startButton = this.add.image(640, 340, "start").setInteractive()
        // add pointer input
        this.startButton.on('pointerdown', (pointer) => {
            this.scene.start("characterScene")
        })
        // this.scene.start("playScene")
    }
}