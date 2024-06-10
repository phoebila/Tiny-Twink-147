class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // load the visual goodz
        this.load.path = './assets/CharacterCreator/'

        


        this.load.spritesheet('hero', 'hero-sheet.png', {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.image('map', 'map-scroll.jpg')

        //load character assets
        // load shirts
        this.load.image('blueShirt', 'blueShirt.png')
        this.load.image('grayShirt', 'grayShirt.png')
        this.load.image('greenShirt', 'greenShirt.png')
        this.load.image('pinkShirt', 'pinkShirt.png')
        this.load.image('redShirt', 'redShirt.png')
        this.load.image('yellowShirt', 'yellowShirt.png')
        // load skin tones
        this.load.image('grayTwink', 'grayTwink.png')
        this.load.image('greenTwink', 'greenTwink.png')
        this.load.image('orangeTwink', 'orangeTwink.png')
        this.load.image('pinkTwink', 'pinkTwink.png')
        this.load.image('redTwink', 'redTwink.png')
        this.load.image('blueTwink', 'blueTwink.png')
        // load skin hair
        this.load.image('brownHair', 'brownHair.png')
        this.load.image('blondeHair', 'hairBlonde.png')
        this.load.image('redHair', 'hairRed.png')
        this.load.image('pinkHair', 'pinkHair.png')

        //load ui thingies
        this.load.image('Larrow', 'leftMenuArrow.png')
        this.load.image('Rarrow', 'rightMenuArrow.png')
        this.load.image('randoButton', 'randomizeButton.png')

        // loading ui text
        this.load.image('clothes', 'clothestext.png')
        this.load.image('hair', 'hairtext.png')
        this.load.image('skin', 'skinTonetext.png')

        // play button --> character
        this.load.image("play", "playButton.png")
        this.load.image("heroCharacter", "hero-large.png")

        // play button --> title
        this.load.image("start", "startButton.png")
        this.load.image("title", "TitleScreen.png")

        // Dungeon stuff
        this.load.path = './assets/dungeon/';

        // tileset
        this.load.image('tiles', 'tiles.png');
        this.load.image('tiles2', 'tiles2.png')
        //door
        this.load.image('eastdoor','eastdoor.png')
        this.load.image('westdoor','westdoor.png')
        this.load.image('northdoor','northdoor.png')
        this.load.image('southdoor','southdoor.png')
        // Objects
        this.load.spritesheet('objects', 'tiles.png',{
            frameWidth: 20,
            frameHeight: 20,
        })
        this.load.spritesheet('objects2', 'tiles2.png',{
            frameWidth: 20,
            frameHeight: 20,
        })

        // tile maps
        const tilemaps = [
            'Basic', 'Basic2', 'Basic3', 'Basic4', 'Basic5', 'Basic6', 'BasicNS' ,'BasicEW',
            'Starting', 'End', 
            'Maze', 'Maze2', 'Maze3', 'Maze4', 'Maze5', 'Maze6','Maze7', 'Maze8', 'MazeEW', 'MazeEW2', 'MazeNS', 'MazeNS2',
            'Wizard', 
            'Key', 'Key2', 'Key3', 'Key4', 'Key5', 'KeyEWStrict', 'KeyNS', 'KeyTest'
        ];

        tilemaps.forEach(name => {
            this.load.tilemapTiledJSON(name, `roomTemplates/${name}.json`);
        });

        //walls
        this.load.spritesheet ('dungeonWalls', 'walls.png', {
            frameWidth: 320,
            frameHeight: 220,
        })
    }

    create() {
        // hero animations (walking)
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        })

        // proceed once loading completes
        this.scene.start('titleScene')
    }
}