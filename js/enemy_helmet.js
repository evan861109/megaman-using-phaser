function enemy_helmet(options){
    this.game = options.game;
  
    this.scaleSize = 1.6;
  
    this.startingPoint = options.startingPoint;
    this.health = options.health;
    this.helmet_attackcount = 0;
    this.helmet_check = 0;
}
  
enemy_helmet.prototype.create= function(key) {
    this.sprite = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, key);
    this.sprite.scale.setTo(this.scaleSize, this.scaleSize);
  
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 1000;
    this.sprite.body.setSize(25, 25);
    this.sprite.health = this.health;
    this.sprite.hide = true;
    this.sprite.dead = false;
    this.sprite.canattack = true;
    this.sprite.frame = 1;
    this.sprite.attack = 3;

    this.helmet_ammo = this.game.add.group();
    this.helmet_ammo.enableBody = true;
    this.helmet_ammo.physicsBodyType = Phaser.Physics.ARCADE;
    this.helmet_ammo.createMultiple(20, 'ammo');
    this.helmet_ammo.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.ammo_kill);
    this.helmet_ammo.setAll('checkWorldBounds', true);
};
  
enemy_helmet.prototype.update = function(man) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer0);
    this.game.physics.arcade.overlap(this.helmet_ammo, man.player, this.damage_player, null, this)
    this.game.physics.arcade.collide(this.helmet_ammo, this.game.layer0, this.ammo_kill, null, this);
    if(!this.sprite.dead){
        if(!this.sprite.hide){
            this.sprite.frame = 2;
            this.helmet_check = this.game.time.now;
            if(this.sprite.canattack){
                if(this.helmet_attackcount == 3){
                    this.sprite.hide = true;
                }
                this.helmet_attackcount += 1;
                this.sprite.canattack = false;
                var laser = this.helmet_ammo.getFirstExists(false);
                this.game.time.events.add(800,(function(){
                    this.sprite.canattack = true;
                }),this);
                laser.reset(this.sprite.x - 5, this.sprite.y);
                laser.body.velocity.x = -500;
            }
        }
        else{
            this.sprite.frame = 1;
            this.helmet_attackcount = 0;
            if(this.game.time.now - this.helmet_check > 2400){
                this.sprite.hide = false;
            }
        }
    }
    else{
        this.sprite.dead = true;
        this.sprite.kill();
    }
    
};

enemy_helmet.prototype.damage_player = function(player, ammo){
    man.takeDamage(man, this.sprite);
    this.ammo_kill(ammo);
};

enemy_helmet.prototype.ammo_kill = function(ammo){
    ammo.kill();
};