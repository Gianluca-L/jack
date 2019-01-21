/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/HttNSjFF
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/advanced_wars_tank.png');
    game.load.image('platform', 'sprites/advanced_wars_land.png');
    game.load.image('carrot', 'sprites/	carrot.png');
    game.load.spritesheet('kaboom', 'sprites/explosion.png', 64, 64);

}

var player;
var carrot;
var platforms;
var cursors;
var jumpButton;
var explosions;

function create() {

    player = game.add.sprite(0, 600, 'player');
    carrot = game.add.sprite(0, 500, 'carrot');
    game.physics.arcade.enable(player);
    game.physics.arcade.enable(carrot);
    

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    
    carrot.body.collideWorldBounds = true;

    platforms = game.add.physicsGroup();

    
   
    platforms.create(500, 100, 'platform');
    platforms.create(500, 200, 'platform');
    platforms.create(500, 300, 'platform');
    platforms.create(500, 400, 'platform');
    platforms.create(500, 500, 'platform');
    

    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
     explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);
     //carrot.animations.add('kaboom');
     function setupInvader (carrot) {

    carrot.anchor.x = 0.5;
    carrot.anchor.y = 0.5;
    carrot.animations.add('kaboom');

}

}



function update () {

    game.physics.arcade.collide(player, platforms);
    
    game.physics.arcade.overlap(player, carrot, collisionHandler, null, this);

    player.body.velocity.x = player.body.velocity.x*0.9;
    carrot.body.velocity.x = carrot.body.velocity.x + Math.random()*100-50;
    carrot.body.velocity.y = carrot.body.velocity.y + Math.random()*100-50;
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown) //(player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function collisionHandler (player, carrot) {

    //  When the tanks hits the carrot we kill carrot, se metto anche player muore anche il carro armato
    carrot.kill();
    //player.kill();
    var explosion = explosions.getFirstExists(false);
    explosion.reset(carrot.body.x, carrot.body.y);
    explosion.play('kaboom', 30, false, true);
   
    
}


function render () {

}
