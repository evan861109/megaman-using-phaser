function enemy_soldier(options){
    this.game = options.game;
  
    this.scaleSize = 1.6;
  
    this.startingPoint = options.startingPoint;
    this.attack = options.attack;
    this.health = options.health;
}
  
enemy_soldier.prototype.create= function(key) {
    this.sprite = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, key);
    this.sprite.scale.setTo(this.scaleSize, this.scaleSize);

    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 1000;
    this.sprite.health = this.health;
    this.sprite.canattack = true;
    this.sprite.defend = true;
    this.sprite.attack = 1;
    this.sprite.dead = false;
};
  
enemy_soldier.prototype.update = function(man) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer0);
    
    if(!this.sprite.dead){
        if(this.sprite.x - man.player.x > 300){
            this.sprite.defend = true;
            this.sprite.frame = 0;
        }
        else if(this.sprite.x - man.player.x < 100 && this.sprite.x - man.player.x > 0){
            this.sprite.defend = true;
            if(man.player.y+25 < this.sprite.y && this.sprite.body.blocked.down){
                this.sprite.body.velocity.y = -400;
            }
            if(!this.sprite.body.blocked.down){
                this.sprite.frame=3;
            }
            else{
                this.sprite.frame=0;
            }
        }
        else if(this.sprite.x < man.player.x){
            this.sprite.defend=false;
            this.sprite.frame=2;
        }
        else{
            
            if(!man.facingLeft){            
                this.sprite.defend=true;
                this.sprite.frame=0;
            }
            else{
                this.sprite.defend=false;
                this.sprite.frame=2;
            }
        }
    } 
    else{
        this.sprite.dead = true;
        this.sprite.kill();
    }
};