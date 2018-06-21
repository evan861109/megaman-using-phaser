function megaman(options){
    this.game = options.game;
    this.startingPoint = options.startingPoint;
    this.scalesize = 1.2;

    this.isdashing = false;
    this.candash = true;
    this.canattack = true;
    this.falling = false;
    this.damaged = false;
    this.invincible = false;
    this.health = 20;
    this.health.max = 20;
    this.facingLeft = false;
    this.phase2 = false;
}
  
megaman.prototype.create = function() {

    this.player = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, 'player');
    this.player.scale.setTo(this.scalesize, this.scalesize);
    this.game.physics.arcade.enable(this.player);
    this.player.body.setSize(29, 40);
    this.player.body.gravity.y = 1000;
    this.player.body.maxVelocity.y = 500;
    this.player.upgrade = false;

    this.jump_sound = this.game.add.audio('jump_sound');
    this.landing_sound = this.game.add.audio('landing_sound');
    this.sliding_sound = this.game.add.audio('sliding_sound');
    this.hit_sound = this.game.add.audio('hit_sound');
    this.enemy_hit_sound = this.game.add.audio('enemy_hit_sound');
    this.upgrade_sound = this.game.add.audio('upgrade_sound');

    this.ammo = this.game.add.group();
    this.ammo.enableBody = true;
    this.ammo.physicsBodyType = Phaser.Physics.ARCADE;
    this.ammo.createMultiple(20, 'ammo');
    this.ammo.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.ammo_kill);
    this.ammo.setAll('checkWorldBounds', true);

    this.upgrade_ammo = this.game.add.group();
    this.upgrade_ammo.enableBody = true;
    this.upgrade_ammo.physicsBodyType = Phaser.Physics.ARCADE;
    this.upgrade_ammo.createMultiple(20, 'strong_ammo');
    this.upgrade_ammo.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.ammo_kill);
    this.upgrade_ammo.setAll('checkWorldBounds', true);

    this.laser = this.ammo.getFirstExists(false);
    this.shot1_sound = this.game.add.audio('shot1');

    this.healthbar = this.game.add.sprite(35, 35, 'health20');
    this.healthbar.scale.x = 0.3;
    this.healthbar.scale.y = 0.3;
    this.healthbar.fixedToCamera = true;

    this.explosion = this.game.add.group();
    this.explosion.createMultiple(30, 'explosion');
    this.explosion.forEach(this.explosion_animate, this);
    this.explosion_sound = this.game.add.audio('explosion_sound');

    this.items = this.game.add.group();
    this.items.enableBody = true;
    this.items.physicsBodyType = Phaser.Physics.ARCADE;
    this.items.createMultiple(3, 'big_heal');
    this.items.createMultiple(5, 'small_heal');
    this.items.createMultiple(1, 'weapon_upgrade');
    this.items.createMultiple(4, 'nothing');
    this.items.forEach(function(item){
        item.body.gravity.y = 1000;
    }, this);

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

};

