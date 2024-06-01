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
        this.LbuttonS = this.add.image(250, 50, 'Larrow').setInteractive().setScale(1.5)
        // add pointer input
        this.LbuttonS.on('pointerdown', (pointer) => {
            console.log('left skin');
        })
        this.RbuttonS = this.add.image(350, 50, "Rarrow").setInteractive().setScale(1.5)
        // add pointer input
        this.RbuttonS.on('pointerdown', (pointer) => {
            console.log('right skin');
        })

        this.skinText = this.add.image(170, 50, "skin").setScale(.2)

        // clothes
        this.LbuttonCl = this.add.image(250, 100, 'Larrow').setInteractive().setScale(1.5)
        // add pointer input
        this.LbuttonCl.on('pointerdown', (pointer) => {
            console.log('left clothes');
        })
        this.RbuttonCl = this.add.image(350, 100, "Rarrow").setInteractive().setScale(1.5)
        this.RbuttonCl.on('pointerdown', (pointer) => {
            console.log('right clothes');
        })

        this.clothesText = this.add.image(180, 100, "clothes").setScale(.2)


        // hair
        this.LbuttonH = this.add.image(250, 150, 'Larrow').setInteractive().setScale(1.5)
        this.LbuttonH.on('pointerdown', (pointer) => {
            console.log('left hair');
        })
        this.RbuttonH = this.add.image(350, 150, "Rarrow").setInteractive().setScale(1.5)
        this.RbuttonH.on('pointerdown', (pointer) => {
            console.log('right hair');
        })

        this.hairText = this.add.image(200, 150, "hair").setScale(.2)


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