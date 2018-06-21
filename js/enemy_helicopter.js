function enemy_helicopter(options){
    this.game = options.game;
  
    this.scaleSize = 1.5;
    this.startingPoint = options.startingPoint;
    this.health = options.health;
}
  
enemy_helicopter.prototype.create= function(key) {
    this.sprite = this.game.add.sprite(this.startingPoint.x, this.startingPoint.y, key);
    this.sprite.scale.setTo(this.scaleSize, this.scaleSize);
  
    this.sprite.animations.add('helicopter_flying', [0, 1], 8, true);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.gravity.y = 0;
    this.sprite.health = this.health;
    this.sprite.attack = 2;
    this.sprite.dead = false;
};
  
enemy_helicopter.prototype.update = function(man) {
    this.game.physics.arcade.collide(this.sprite, this.game.layer0);
    if(!this.sprite.dead){
        if(this.health > 0){
            this.sprite.animations.play('helicopter_flying');
            if(this.sprite.x > man.player.x){
                this.sprite.body.x -= 2;
            }
            else{
                this.sprite.body.x += 2;
            }
            if(this.sprite.y > man.player.y){
                this.sprite.body.y -= 2;
            }
            else{
                this.sprite.body.y += 2;
            }
        }
    } 
    else{
        this.sprite.dead = true;
        this.sprite.kill();
    }
};