megaman.prototype.update = function(enemies) {
    console.log(this.player.x);
    this.random_item = this.items.getRandom();
    if(this.player.upgrade == true){
        this.laser = this.upgrade_ammo.getFirstExists(false);
    }
    enemies.forEach(function(enemy){  
        if(enemy.attack == 2){
            this.game.physics.arcade.overlap(this.player, enemy, this.takeDamage, null, this);
            this.game.physics.arcade.overlap(this.ammo, enemy, this.enemy_damage, null, this);
            this.game.physics.arcade.overlap(this.upgrade_ammo, enemy, this.enemy_damage, null, this);
        }
        if(enemy.attack == 5){
            this.game.physics.arcade.overlap(this.player, enemy, this.takeDamage, null, this);
            this.game.physics.arcade.overlap(this.ammo, enemy, this.enemy_damage, null, this);
            this.game.physics.arcade.overlap(this.upgrade_ammo, enemy, this.enemy_damage, null, this);
        }
        if(enemy.attack == 3){
            this.game.physics.arcade.overlap(this.player, enemy, this.takeDamage, null, this);
            this.game.physics.arcade.overlap(this.ammo, enemy, this.helmet_damage, null, this);
            this.game.physics.arcade.overlap(this.upgrade_ammo, enemy, this.helmet_damage, null, this);
        }
        if(enemy.attack == 1){
            this.game.physics.arcade.overlap(this.player, enemy, this.takeDamage, null, this);
            this.game.physics.arcade.overlap(this.ammo, enemy, this.soldier_damage, null, this);
            this.game.physics.arcade.overlap(this.upgrade_ammo, enemy, this.soldier_damage, null, this);
        }
        if(enemy.attack == 6){
            this.game.physics.arcade.overlap(this.player, enemy, this.takeDamage, null, this);
            this.game.physics.arcade.overlap(this.ammo, enemy, this.enemy_damage, null, this);
            this.game.physics.arcade.overlap(this.upgrade_ammo, enemy, this.enemy_damage, null, this);
        }
    }, this)

    this.game.physics.arcade.collide(this.player, this.game.layer0);
    if(man.player.x > 7742){
        this.game.physics.arcade.collide(this.player, this.game.layer5);
    }
    this.game.physics.arcade.collide(this.player, this.game.layer3);
    this.game.physics.arcade.collide(this.player, this.game.layer2, this.dropdead, null, this);

    this.player_life();

    this.game.physics.arcade.collide(this.items, this.game.layer0);
    this.items.forEach(function(child){
        if(child.key === 'big_heal'){
            this.game.physics.arcade.overlap(this.player, child, this.big_heal, null, this);
        }
        else if(child.key === 'small_heal'){
            this.game.physics.arcade.overlap(this.player, child, this.small_heal, null, this);
        }
        else if(child.key === 'weapon_upgrade'){
            this.game.physics.arcade.overlap(this.player, child, this.weapon_upgrade, null, this);
        }
    }, this);

    if(this.invincible){
        if(this.player.alpha < 1){
            this.player.alpha += 0.9;
        } 
        else{
            this.player.alpha -= 0.9;
        }
    }

    if(!this.damaged){
        if(this.game.shootbutton.isDown){
            this.attack();
        }
        if(this.player.body.blocked.down && this.falling){
            this.falling = false;
            this.landing_sound.play();
        }
        if(this.player.body.velocity.y > 0){
            this.falling = true;
        }
        if(this.player.body.blocked.down){
            this.moveonground();
        }
        if(!this.player.body.blocked.down){
            this.moveinair();
        }
    }
};

megaman.prototype.big_heal = function(player, item){
    this.upgrade_sound.play();
    if(this.health < 14){
        this.health += 7;
    }
    else{
        this.health = 20;
    }
    item.kill();
};

megaman.prototype.small_heal = function(player, item){
    this.upgrade_sound.play();
    if(this.health < 18){
        this.health += 3;
    }
    else{
        this.health = 20;
    }
    item.kill();
};

megaman.prototype.weapon_upgrade = function(player, item){
    this.upgrade_sound.play();
    this.player.upgrade = true;
    item.kill();
};

megaman.prototype.helmet_damage = function(enemy, ammo){
    if(!enemy.hide){
        if(this.player.upgrade == false){
            enemy.health -= 1;
        }
        else{
            enemy.health -= 3;
        }
        if(enemy.health > 0){
            this.enemy_hit_sound.play();
            this.ammo_kill(ammo);
        }
        else{
            var explode = this.explosion.getFirstExists(false);
            explode.reset(enemy.x, enemy.y);
            explode.play('boom', 30, false, true);
            this.explosion_sound.play();
            this.ammo_kill(ammo);
            enemy.dead = true;
        }
    }
    else{
        console.log(this.laser.body.velocity.x)
        this.laser.body.velocity.x = -350;
        this.laser.body.velocity.y = -350;
    }
};

