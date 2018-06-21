var Megaman = Megaman || {};

Megaman.Preload = function(game){
    this.game = game;
};

Megaman.Preload.prototype = {
    preload: function() {
        this.load.tilemap('allmap', 'map/fullmap.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('background', 'map/map.png');
        this.load.image('tileset', 'map/red.jpg');
        this.load.image('deathtile', 'map/blue.jpg');
        this.load.image('platformtile', 'map/green.jpg');

        this.load.audio('explosion_sound', 'assets/Explosion.wav');
        this.load.audio('jump_sound', 'assets/MMJump.wav');
        this.load.audio('shot1', 'assets/MMShot1.wav');
        this.load.audio('landing_sound', 'assets/MMLanding.wav');
        this.load.audio('sliding_sound', 'assets/MMSlide.wav');
        this.load.audio('hit_sound', 'assets/MMHit.wav');
        this.load.audio('enemy_hit_sound', 'assets/EnemyHit2.wav');
        this.load.audio('upgrade_sound', 'assets/GetEnergy.wav');
        this.load.image('ammo', 'assets/ammo.png');
        this.load.image('strong_ammo', 'assets/ammo1.png');
        this.load.image('health0', 'assets/healthbar/healthbar0.png');
        this.load.image('health1', 'assets/healthbar/healthbar1.png');
        this.load.image('health2', 'assets/healthbar/healthbar2.png');
        this.load.image('health3', 'assets/healthbar/healthbar3.png');
        this.load.image('health4', 'assets/healthbar/healthbar4.png');
        this.load.image('health5', 'assets/healthbar/healthbar5.png');
        this.load.image('health6', 'assets/healthbar/healthbar6.png');
        this.load.image('health7', 'assets/healthbar/healthbar7.png');
        this.load.image('health8', 'assets/healthbar/healthbar8.png');
        this.load.image('health9', 'assets/healthbar/healthbar9.png');
        this.load.image('health10', 'assets/healthbar/healthbar10.png');
        this.load.image('health11', 'assets/healthbar/healthbar11.png');
        this.load.image('health12', 'assets/healthbar/healthbar12.png');
        this.load.image('health13', 'assets/healthbar/healthbar13.png');
        this.load.image('health14', 'assets/healthbar/healthbar14.png');
        this.load.image('health15', 'assets/healthbar/healthbar15.png');
        this.load.image('health16', 'assets/healthbar/healthbar16.png');
        this.load.image('health17', 'assets/healthbar/healthbar17.png');
        this.load.image('health18', 'assets/healthbar/healthbar18.png');
        this.load.image('health19', 'assets/healthbar/healthbar19.png');
        this.load.image('health20', 'assets/healthbar/healthbar20.png');
        this.load.image('big_heal', 'assets/bighealth.png');
        this.load.image('small_heal', 'assets/smallhealth.png');
        this.load.image('weapon_upgrade', 'assets/weaponupgrade.png');
        this.load.image('nothing', 'assets/nothing.png');
        this.load.atlasJSONHash('player','assets/megaman.png','assets/megaman.json');
        this.load.atlasJSONHash('explosion', 'assets/explode.png', 'assets/explode.json');
        this.load.atlasJSONHash('dead', 'assets/dead.png', 'assets/dead.json');

        this.load.atlasJSONHash('jumper','assets/jumper.png','assets/jumper.json');
        this.load.atlasJSONHash('helicopter','assets/helicopter.png','assets/helicopter.json');
        this.load.atlasJSONHash('soldier', 'assets/soldier.png', 'assets/soldier.json');
        this.load.atlasJSONHash('helmet', 'assets/helmet.png', 'assets/helmet.json');
        this.load.atlasJSONHash('boss','assets/boss.png','assets/boss.json');
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },

    create: function() {
    
    },

    update: function() {
        this.game.time.events.add(1000, function(){
            this.state.start('Game');
        }, this);
    }
};