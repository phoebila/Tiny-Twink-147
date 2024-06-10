class Character extends Phaser.Scene {
    constructor(){
        super("characterScene")
    }

    // create
    create(){
        this.map = this.add.image(0, 0, 'dungeonWalls').setScale(15)

        // Arrays of character options
        this.skinOptions = ['grayTwink', 'greenTwink', 'orangeTwink', 'pinkTwink', 'redTwink', 'blueTwink']
        this.hairOptions = ['brownHair', 'blondeHair', 'redHair', 'pinkHair']
        this.shirtOptions = ['blueShirt', 'grayShirt', 'greenShirt', 'pinkShirt', 'redShirt', 'yellowShirt']

        // Indices for the arrays
        this.skinIndex = 0
        this.hairIndex = 0
        this.shirtIndex = 0

        // SKIN -------------------------------------------------------------------------------------

        this.skinText = this.add.image(250, 70, "skin").setScale(.8)

        // CLOTHES -------------------------------------------------------------------------------------

        this.clothesText = this.add.image(250, 170, "clothes").setScale(.8)

        // HAIR -------------------------------------------------------------------------------------
        // hair

        this.hairText = this.add.image(250, 275, "hair").setScale(.8)

        // add text images for the ui buttons
        
        // add little guy image 
        this.heroLarge = this.add.image(875, 300, "heroCharacter").setScale(15)
        
        
        // play button
        this.playButton = this.add.image(875, 610, 'play').setInteractive()
        this.playButton.on('pointerdown', (pointer) => {


            // save character selection before going to play scene
            // pass character selection into dungeon
            // this.saveCharacterConfiguration()

            let compositeCharacter = this.createCompositeCharacter(this.skinOptions[this.skinIndex], this.hairOptions[this.hairIndex], this.shirtOptions[this.shirtIndex]);

            // Store the composite character texture key in the registry
            this.registry.set('compositeCharacterKey', compositeCharacter.texture.key);
            this.scene.start("playScene")
        })

        // Skin buttons
        this.LbuttonS = this.add.image(550, 80, 'Larrow').setInteractive().setScale(3);
        this.LbuttonS.on('pointerdown', () => this.changePart('skin', -1));
        this.RbuttonS = this.add.image(650, 80, "Rarrow").setInteractive().setScale(3);
        this.RbuttonS.on('pointerdown', () => this.changePart('skin', 1));

        // Clothes buttons
        this.LbuttonCl = this.add.image(550, 170, 'Larrow').setInteractive().setScale(3);
        this.LbuttonCl.on('pointerdown', () => this.changePart('shirt', -1));
        this.RbuttonCl = this.add.image(650, 170, "Rarrow").setInteractive().setScale(3);
        this.RbuttonCl.on('pointerdown', () => this.changePart('shirt', 1));

        // Hair buttons
        this.LbuttonH = this.add.image(550, 275, 'Larrow').setInteractive().setScale(3);
        this.LbuttonH.on('pointerdown', () => this.changePart('hair', -1));
        this.RbuttonH = this.add.image(650, 275, "Rarrow").setInteractive().setScale(3);
        this.RbuttonH.on('pointerdown', () => this.changePart('hair', 1));

        // Randomize button
        this.randoButton = this.add.image(875, 525, 'randoButton').setInteractive().setScale(.8)
        this.randoButton.on('pointerdown', (pointer) => {
            this.randomizeCharacter()
        })


        
    }

    // Function to change part
    changePart(part, direction) {
        if (part === 'skin') {
            this.skinIndex = Phaser.Math.Wrap(this.skinIndex + direction, 0, this.skinOptions.length);
            // this.add.image(890, 315, this.skinOptions[this.skinIndex]).setScale(17);
            this.updateCharacterPart('skin', this.skinOptions[this.skinIndex])
        } else if (part === 'shirt') {
            this.shirtIndex = Phaser.Math.Wrap(this.shirtIndex + direction, 0, this.shirtOptions.length);
            // this.add.image(890, 355, this.shirtOptions[this.shirtIndex]).setScale(15);
            this.updateCharacterPart('shirt', this.shirtOptions[this.shirtIndex])

        } else if (part === 'hair') {
            this.hairIndex = Phaser.Math.Wrap(this.hairIndex + direction, 0, this.hairOptions.length);
            this.updateCharacterPart('hair', this.hairOptions[this.hairIndex])
        }
    }
    
    // Function to update character parts without container
    updateCharacterPart(part, texture) {
        if (part === 'skin') {
            // Destroy the current skin image if it exists
            if (this.skin) {
                this.skin.destroy();
            }
            // Add the new skin image
            this.skin = this.add.image(890, 315, texture).setScale(17);
        } else if (part === 'shirt') {
            // Destroy the current clothes image if it exists
            if (this.shirt) {
                this.shirt.destroy();
            }
            // Add the new clothes image
            this.shirt = this.add.image(890, 355, texture).setScale(15);
        } else if (part === 'hair') {
            // Destroy the current hair image if it exists
            if (this.hair) {
                this.hair.destroy();
            }
            // Add the new hair image
            this.hair = this.add.image(875, 225, texture).setScale(15);
        }
    }

    // Function to randomize character parts
    randomizeCharacter() {
        this.skinIndex = Phaser.Math.Between(0, this.skinOptions.length - 1);
        this.shirtIndex = Phaser.Math.Between(0, this.shirtOptions.length - 1);
        this.hairIndex = Phaser.Math.Between(0, this.hairOptions.length - 1);
    
        this.updateCharacterPart('skin', this.skinOptions[this.skinIndex]);
        this.updateCharacterPart('shirt', this.shirtOptions[this.shirtIndex]);
        this.updateCharacterPart('hair', this.hairOptions[this.hairIndex]);
    }

    // Use registry to save character choices
    /*saveCharacterConfiguration() {
        characterSelect.push({
            skin: this.skinOptions[this.skinIndex],
            hair: this.hairOptions[this.hairIndex],
            shirt: this.shirtOptions[this.shirtIndex]
        })
    }*/


    // attempt at making it one image
    createCompositeCharacter(skin, hair, shirt) {
        // Load the base image
        // const baseImage = this.add.image(0, 0, 'heroCharacter').setScale(15);

        // // Get the dimensions of the base image
        // const width = baseImage.width;
        // const height = baseImage.height;
        const width = 25; // Assuming width of the base character image
        const height = 64; // Assuming height of the base character image
        const renderTexture = this.make.renderTexture({ width, height }, false);

        // Draw images on the RenderTexture
        renderTexture.draw('heroCharacter', 0, 10).setScale(17);
        renderTexture.draw(skin, 9, 19).setScale(17);
        renderTexture.draw(shirt, 13, 26).setScale(17);
        renderTexture.draw(hair, 9, 13).setScale(15);

        //this.add.sprite(0,0,renderTexture).setScale(10)

        const textureKey = 'compositeCharacter';
        renderTexture.saveTexture(textureKey);
        
        // Return the RenderTexture
        return renderTexture;
    }

    
}