megaman.prototype.soldier_damage = function(enemy, ammo){
    if(!enemy.defend){
        if(this.player.upgrade == false){
            enemy.health -= 1;
        }
        else{
            enemy.health -= 3;
        }
        if(enemy.health > 0){
            this.enemy_hit_sound.play();
            this.ammo_kill(ammo);
        }
        else{
            var explode = this.explosion.getFirstExists(false);
            explode.reset(enemy.x, enemy.y);
            explode.play('boom', 30, false, true);
            this.explosion_sound.play();
            this.ammo_kill(ammo);
            this.ammo_kill(enemy);

            enemy.dead = true;
        }
    }
    else{
        console.log(this.laser.body.velocity.x)
        this.laser.body.velocity.x = -500;
    }
};

megaman.prototype.takeDamage = function (player, enemy) {
    console.log(enemy.attack);
    if(!this.invincible){
        this.player.animations.stop();
        this.health -= enemy.attack;
        if(this.facingLeft){
            this.player.body.velocity.y -= -200;
            this.player.body.velocity.x = 50 * this.player.scale.x;
            this.player.animations.play('hurt_left');
        }
        else{
            this.player.body.velocity.y -= -200;
            this.player.body.velocity.x = -50 * this.player.scale.x;
            this.player.animations.play('hurt');
        }
        this.damaged = true;
        this.invincible = true;
        this.hit_sound.play();
        this.game.time.events.add(700, (function(){
            this.damaged = false;
            this.game.time.events.add(1000, (function(){
                this.invincible = false;
                this.player.alpha = 1;
            }), this)
        }), this)
    }
};

megaman.prototype.enemy_damage = function(enemy, ammo){
    if(this.player.upgrade == false){
        enemy.health -= 1;
    }
    else{
        enemy.health -= 3;
    }
    if(enemy.health > 0){
        this.enemy_hit_sound.play();
        this.ammo_kill(ammo);
    }
    else{
        var explode = this.explosion.getFirstExists(false);
        explode.reset(enemy.x, enemy.y);
        explode.play('boom', 30, false, true);
        this.explosion_sound.play();
        this.ammo_kill(ammo);
        this.ammo_kill(enemy);
        this.random_item.reset(enemy.x, enemy.y);
        enemy.dead = true;
    }
};

megaman.prototype.attack = function(){
    if(this.canattack){
        this.shot1_sound.play();
        this.canattack = false;
        this.game.time.events.add(500, (function() {
            this.canattack = true;
        }), this);     
        if(this.facingLeft){
            this.laser.reset(this.player.x-10, this.player.y+20);
            this.laser.body.velocity.x = -500;
        }
        else{
            this.laser.reset(this.player.x+60, this.player.y+20);
            this.laser.body.velocity.x = 500;
        }
    }
};

megaman.prototype.ammo_kill = function(ammo){
    ammo.kill();
};

megaman.prototype.explosion_animate = function(explode){
    explode.animations.add('boom', [0, 1, 2, 3, 4, 5]);
};

