function enemy_boss(options){
    this.game = options.game;
  
    this.scaleSize = 1.6;
  
    this.startingPoint = options.startingPoint;
    this.health = options.health;
}
  
enemy_boss.prototype.create= function(key) {
    this.sprite = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, key);
    this.sprite.scale.setTo(this.scaleSize, this.scaleSize);

    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.facingLeft = true;
    this.sprite.attack = 3;
    this.sprite.health = this.health;
    this.sprite.dead = false;
    this.sprite.body.setSize(58, 49);
    this.boss_check1 = 0;
    this.boss_check2 = 0;
    this.start_attack = false;

    this.sprite.animations.add('start', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16], 80, false);
    this.sprite.animations.play('start');
};
  
enemy_boss.prototype.update = function(man) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer0);
    if(!this.sprite.dead){
        if(this.sprite.x - man.player.x < 400){
            this.start_attack = true;
        }
        if(this.start_attack){
            if(!man.phase2){
                this.bossfly();
            }
            else{
                this.bossfly2();
            }
        }
    } 
    else{
        this.sprite.dead = true;
        if(!man.phase2){
            this.game.time.events.add(1000, (function(){
                this.game.camera.flash(0xff0000, 500);
                this.sprite.reset(8177, 2100);
                this.sprite.dead = false;
                this.canAttack = true;
                this.sprite.health = 30;
                this.sprite.attack = 6;
                man.phase2 = true;
            }), this);
        }
        else{
            this.sprite.kill();
        }
    }
};

enemy_boss.prototype.bossfly = function(){
    if(this.sprite.facingleft){
        this.sprite.frame=22;
        this.boss_check1 = this.game.time.now;
        this.sprite.body.velocity.x = -400;
        this.sprite.body.velocity.y = this.game.rnd.between(-200, 200);
        if(this.game.time.now - this.boss_check2 > 800){
            this.sprite.facingleft=false;
        }
    }
    else{
        this.sprite.frame=12;
        this.boss_check2 = this.game.time.now;
        this.sprite.body.velocity.x = 400;
        this.sprite.body.velocity.y = this.game.rnd.between(-200, 200);
        if(this.game.time.now - this.boss_check1 > 800){
            this.sprite.facingleft=true;
        }
    }
};

enemy_boss.prototype.bossfly2 = function(){
    if(this.sprite.facingleft){
        this.sprite.frame=22;
        this.boss_check1 = this.game.time.now;
        this.sprite.body.velocity.x = this.game.rnd.between(-1000, -500);
        this.sprite.body.velocity.y = this.game.rnd.between(-800, 800);
        if(this.game.time.now - this.boss_check2 > 500){
            this.sprite.facingleft=false;
        }
    }
    else{
        this.sprite.frame=12;
        this.boss_check2 = this.game.time.now;
        this.sprite.body.velocity.x = this.game.rnd.between(500, 1000);
        this.sprite.body.velocity.y = this.game.rnd.between(-800, 800);
        if(this.game.time.now - this.boss_check1 > 500){
            this.sprite.facingleft=true;
        }
    }
};