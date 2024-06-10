class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {


        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('objects2', { start: 3, end: 4 }), // Assuming 'objects2' is correct
            frameRate: 2, // 2 frames per second
            repeat: -1 // Loop the animation
        });

        this.anims.create({
            key: 'dance',
            frames: this.anims.generateFrameNumbers('objects2', { start: 0, end: 1 }), // Assuming 'objects2' is correct
            frameRate: 3, // 2 frames per second
            repeat: -1 // Loop the animation
        });
        this.SCROLLDURATION = 1000
        this.SCROLLSTYLE = 'Quad'

        // character testing 
        // console.log(characterSelect); //works, index 0 includes shirt, hair and skin tone
        // Retrieve the composite character texture key from the registry
        const compositeCharacterKey = this.registry.get('compositeCharacterKey');
        this.objects =[]
        this.hasKey = false;
        let dung = new Dungeon(7, 7, 4, 0, 20); // width, height, starting x (0 index), starting y (0 index), max rooms
        dung.printMatrix();
        let collidableObjects = [];
        this.wallCollisions = [];

        let walls = [
            [6, 2], // north (door, no door)
            [9, 5], // south
            [7, 4], // east
            [8, 3]  // west
        ];

        for (let x = 0; x < dung.width; x++) {
            for (let y = 0; y < dung.height; y++) {
                if (dung.matrix[x][y] !== null) {
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight];
                    for (let direction = 0; direction < 4; direction++) {
                        if (dung.matrix[x][y].neighbors[direction]) {
                            this.add.image(roomCoord[0], roomCoord[1], 'dungeonWalls', walls[direction][0]).setOrigin(0);
                            this.setUpWall(roomCoord[0], roomCoord[1], direction, 1);
                        } else {
                            this.add.image(roomCoord[0], roomCoord[1], 'dungeonWalls', walls[direction][1]).setOrigin(0);
                            this.setUpWall(roomCoord[0], roomCoord[1], direction, 0);
                        }
                    }
                    let collisionLayers = this.makeNewMap(dung.matrix[x][y].roomType, roomCoord[0] + 1, roomCoord[1])
                    for (let i = 0; i < collisionLayers.length; i++){
                        collidableObjects.push(collisionLayers[i]);
                    }

                    // If this is the boss room, add a door to the room that connects to it!!
                    
                }
            }
        }

        let heroSpawnCoord = [
            dung.startingRoom.x * roomWidth + (roomWidth / 2),
            (dung.height - 1 - dung.startingRoom.y) * roomHeight + (roomHeight / 2)
        ];
        // HERO ADDED HERE - NOW WE NEED TO ADD ALL OF ITS PHYSICS INTERACTIONS!! ---------------------------------------------------------------
        this.hero = new Hero(this, heroSpawnCoord[0], heroSpawnCoord[1], compositeCharacterKey);
        //Add collisoin with key
        for ( let i = 0; i < this.objects.length; i++){
             if ( this.objects[i].type == 'key'){
                console.log("key collision added")
                this.physics.add.overlap(this.hero, this.objects[i].sprite,this.handleOverlapKey, null, this);
             }
             if ( this.objects[i].type == 'sigil'){
                
                console.log("sigil collision added")
                this.physics.add.overlap(this.hero, this.objects[i].sprite,this.handleOverlapSigil, null, this);
             }

        }

        this.door.setImmovable(true)
        this.door.setVisible(true)
        this.physics.add.collider(this.hero, this.door, this.handleDoorCollision, null, this);

        // selected traits from user into dung
        //this.add.image(heroSpawnCoord[0], heroSpawnCoord[1], compositeCharacterKey).setScale(5)
        
        for (let i = 0; i < collidableObjects.length; i++) {
            this.physics.add.collider(this.hero, collidableObjects[i]);
            collidableObjects[i].setCollisionBetween(0, 16);
        }

        for (let i = 0; i < this.wallCollisions.length; i++) {
            this.physics.add.collider(this.hero, this.wallCollisions[i]);
        }

        for (let x = 0; x < dung.width; x++) {
            for (let y = 0; y < dung.height; y++) {
                if (dung.matrix[x][y] !== null) {
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight];
                    this.add.image(roomCoord[0], roomCoord[1], 'dungeonWalls', 10).setOrigin(0);
                    
                    if (dung.matrix[x][y].roomType == 'End'){
                        console.log(x,y)
                        if ( dung.matrix[x][y].neighbors[0]){ // Add a south  door to north room
                            this.door = this.physics.add.sprite(roomCoord[0] + ( Math.floor(roomWidth/2)) ,roomCoord[1] - wThick,'southdoor')
                            console.log("north")
                        } else if (dung.matrix[x][y].neighbors[1]){
                            this.door = this.physics.add.sprite(roomCoord[0] + ( Math.floor(roomWidth/2)) ,roomCoord[1] +roomHeight + wThick -11,'northdoor')
                            console.log("south")
                        }else if (dung.matrix[x][y].neighbors[2]){ // add west door to east room
                            this.door = this.physics.add.sprite(roomCoord[0] + roomWidth +wThick ,roomCoord[1] +roomHeight/2  ,'westdoor')
                            console.log("east")
                       }else if (dung.matrix[x][y].neighbors[3]){
                            this.door = this.physics.add.sprite( roomCoord[0] - wThick ,roomCoord[1] +roomHeight/2  ,'eastdoor')
                            console.log("west")
                        }
                    }
                }
            }
        }

        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // this.input.keyboard.on('keydown-D', function () {
        //     this.physics.world.drawDebug = this.physics.world.drawDebug ? true : false;
        //     this.physics.world.debugGraphic.clear();
        // }, this);

        //document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)';

        this.cam = this.cameras.main
        //this.cam.setBounds(dung.startingRoom.x * roomWidth, (dung.height - 1 - dung.startingRoom.y) * roomHeight , dung.width * roomWidth, dung.height * roomHeight)
        this.cam.setScroll(dung.startingRoom.x * roomWidth, (dung.height - 1 - dung.startingRoom.y) * roomHeight)
        this.cam.setSize(320,220)
        this.cam.scaleManager.setGameSize(320,220)
        this.cam.scaleManager.setZoom(3.2)
        this.physics.world.setBounds(0, 0, roomWidth * dung.width, roomHeight * dung.height);
    }

    update() {
        this.checkCamBounds(this.hero, this.cam)

        this.heroFSM.step();
    }

    handleOverlapSigil(hero,item){
        console.log("touched sigil")
        this.scene.start("titleScene")
    }

    handleOverlapKey(hero, item){
        this.hasKey = true
        item.disableBody(true, true)
        console.log("keyGot")
    }

    handleDoorCollision(hero, door) {
        // Handle what happens when the hero collides with the door
        console.log("Hero collided with the door");
        
        // Example: Check if the hero has a key and open the door
        if (this.hasKey) {
            door.disableBody(true, true);
            console.log("Door opened!");
        } else {
            console.log("Door is locked. Find the key first.");
        }
    }

    //Camera bounds handling attribute to Nathan Altice from this repo
    //https://github.com/nathanaltice/CP-Scrolling-States
    checkCamBounds(obj, cam) {
        const tweenProperties = {
          targets: obj,
          duration: this.SCROLLDURATION,
          ease: this.SCROLLSTYLE,
          onComplete: function () {
            obj.scrollLock = false  // unlock player
          },
        }

        const panProperties = [this.SCROLLDURATION, this.SCROLLSTYLE]

        if(obj.x > cam.width + cam.scrollX) {
            // PLAYER HITS RIGHT EDGE (SCROLL R->L)
            // lock player
            obj.scrollLock = true
            // tween player
            this.tweens.add({
                x: { from: obj.x, to: obj.x + obj.width/2 },
                ...tweenProperties, // shared properties are spread
            })
            // pan camera
            cam.pan(
                cam.scrollX + cam.centerX + cam.width, 
                cam.scrollY + cam.centerY, 
                ...panProperties    // shared properties are spread
            )
        } else if(obj.x - obj.width/2 < cam.scrollX) {
            // PLAYER HITS LEFT EDGE (SCROLL L->R)
            obj.scrollLock = true
            this.tweens.add({
                x: { from: obj.x, to: obj.x - obj.width/2 },
                ...tweenProperties, 
            })
            cam.pan(
                cam.scrollX - cam.centerX, 
                cam.scrollY + cam.centerY, 
                ...panProperties 
            )
        } else if(obj.y > cam.scrollY + cam.height) {
            // PLAYER HITS BOTTOM EDGE (SCROLL BOTTOM -> TOP)
            obj.scrollLock = true
            this.tweens.add({
                y: { from: obj.y, to: obj.y + obj.height/2 },
                ...tweenProperties, 
            })
            cam.pan(
                cam.scrollX + cam.centerX, 
                cam.scrollY + cam.centerY + cam.height, 
                ...panProperties 
            )
        } else if(obj.y - obj.height/2  < cam.scrollY) {
            // PLAYER HITS TOP EDGE (SCROLL TOP->BOTTOM)
            obj.scrollLock = true
            this.tweens.add({
                y: { from: obj.y, to: obj.y - obj.height},
                ...tweenProperties, 
            })
            cam.pan(
              cam.scrollX + cam.centerX, 
              cam.scrollY - cam.centerY, 
              ...panProperties 
            )
        }
    }

    makeNewMap(key, x, y) {
        const map = this.make.tilemap({ key: key });
        let offsetX = x + wThick;
        let offsetY = y + wThick;
    
        // Add both tilesets
        const tileset1 = map.addTilesetImage('DungeonSprites1', 'tiles', 20, 20);
        const tileset2 = map.addTilesetImage('DungeonSprites2', 'tiles2', 20, 20);
    
        let collisionLayers = [];
    
        // Handle tile layers
        map.layers.forEach(layer => {
            
    
            const tileLayer = map.createLayer(layer.name, [tileset1,tileset2], offsetX, offsetY);
            if (layer.name === 'collision' || layer.name === 'pit') {
                tileLayer.setCollisionByProperty({ collides: true });
                collisionLayers.push(tileLayer);
            }
        });
        // Fire and Wizard animations

        

        // Handle object layers
        map.objects.forEach(objectLayer => {
            if (objectLayer.name === 'key') {
                objectLayer.objects.forEach(obj => {
                    
                    let key = this.physics.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects').setOrigin(0,1)
                    key.setFrame(5)
                    console.log("keyadded")
                    this.objects.push(new interactableObject('key',  key))
                });
            }
            if (objectLayer.name === 'push') {
                objectLayer.objects.forEach(obj => {
                    // let push = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects').setOrigin(0,1)
                    // push.setFrame(1)
                });
            }
            if (objectLayer.name === 'fire')
                objectLayer.objects.forEach(obj => {
                    let fire = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects2').setOrigin(0,1)
                    fire.setFrame(4)
                    fire.play("fire")
            })
            if (objectLayer.name === 'wizard')
                objectLayer.objects.forEach(obj => {
                    let wizard = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects2').setOrigin(0,1)
                    wizard.setFrame(0)
                    wizard.play('dance')
            })
            if (objectLayer.name === 'frog')
                objectLayer.objects.forEach(obj => {
                    let frog = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects').setOrigin(0,1)
                    frog.setFrame(3)
            })
            if (objectLayer.name === 'sigil')
                objectLayer.objects.forEach(obj => {
                    let sigil = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects2').setOrigin(0,1)

                    console.log("sigiladded")
                    this.objects.push(new interactableObject('sigil',  sigil))
                    sigil.setFrame(5)
            })
            if (objectLayer.name === 'orb')
                objectLayer.objects.forEach(obj => {
                    let orb = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects').setOrigin(0,1)
                    orb.setFrame(6)
            })
            if (objectLayer.name === 'button')
                objectLayer.objects.forEach(obj => {
                    let button = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects').setOrigin(0,1)
                    button.setFrame(13)
            })
            if (objectLayer.name === 'chest')
                objectLayer.objects.forEach(obj => {
                    let chest = this.add.sprite(offsetX + obj.x, offsetY+obj.y, 'objects2').setOrigin(0,1)
                    chest.setFrame(2)
            })
        });
    
        return collisionLayers;
    }
    
    

    setUpWall(x, y, direction, door) {
        const offsets = {
            noDoor: [
                [0, 0, roomWidth, wThick], // North
                [0, roomHeight - wThick, roomWidth, wThick], // South
                [roomWidth - wThick, 0, wThick, roomHeight], // East
                [0, 0, wThick, roomHeight] // West
            ],
            door: [
                [
                    [0, 0, (roomWidth / 2) - Math.floor(nsDoorWidth / 2), wThick],
                    [(roomWidth / 2) + Math.floor(nsDoorWidth / 2), 0, (roomWidth / 2) - Math.floor(nsDoorWidth / 2), wThick]
                ],
                [
                    [0, roomHeight - wThick, (roomWidth / 2) - Math.floor(nsDoorWidth / 2), wThick],
                    [(roomWidth / 2) + Math.floor(nsDoorWidth / 2), roomHeight - wThick, (roomWidth / 2) - Math.floor(nsDoorWidth / 2), wThick]
                ],
                [
                    [roomWidth - wThick, 0, wThick, (roomHeight / 2) - Math.floor(ewDoorWidth / 2)],
                    [roomWidth - wThick, (roomHeight / 2) + Math.floor(ewDoorWidth / 2), wThick, (roomHeight / 2) - Math.floor(ewDoorWidth / 2)]
                ],
                [
                    [0, 0, wThick, (roomHeight / 2) - Math.floor(ewDoorWidth / 2)],
                    [0, (roomHeight / 2) + Math.floor(ewDoorWidth / 2), wThick, (roomHeight / 2) - Math.floor(ewDoorWidth / 2)]
                ]
            ]
        };

        const createWall = (specs) => {
            this.makeWallCollision(x + specs[0], y + specs[1], specs[2], specs[3]);
        };

        if (door == 0) {
            const specs = offsets.noDoor[direction];
            createWall(specs);
        } else {
            const [specs1, specs2] = offsets.door[direction];
            createWall(specs1);
            createWall(specs2);
        }
    }

    makeWallCollision(x, y, width, height) {
        let invisibleObject = this.physics.add.sprite(x + width / 2, y + height / 2, null).setSize(width, height).setVisible(false);
        invisibleObject.body.setImmovable(true);
        this.wallCollisions.push(invisibleObject);
    }
}
