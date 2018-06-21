var mainState = {

    preload: function() {
    
        game.load.tilemap('allmap', 'map/fullmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('background', 'map/map.png');
        game.load.image('tileset', 'map/red.jpg');
        game.load.image('deathtile', 'map/blue.jpg');
        game.load.image('platformtile', 'map/green.jpg');

        game.load.audio('explosion_sound', 'assets/Explosion.wav');
        game.load.audio('jump_sound', 'assets/MMJump.wav');
        game.load.audio('shot1', 'assets/MMShot1.wav');
        game.load.audio('landing_sound', 'assets/MMLanding.wav');
        game.load.audio('sliding_sound', 'assets/MMSlide.wav');
        game.load.audio('hit_sound', 'assets/MMHit.wav');
        game.load.image('ammo', 'assets/ammo.png');
        game.load.image('health0', 'assets/healthbar/healthbar0.png');
        game.load.image('health1', 'assets/healthbar/healthbar1.png');
        game.load.image('health2', 'assets/healthbar/healthbar2.png');
        game.load.image('health3', 'assets/healthbar/healthbar3.png');
        game.load.image('health4', 'assets/healthbar/healthbar4.png');
        game.load.image('health5', 'assets/healthbar/healthbar5.png');
        game.load.image('health6', 'assets/healthbar/healthbar6.png');
        game.load.image('health7', 'assets/healthbar/healthbar7.png');
        game.load.image('health8', 'assets/healthbar/healthbar8.png');
        game.load.image('health9', 'assets/healthbar/healthbar9.png');
        game.load.image('health10', 'assets/healthbar/healthbar10.png');
        game.load.image('health11', 'assets/healthbar/healthbar11.png');
        game.load.image('health12', 'assets/healthbar/healthbar12.png');
        game.load.image('health13', 'assets/healthbar/healthbar13.png');
        game.load.image('health14', 'assets/healthbar/healthbar14.png');
        game.load.image('health15', 'assets/healthbar/healthbar15.png');
        game.load.image('health16', 'assets/healthbar/healthbar16.png');
        game.load.image('health17', 'assets/healthbar/healthbar17.png');
        game.load.image('health18', 'assets/healthbar/healthbar18.png');
        game.load.image('health19', 'assets/healthbar/healthbar19.png');
        game.load.image('health20', 'assets/healthbar/healthbar20.png');
        game.load.atlasJSONHash('player','assets/megaman.png','assets/megaman.json');
        game.load.atlasJSONHash('explosion', 'assets/explode.png', 'assets/explode.json');

        game.load.atlasJSONHash('hellicopter','assets/hellicopter.png','assets/hellicopter.json');

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        this.cursor = game.input.keyboard.createCursorKeys();
        this.shootbutton = this.input.keyboard.addKey(Phaser.Keyboard.X);
        this.dashbutton = this.input.keyboard.addKey(Phaser.Keyboard.Z);

        this.map = game.add.tilemap('allmap');
        this.map.addTilesetImage('map', 'background');
        this.map.addTilesetImage('red', 'tileset');
        this.map.addTilesetImage('green', 'platformtile');
        this.map.addTilesetImage('blue', 'deathtile');
        this.layer0 = this.map.createLayer('layer_0');
        this.layer3 = this.map.createLayer('layer_3');
        this.layer2 = this.map.createLayer('layer_2');
        this.layer1 = this.map.createLayer('layer_1');
        this.layer0.setScale(2);
        this.layer3.setScale(2);
        this.layer2.setScale(2);
        this.layer1.scale.set(2);
        this.layer0.resizeWorld();
        this.layer1.resizeWorld();
        this.layer2.resizeWorld();
        this.layer3.resizeWorld();
        this.map.setCollision(543495, true, this.layer2, true);
        this.map.setCollision(543496, true, this.layer3, true);
        this.map.setCollision(543494, true, this.layer0, true);
        
        this.player = game.add.sprite(game.width/2, 0, 'player');
        this.isdashing = false;
        this.candash = true;
        this.canattack = true;
        game.physics.arcade.enable(this.player);
        this.player.scale.setTo(1.2, 1.2);
        this.player.body.setSize(29, 40);
        this.player.body.gravity.y = 1000;
        this.player.body.maxVelocity.y = 500;
        this.player.life = 20;
        this.player.falling = false;
        this.player.damaged = false;
        this.player.invincible = false;
        this.jump_sound = game.add.audio('jump_sound');
        this.landing_sound = game.add.audio('landing_sound');
        this.sliding_sound = game.add.audio('sliding_sound');
        this.hit_sound = game.add.audio('hit_sound');

        this.ammo = game.add.group();
        this.ammo.enableBody = true;
        this.ammo.physicsBodyType = Phaser.Physics.ARCADE;
        this.ammo.createMultiple(20, 'ammo');
        this.ammo.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.ammo_kill);
        this.ammo.setAll('checkWorldBounds', true);
        this.shot1_sound = game.add.audio('shot1');

        this.healthbar = game.add.sprite(35, 35, 'health20');
        this.healthbar.scale.x = 0.3;
        this.healthbar.scale.y = 0.3;
        this.healthbar.fixedToCamera = true;
        
        this.explosion = game.add.group();
        this.explosion.createMultiple(30, 'explosion');
        this.explosion.forEach(this.explosion_animate, this);
        this.explosion_sound = game.add.audio('explosion_sound');

        this.player.animations.add('left', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31], 20, true);
        this.player.animations.add('right', [46, 47, 48, 49, 50, 51, 52, 53, 54, 55], 20, true);
        this.player.animations.add('rightjump', [15, 16, 17, 18, 19], 70, false);
        this.player.animations.add('leftjump', [10, 11, 12, 13, 14], 70, false);
        this.player.animations.add('leftrunshoot', [32, 33, 34, 35, 36, 37, 38, 39, 40], 20, true);
        this.player.animations.add('rightrunshoot', [57, 58, 59, 60, 61, 62, 63, 64, 65], 20, true);
        this.player.animations.add('leftdash', [43, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42, 42], 50, false);
        this.player.animations.add('rightdash', [68, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67, 67], 40, false);
        this.player.animations.add('hurt', [71, 73, 75, 77], 55, false);
        this.player.animations.add('hurt_left', [72, 74, 76, 78], 55, false);

        // hellicopter
        this.hellicopter=game.add.sprite(600, 0, 'hellicopter');
        this.hellicopter.scale.x=1.5;
        this.hellicopter.scale.y=1.5;
        this.hellicopter.life = 1;
        this.hellicopter.attack = 1;
        this.hellicopter.animations.add('hellicopter_flying',[0, 1], 8,true);
        game.physics.arcade.enable(this.hellicopter);
        this.hellicopter.body.maxVelocity.x=3;
        this.hellicopter.body.maxVelocity.y=3;

        var tilesArray = this.layer3.getTiles(0,0,this.game.world.width, this.game.world.height)
        for(var i = 0;i < tilesArray.length; i++){
            tilesArray[i].collideDown = false;
        }
    },

    update: function() {

        console.log('x', this.player.world.x);
        console.log('y', this.player.world.y)

        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
        game.physics.arcade.collide(this.player, this.layer0);
        game.physics.arcade.collide(this.player, this.layer3);
        game.physics.arcade.collide(this.player, this.layer2, this.dropdead, null, this);

        //hellicopter
        this.hellcopter_collide = game.physics.arcade.overlap(this.player, this.hellicopter, this.takeDamage, null, this);
        this.bullet_collide_hellicopter = game.physics.arcade.overlap(this.ammo, this.hellicopter, this.enemy_damage, null, this);
        game.physics.arcade.collide(this.hellicopter, this.floor);
        this.flying();

        // game.physics.arcade.overlap(this.player, this.layer2, this.climbing, null, this);

        if(this.player.life == 20){
            this.healthbar.loadTexture('health20');
        }
        if(this.player.life == 19){
            this.healthbar.loadTexture('health19');
        }
        if(this.player.life == 18){
            this.healthbar.loadTexture('health18');
        }
        if(this.player.life == 17){
            this.healthbar.loadTexture('health17');
        }
        if(this.player.life == 16){
            this.healthbar.loadTexture('health16');
        }
        if(this.player.life == 15){
            this.healthbar.loadTexture('health15');
        }
        if(this.player.life == 14){
            this.healthbar.loadTexture('health14');
        }
        if(this.player.life == 13){
            this.healthbar.loadTexture('health13');
        }
        if(this.player.life == 12){
            this.healthbar.loadTexture('health12');
        }
        if(this.player.life == 11){
            this.healthbar.loadTexture('health11');
        }
        if(this.player.life == 10){
            this.healthbar.loadTexture('health10');
        }
        if(this.player.life == 9){
            this.healthbar.loadTexture('health9');
        }
        if(this.player.life == 8){
            this.healthbar.loadTexture('health8');
        }
        if(this.player.life == 7){
            this.healthbar.loadTexture('health7');
        }
        if(this.player.life == 6){
            this.healthbar.loadTexture('health6');
        }
        if(this.player.life == 5){
            this.healthbar.loadTexture('health5');
        }
        if(this.player.life == 4){
            this.healthbar.loadTexture('health4');
        }
        if(this.player.life == 3){
            this.healthbar.loadTexture('health3');
        }
        if(this.player.life == 2){
            this.healthbar.loadTexture('health2');
        }
        if(this.player.life == 1){
            this.healthbar.loadTexture('health1');
        }
        if(this.player.life == 0){
            this.healthbar.loadTexture('health0');
        }
        if(this.player.invincible){
            if(this.player.alpha < 1){
                this.player.alpha += 0.9;
            } 
            else{
                this.player.alpha -= 0.9;
            }
        }
        if(!this.player.damaged){
            if(this.shootbutton.isDown){
                this.attack();
            }
            if(this.player.body.blocked.down && this.player.falling){
                this.player.falling = false;
                this.landing_sound.play();
            }
            if(this.player.body.velocity.y > 0){
                this.player.falling = true;
            }
            if(this.player.body.blocked.down){
                this.moveonground();
            }
            if(!this.player.body.blocked.down){
                this.moveinair();
            }
        }
    },

    dropdead: function(){
        this.player.kill();
    },

    enemy_damage: function(ammo, enemy){
        var explode = this.explosion.getFirstExists(false);
        explode.reset(enemy.body.x, enemy.body.y);
        explode.play('boom', 30, false, true);
        this.explosion_sound.play();
        this.ammo_kill(ammo);
        this.ammo_kill(enemy);
    },

    explosion_animate: function(explode){
        explode.animations.add('boom', [0, 1, 2, 3, 4, 5]);
    },

    flying: function(){
        this.hellicopter.animations.play('hellicopter_flying');
        if(this.hellicopter.x > this.player.x){
            this.hellicopter.x -= 2;
        }
        else{
            this.hellicopter.x += 2;
        }
        if(this.hellicopter.y > this.player.y){
            this.hellicopter.y -= 2;
        }
        else{
            this.hellicopter.y += 2;
        }
    },

    takeDamage: function(){
        this.player.animations.stop();
        this.player.life -= 1;
        if(this.player.facingLeft){
            this.player.body.velocity.y -= -200;
            this.player.body.velocity.x = 150 * this.player.scale.x;
            this.player.animations.play('hurt_left');
        }
        else{
            this.player.body.velocity.y -= -200;
            this.player.body.velocity.x = -150 * this.player.scale.x;
            this.player.animations.play('hurt');
        }
        this.player.damaged = true;
        this.player.invincible = true;
        this.hit_sound.play();
        game.time.events.add(700, (function(){
            this.player.damaged = false;
            game.time.events.add(1000, (function(){
                this.player.invincible = false;
                this.player.alpha = 1;
            }), this)
        }), this)
    },

    attack: function(){
        if(this.canattack){
            this.shot1_sound.play();
            this.canattack = false;
            var laser = this.ammo.getFirstExists(false);
            game.time.events.add(700, (function() {
                this.canattack = true;
            }), this);     
            if(this.player.facingLeft){
                laser.reset(this.player.x-10, this.player.y+20);
                laser.body.velocity.x = -500;
            }
            else{
                laser.reset(this.player.x+60, this.player.y+20);
                laser.body.velocity.x = 500;
            }
        }
    },

    ammo_kill: function(ammo){
        ammo.kill();
    },

    moveonground: function(){
        if(this.cursor.left.isDown && !this.isdashing){
            if(this.shootbutton.isDown){
                this.player.animations.play('leftrunshoot');
            }
            else{
                this.player.animations.play('left');
            }
            this.player.body.velocity.x = -200;
            this.player.facingLeft = true;
        }
        else if(this.cursor.right.isDown && !this.isdashing){
            if(this.shootbutton.isDown){
                this.player.animations.play('rightrunshoot');
            }
            else{
                this.player.animations.play('right');
            }
            this.player.body.velocity.x = 200;
            this.player.facingLeft = false; 
        }
        else if(this.isdashing){
            if(this.player.facingLeft){
                this.player.animations.play('leftdash');
                this.player.body.velocity.x = -250 * this.player.scale.x;
            }
            else{
                this.player.animations.play('rightdash');
                this.player.body.velocity.x = 250 * this.player.scale.x;
            }
        }    
        else{
            this.player.body.velocity.x = 0;
            if(this.shootbutton.isDown){
                if(this.player.facingLeft) {
                    this.player.frame = 70;
                }
                else{
                    this.player.frame = 69;
                }
            }
            else{    
                if(this.player.facingLeft) {
                    this.player.frame = 45;
                }
                else{
                    this.player.frame = 46;
                }
            }
        }

        if(this.cursor.down.isDown && this.dashbutton.isDown && this.candash){
            this.sliding_sound.play();
            this.isdashing = true;
            this.candash = false;
            this.game.time.events.add(400, (function() {
                this.isdashing = false;
            }), this);

            game.time.events.add(650, (function(){
                this.candash = true;
            }), this);
        }
        if(this.cursor.up.isDown){ 
            if(this.player.body.blocked.down){
                this.jump_sound.play();
                if(this.shootbutton.isDown){
                    if(this.player.facingLeft) {
                        this.player.frame = 21;
                    }
                    else {
                        this.player.frame = 20;
                    }
                }
                else{
                    if(this.player.facingLeft){
                        this.player.animations.play('leftjump');
                    }
                    else {
                        this.player.animations.play('rightjump');
                    }
                }
                this.player.body.velocity.y = -800;
            }
        }
    },

    moveinair: function(){
        if (this.cursor.left.isDown){
            this.player.facingLeft = true;
            if(this.shootbutton.isDown){
                this.player.frame = 21;
            }
            else{
                this.player.frame = 14;
            }
            if(this.player.body.velocity.x > -150){
                this.player.body.velocity.x -= 20;
            }
        }
        else if(this.cursor.right.isDown){
            this.player.facingLeft = false;
            if(this.shootbutton.isDown){
                this.player.frame = 20;
            }
            else{
                this.player.frame = 19;
            }
            if(this.player.body.velocity.x < 150){
                this.player.body.velocity.x += 20;
            }
        }
        else{
            if(this.shootbutton.isDown){
                if(this.player.facingLeft) {
                    this.player.frame = 21;
                }
                else {
                    this.player.frame = 20;
                }
            }
            else{
                if(this.player.facingLeft){
                    this.player.frame = 14;
                }
                else{
                    this.player.frame = 19;
                }
            }
        }
    }
};

var game = new Phaser.Game(900, 440, Phaser.AUTO, 'canvas');
game.state.add('main', mainState);
game.state.start('main');