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
        this.LbuttonS = this.add.image(550, 80, 'Larrow').setInteractive().setScale(3)
        // add pointer input
        this.LbuttonS.on('pointerdown', (pointer) => {
            console.log('left skin');
        })
        this.RbuttonS = this.add.image(650, 80, "Rarrow").setInteractive().setScale(3)
        // add pointer input
        this.RbuttonS.on('pointerdown', (pointer) => {
            console.log('right skin');
        })

        this.skinText = this.add.image(250, 70, "skin").setScale(.8)

        // clothes
        this.LbuttonCl = this.add.image(550, 170, 'Larrow').setInteractive().setScale(3)
        // add pointer input
        this.LbuttonCl.on('pointerdown', (pointer) => {
            console.log('left clothes');
        })
        this.RbuttonCl = this.add.image(650, 170, "Rarrow").setInteractive().setScale(3)
        this.RbuttonCl.on('pointerdown', (pointer) => {
            console.log('right clothes');
        })

        this.clothesText = this.add.image(250, 170, "clothes").setScale(.8)


        // hair
        this.LbuttonH = this.add.image(550, 275, 'Larrow').setInteractive().setScale(3)
        this.LbuttonH.on('pointerdown', (pointer) => {
            console.log('left hair');
        })
        this.RbuttonH = this.add.image(650, 275, "Rarrow").setInteractive().setScale(3)
        this.RbuttonH.on('pointerdown', (pointer) => {
            console.log('right hair');
        })

        this.hairText = this.add.image(250, 275, "hair").setScale(.8)


        // add text images for the ui buttons
        
        // add little guy image 
        this.heroLarge = this.add.image(875, 300, "heroCharacter").setScale(15)
        
        
        // play button
        this.playButton = this.add.image(875, 550, 'play').setInteractive()
        this.playButton.on('pointerdown', (pointer) => {
            this.scene.start("playScene")
        })

    }

    update(){
        // update the character image based on selection
        // save character selection
        // random button
        // then play button
    }

}