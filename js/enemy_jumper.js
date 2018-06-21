function enemy_jumper(options){
    this.game = options.game;
    this.scaleSize = 1.8;
    this.startingPoint = options.startingPoint;
    this.health = options.health;
    this.canAttack = true;
}
  
enemy_jumper.prototype.create= function(key) {
    this.sprite = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, key);
    this.sprite.scale.setTo(this.scaleSize, this.scaleSize);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.gravity.y = 1000;
    this.sprite.health = this.health;
    this.sprite.attack = 5;   
    this.sprite.body.debug = true;
    this.sprite.dead = false;
};
  
enemy_jumper.prototype.update = function(man) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer0);
    if(!this.sprite.dead){
        if(this.health > 0){
            if(this.sprite.body.blocked.down){
                this.sprite.frame = 2;
                this.sprite.body.velocity.y = -500;
                if(this.sprite.x > man.player.x){
                    this.sprite.body.velocity.x = -70;
                }
                else{
                    this.sprite.body.velocity.x = 70;
                }
            }
            else{
                this.sprite.frame = 1;
            }
        } 
        else{
            this.sprite.dead = true;
            this.sprite.kill();
        }
    }
};