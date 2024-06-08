class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        
        // add background image
        this.map = this.add.image(0, 0, 'map').setOrigin(0)

        this.loaded = false
        // Create the dungeon matrix 
        // Dung is short for dungeon!
        // spawn 10 rooms in a 5x5 space, starting a [4,0]
        // 
        let dung = new Dungeon(5,5,4, 0, 10)
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

        let walls = [ // north, south, east, west walls 
            // stores the index of the sprite sheet that stores the needed wall type
            [6,2], // door , no door
            [9,5],
            [7,4],
            [8,3]


            // Not sure if we are changing image file format, so i saved a copy of accessing sprites this way
            // ['northWall','northWallDoor'], // door , no door
            // ['southWall','southWallDoor'],
            // ['eastWall','northWallDoor'],
            // ['westWall','westWallDoor']
        ]


        for (let x = 0; x < dung.width; x++){
            for (let y = 0; y < dung.height; y++){
                if (  dung.matrix[x][y] !== null){
                    console.log(dung.matrix[x][y])
                    // The top left of this room is at:
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight]


                    //Place details in room
                    //Start with walls
                    let [north,south,east,west] = [0,1,2,3]
                    for ( let direction = 0; direction < 4; direction++){
                        // Looking at each direction, if it is connect to a room above it, place a wall with a door
                        // otherwise, place a wall with no door
                        if ( dung.matrix[x][y].neighbors[direction]){
                            // Add a wall to this room
                            this.add.image(roomCoord[0],roomCoord[1], 'dungeonWalls', walls[direction][0]) // Adds a wall with a door facing in direction at roomCoord
                        } else {// if there is no neighbor in this direciotn
                            this.add.image(roomCoord[0],roomCoord[1], 'dungeonWalls', walls[direction][1]) // Adds a wall with no door facing in direction at roomCoord
                        }
                    }


                }
            }
        }





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