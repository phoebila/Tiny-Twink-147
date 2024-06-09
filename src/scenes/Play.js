class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.loaded = false;
        let dung = new Dungeon(5, 5, 4, 0, 10);
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

                    collidableObjects.push(this.makeNewMap(dung.matrix[x][y].roomType, roomCoord[0], roomCoord[1], 'tiles'));
                }
            }
        }

        let heroSpawnCoord = [dung.startingRoom.x * roomWidth + (roomWidth/2), dung.startingRoom.y *roomHeight + (roomHeight/2)]
        this.hero = new Hero(this, heroSpawnCoord[0], heroSpawnCoord[1], 'hero', 0, 'down');

        for (let i = 0; i < collidableObjects.length; i++) {
            this.physics.add.collider(this.hero, collidableObjects[i]);
            collidableObjects[i].setCollisionBetween(0, 15);
        }

        for (let i = 0; i < this.wallCollisions.length; i++) {
            this.physics.add.collider(this.hero, this.wallCollisions[i]);
        }

        for (let x = 0; x < dung.width; x++) {
            for (let y = 0; y < dung.height; y++) {
                if (dung.matrix[x][y] !== null) {
                    let roomCoord = [x * roomWidth, (dung.height - 1 - y) * roomHeight];
                    this.add.image(roomCoord[0], roomCoord[1], 'dungeonWalls', 10).setOrigin(0);
                }
            }
        }

        this.keys = this.input.keyboard.createCursorKeys();
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.input.keyboard.on('keydown-D', function () {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true;
            this.physics.world.debugGraphic.clear();
        }, this);

        document.getElementById('info').innerHTML = '<strong>CharacterFSM.js:</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)';

        this.cameras.main.setBounds(0, 0, roomWidth * dung.width, roomHeight * dung.height);
        this.cameras.main.startFollow(this.hero, false, 0.5, 0.5);
        this.physics.world.setBounds(0, 0, roomWidth * dung.width, roomHeight * dung.height);
    }

    update() {
        this.heroFSM.step();
    }

    makeNewMap(key, x, y, tilesetName) {
        const map = this.make.tilemap({ key: key });
        let offsetX = x + wThick;
        let offsetY = y + wThick;
        const tileset = map.addTilesetImage('DungeonSprites1', 'tiles', 20, 20);
        const groundLayer = map.createLayer('Tile Layer 1', tileset, offsetX, offsetY);
        const collisionLayer = map.createLayer('Tile Layer 2', tileset, offsetX, offsetY);
        collisionLayer.setCollisionByProperty({ collides: true });
        return collisionLayer;
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
