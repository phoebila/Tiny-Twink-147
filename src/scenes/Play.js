class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.loaded = false
        // Create the dungeon matrix 
        // Dung is short for dungeon!
        // spawn 10 rooms in a 5x5 space, starting a [4,0]
        // 
        let dung = new Dungeon(5,5,4, 0, 10)
        dung.printMatrix()
        let collidableObjects = []

        // Place the matrix into the world

        // Loop through each room of the dungeon
        // Place the room at the respective coordinates 

        

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
                    // The top left of this room is at:
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight]


                    //Place details in room
                    //Start with walls
                    for ( let direction = 0; direction < 4; direction++){
                        // Looking at each direction, if it is connect to a room above it, place a wall with a door
                        // otherwise, place a wall with no door
                        if ( dung.matrix[x][y].neighbors[direction]){
                            // Add a wall to this room
                            this.add.image(roomCoord[0],roomCoord[1], 'dungeonWalls', walls[direction][0]).setOrigin(0) // Adds a wall with a door facing in direction at roomCoord
                        } else {// if there is no neighbor in this direciotn
                            this.add.image(roomCoord[0],roomCoord[1], 'dungeonWalls', walls[direction][1]).setOrigin(0) // Adds a wall with no door facing in direction at roomCoord
                        }
                    }
                    // After adding the walls, add the floor and objects, using tile map
                    collidableObjects.push (this.makeNewMap(dung.matrix[x][y].roomNum, roomCoord[0],roomCoord[1], 'tiles' ))  

                }
            }
        }

        





        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')


        for (let i = 0; i <collidableObjects.length; i++){
            this.physics.add.collider(this.hero, collidableObjects[i])
            // Spent like 2 hours fighting Chatgpt to get this!!!
            // https://www.youtube.com/watch?v=96kUkPgAiJA&ab_channel=WClarkson 
            // Turns out I just needed Lord W Clarkson!!!1!!! MY HEROOO 😍
            collidableObjects[i].setCollisionBetween(0,15)
            console.log(collidableObjects[i])
        }


        // Add collision with the walls!
        // Add layer that the player can go under

        for (let x = 0; x < dung.width; x++){
            for (let y = 0; y < dung.height; y++){
                if (  dung.matrix[x][y] !== null){
                    // The top left of this room is at:
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight]
                    this.add.image(roomCoord[0],roomCoord[1], 'dungeonWalls', 10).setOrigin(0) // Adds a wall with a door facing in direction at roomCoord
                }
            }
        }





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
        this.cameras.main.setBounds(0, 0, roomWidth * dung.width, roomHeight * dung.height)
        this.cameras.main.startFollow(this.hero, false, 0.5, .5)
        this.physics.world.setBounds(0, 0, roomWidth * dung.width, roomHeight * dung.height)
    }

    update() {
        // make sure we step (ie update) the hero's state machine
        this.heroFSM.step()
    }


    makeNewMap(key, x, y, tilesetName) {
        // Make new map with key 'key' at coordinates (x, y) using 'tilesetName' tileset
        // Start by taking the room type and determing what json file that requires

        
        const map = this.make.tilemap({ key: key })
        // IM CHEATING TO TEST SOMETHING REMOVE THIS LINE^^^^^ DONT FORGET TO REMOVE IT WHEN ALL OF THE ROOMS END UP LOOKING LIKE A BASIC ROOM
        // The line should be this instead: 
        //  const map = this.make.tilemap({ key: key })
        let offsetX = x + wThick
        let offsetY = y+ wThick
        const tileset = map.addTilesetImage('DungeonSprites1', 'tiles', 20, 20);
        const groundLayer = map.createLayer('Tile Layer 1', tileset, offsetX , offsetY);
        const collisionLayer = map.createLayer('Tile Layer 2', tileset, offsetX, offsetY);
        collisionLayer.setCollisionByProperty({ collides: true });
        return collisionLayer
    }
    
}

