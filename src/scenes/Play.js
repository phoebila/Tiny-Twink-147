class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.loaded = false
        // Create the dungeon matrix 
        // Dung is short for dungeon!
        let dung = new Dungeon(15,15,8, 0, 20)
        dung.printMatrix()


        // Place the matrix into the world

        // Loop through each room of the dungeon
        // Place the room at the respective coordinates 

        // These are some of the important sizes for placing the rooms
        // all of them are measured in pixels
        let tileSize = 20
        let roomHeight = 220
        let roomWidth = 320
        // These measure the thickness of the walls
        let wThick = 40



        for (let x = 0; x < dung.width; x++){
            for (let y = 0; y < dung.height; y++){
                if ( ! dung.matrix[x][y] === null){
                    //
                }
            }
        }




        // add background image
        this.map = this.add.image(0, 0, 'map').setOrigin(0)

        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)'
    
        //cams 
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.hero, false, 0.5, .5)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)
    }

    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
    }
}