megaman.prototype.moveonground = function(){
    if(this.game.cursor.left.isDown && !this.isdashing){
        if(this.game.shootbutton.isDown){
            this.player.animations.play('leftrunshoot');
        }
        else{
            this.player.animations.play('left');
        }
        this.player.body.velocity.x = -200;
        this.facingLeft = true;
    }
    else if(this.game.cursor.right.isDown && !this.isdashing){
        if(this.game.shootbutton.isDown){
            this.player.animations.play('rightrunshoot');
        }
        else{
            this.player.animations.play('right');
        }
        this.player.body.velocity.x = 200;
        this.facingLeft = false; 
    }
    else if(this.isdashing){
        if(this.facingLeft){
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
        if(this.game.shootbutton.isDown){
            if(this.facingLeft) {
                this.player.frame = 70;
            }
            else{
                this.player.frame = 69;
            }
        }
        else{    
            if(this.facingLeft) {
                this.player.frame = 45;
            }
            else{
                this.player.frame = 46;
            }
        }
    }

    if(this.game.cursor.down.isDown && this.game.dashbutton.isDown && this.candash){
        this.sliding_sound.play();
        this.isdashing = true;
        this.candash = false;
        this.game.time.events.add(400, (function() {
            this.isdashing = false;
        }), this);

        this.game.time.events.add(650, (function(){
            this.candash = true;
        }), this);
    }
    if(this.game.cursor.up.isDown){ 
        if(this.player.body.blocked.down){
            this.jump_sound.play();
            if(this.game.shootbutton.isDown){
                if(this.facingLeft) {
                    this.player.frame = 21;
                }
                else {
                    this.player.frame = 20;
                }
            }
            else{
                if(this.facingLeft){
                    this.player.animations.play('leftjump');
                }
                else {
                    this.player.animations.play('rightjump');
                }
            }
            this.player.body.velocity.y = -800;
        }
    }
};

megaman.prototype.moveinair = function(){
    if (this.game.cursor.left.isDown){
        this.facingLeft = true;
        if(this.game.shootbutton.isDown){
            this.player.frame = 21;
        }
        else{
            this.player.frame = 14;
        }
        if(this.player.body.velocity.x > -150){
            this.player.body.velocity.x -= 20;
        }
    }
    else if(this.game.cursor.right.isDown){
        this.facingLeft = false;
        if(this.game.shootbutton.isDown){
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
        if(this.game.shootbutton.isDown){
            if(this.facingLeft) {
                this.player.frame = 21;
            }
            else {
                this.player.frame = 20;
            }
        }
        else{
            if(this.facingLeft){
                this.player.frame = 14;
            }
            else{
                this.player.frame = 19;
            }
        }
    }
};

// megaman.prototype.dropdead = function(){
//     this.player.kill();    
// }

megaman.prototype.player_life = function(){
    if(this.health == 20){
        this.healthbar.loadTexture('health20');
    }
    if(this.health == 19){
        this.healthbar.loadTexture('health19');
    }
    if(this.health == 18){
        this.healthbar.loadTexture('health18');
    }
    if(this.health == 17){
        this.healthbar.loadTexture('health17');
    }
    if(this.health == 16){
        this.healthbar.loadTexture('health16');
    }
    if(this.health == 15){
        this.healthbar.loadTexture('health15');
    }
    if(this.health == 14){
        this.healthbar.loadTexture('health14');
    }
    if(this.health == 13){
        this.healthbar.loadTexture('health13');
    }
    if(this.health == 12){
        this.healthbar.loadTexture('health12');
    }
    if(this.health == 11){
        this.healthbar.loadTexture('health11');
    }
    if(this.health == 10){
        this.healthbar.loadTexture('health10');
    }
    if(this.health == 9){
        this.healthbar.loadTexture('health9');
    }
    if(this.health == 8){
        this.healthbar.loadTexture('health8');
    }
    if(this.health == 7){
        this.healthbar.loadTexture('health7');
    }
    if(this.health == 6){
        this.healthbar.loadTexture('health6');
    }
    if(this.health == 5){
        this.healthbar.loadTexture('health5');
    }
    if(this.health == 4){
        this.healthbar.loadTexture('health4');
    }
    if(this.health == 3){
        this.healthbar.loadTexture('health3');
    }
    if(this.health == 2){
        this.healthbar.loadTexture('health2');
    }
    if(this.health == 1){
        this.healthbar.loadTexture('health1');
    }
    if(this.health <= 0){
        this.healthbar.loadTexture('health0');
        // var death = this.game.add.sprite(this.player.body.x,this.player.body.y,'dead');        
        // death.animations.add('death', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 30, false);
        // death.play('death');
        this.player.kill();
        this.gameover();
    }
};

megaman.prototype.gameover = function(){
    
}