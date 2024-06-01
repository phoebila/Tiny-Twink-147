class Character extends Phaser.Scene {
    constructor(){
        super("characterScene")
    }

    // create
    create(){
        this.map = this.add.image(0, 0, 'map').setOrigin(0)

        // add arrows 
        // add buttons

        // skin buttons
        this.LbuttonS = this.add.image(250, 50, 'Larrow').setInteractive().setScale(.8)
        // add pointer input
        this.LbuttonS.on('pointerdown', (pointer) => {
            console.log('left skin');
        })
        this.RbuttonS = this.add.image(350, 50, "Rarrow").setInteractive().setScale(.8)
        // add pointer input
        this.RbuttonS.on('pointerdown', (pointer) => {
            console.log('right skin');
        })

        // clothes
        this.LbuttonCl = this.add.image(250, 90, 'Larrow').setInteractive().setScale(.8)
        // add pointer input
        this.LbuttonCl.on('pointerdown', (pointer) => {
            console.log('left clothes');
        })
        this.RbuttonCl = this.add.image(350, 90, "Rarrow").setInteractive().setScale(.8)
        this.RbuttonCl.on('pointerdown', (pointer) => {
            console.log('right clothes');
        })

        // hair
        this.LbuttonH = this.add.image(250, 130, 'Larrow').setInteractive().setScale(.8)
        this.LbuttonH.on('pointerdown', (pointer) => {
            console.log('left hair');
        })
        this.RbuttonH = this.add.image(350, 130, "Rarrow").setInteractive().setScale(.8)
        this.RbuttonH.on('pointerdown', (pointer) => {
            console.log('right hair');
        })

        // add text images for the ui buttons
        
        // add little guy image 
        


    // this.scene.start("playScene")
    }

    update(){
        // update the character image based on selection
        // save character selection
        // random button
        // then play button
    }

}