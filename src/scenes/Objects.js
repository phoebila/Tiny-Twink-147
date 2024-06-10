create(); {
    // Define the animation
    this.anims.create({
        key: 'blink',
        frames: this.anims.generateFrameNumbers('tiles2', { start: 0, end: 1 }),
        frameRate: 2, // 2 frames per second
        repeat: -1 // Loop the animation
    });

    // Create the object and play the animation
    const hero = this.physics.add.sprite(100, 100, 'hero');
    hero.play('blink');
}