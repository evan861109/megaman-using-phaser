var Megaman = Megaman || {};

Megaman.Game = function(game){
    this.game = game;
    this.loading = true;
};

Megaman.Game.prototype = {
    preload: function() {

    },

    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.createWorld();

        this.cursor = this.input.keyboard.createCursorKeys();
        this.shootbutton = this.input.keyboard.addKey(Phaser.Keyboard.X);
        this.dashbutton = this.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.pausebutton = this.input.keyboard.addKey(Phaser.Keyboard.ESC);

        this.jumperArray = [];
        this.helmetArray = [];
        this.soldierArray = [];
        this.enemies = this.add.group();
        helicopter1 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(658, 100),
            health: 2,
        });
        helicopter2 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(1553, 100),
            health: 2,
        });
        helicopter3 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(1797, 100),
            health: 2,
        });
        helicopter4 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(2450, 714),
            health: 2,
        });
        helicopter5 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(2531, 1146),
            health: 2,
        });
        helicopter6 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(3047, 1076),
            health: 2,
        });
        helicopter7 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(3657, 1110),
            health: 2,
        });
        helicopter8 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(4474, 216),
            health: 2,
        });
        helicopter9 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(4598, 150),
            health: 2,
        });
        helicopter10 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(5374, 210),
            health: 2,
        });
        helicopter11 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(4991, 275),
            health: 2,
        });
        helicopter12 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(5976, 2123),
            health: 2,
        });
        helicopter13 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(6974, 2010),
            health: 2,
        });
        helicopter14 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(7037, 2100),
            health: 2,
        });
        helicopter15 = new enemy_helicopter({
            game: this,
            startingPoint: new Phaser.Point(6957, 2000),
            health: 2,
        });
        helicopter1.create('helicopter');
        this.enemies.add(helicopter1.sprite);
        helicopter2.create('helicopter');
        this.enemies.add(helicopter2.sprite);
        helicopter3.create('helicopter');
        this.enemies.add(helicopter3.sprite);
        helicopter4.create('helicopter');
        this.enemies.add(helicopter4.sprite);
        helicopter5.create('helicopter');
        this.enemies.add(helicopter5.sprite);
        helicopter6.create('helicopter');
        this.enemies.add(helicopter6.sprite);
        helicopter7.create('helicopter');
        this.enemies.add(helicopter7.sprite);
        helicopter8.create('helicopter');
        this.enemies.add(helicopter8.sprite);
        helicopter9.create('helicopter');
        this.enemies.add(helicopter9.sprite);
        helicopter10.create('helicopter');
        this.enemies.add(helicopter10.sprite);
        helicopter11.create('helicopter');
        this.enemies.add(helicopter11.sprite);
        helicopter12.create('helicopter');
        this.enemies.add(helicopter12.sprite);
        helicopter13.create('helicopter');
        this.enemies.add(helicopter13.sprite);
        helicopter14.create('helicopter');
        this.enemies.add(helicopter14.sprite);
        helicopter15.create('helicopter');
        this.enemies.add(helicopter15.sprite);
    
        for(var i = 0; i < 6; i = i + 1){
            if(i == 0){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(1286, 282),
                    health: 5,
                });
            }
            if(i == 1){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(3842, 792),
                    health: 5,
                });
            }
            if(i == 2){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(5811, 810),
                    health: 5,
                });
            }
            if(i == 3){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(6020, 1230),
                    health: 5,
                });
            }
            if(i == 4){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(5827, 1770),
                    health: 5,
                });
            }
            if(i == 5){
                jumper = new enemy_jumper({
                    game: this,
                    startingPoint: new Phaser.Point(5790, 2130),
                    health: 5,
                });
            }
            jumper.create('jumper');
            this.enemies.add(jumper.sprite);
            this.jumperArray.push(jumper);
        }

        for(var i = 0; i < 7; i = i + 1){
            if(i == 0){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(1593, 315),
                    health: 2,
                });
            }
            if(i == 1){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(2200, 342),
                    health: 2,
                });
            }
            if(i == 2){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(2460, 792),
                    health: 2,
                });
            }
            if(i == 3){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(2517, 822),
                    health: 2,
                });
            }
            if(i == 4){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(2380, 1302),
                    health: 2,
                });
            }
            if(i == 5){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(5339, 216),
                    health: 2,
                });
            }
            if(i == 6){
                helmet = new enemy_helmet({
                    game: this,
                    startingPoint: new Phaser.Point(6882, 2124),
                    health: 2,
                });
            }
            helmet.create('helmet');
            this.enemies.add(helmet.sprite);
            this.helmetArray.push(helmet);
        }

        for(var i = 0; i < 7; i = i + 1){
            if(i == 0){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(2457, 1242),
                    health: 2,
                });
            }
            if(i == 1){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(2961, 1176),
                    health: 2,
                });
            }
            if(i == 2){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(3288, 1176),
                    health: 2,
                });
            }
            if(i == 3){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(4652, 156),
                    health: 2,
                });
            }
            if(i == 4){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(6405, 2190),
                    health: 2,
                });
            }
            if(i == 5){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(6461, 2124),
                    health: 2,
                });
            }
            if(i == 6){
                soldier = new enemy_soldier({
                    game: this,
                    startingPoint: new Phaser.Point(6905, 2124),
                    health: 2,
                });
            }
            soldier.create('soldier');
            this.enemies.add(soldier.sprite);
            this.soldierArray.push(soldier);
        }

        boss = new enemy_boss({
            game: this,
            startingPoint: new Phaser.Point(8177, 2100),
            health: 15,
        });
        boss.create('boss');
        this.enemies.add(boss.sprite);

        man = new megaman({
            game: this,
            startingPoint: new Phaser.Point(500, 0),
            scaleSize: 1.2
        });
        man.create();

        this.game.camera.follow(man.player, Phaser.Camera.FOLLOW_PLATFORMER);
    },

    update: function() {
        this.game.physics.arcade.collide(this.enemies, this.layer0);
        this.game.physics.arcade.collide(this.enemies, this.layer5);
        if(boss.health > 0){
            boss.update(man);
        }
        this.jumperArray.forEach(function(enemy){
            if(enemy.health > 0){
                enemy.update(man);
            }
        });
        this.helmetArray.forEach(function(enemy){
            if(enemy.health > 0){
                enemy.update(man);
            }
        });
        this.soldierArray.forEach(function(enemy){
            if(enemy.health > 0){
                enemy.update(man);
            }
        });
        if(helicopter1.health > 0){
            if(helicopter1.sprite.x - man.player.x < 400 && helicopter1.sprite.y - man.player.y < 400){
                helicopter1.update(man);
            }
        }
        if(helicopter2.health > 0){
            if(helicopter2.sprite.x - man.player.x < 400 && helicopter2.sprite.y - man.player.y < 400){
                helicopter2.update(man);
            }
        }
        if(helicopter3.health > 0){
            if(helicopter3.sprite.x - man.player.x < 400 && helicopter3.sprite.y - man.player.y < 400){
                helicopter3.update(man);
            }
        }
        if(helicopter4.health > 0){
            if(helicopter4.sprite.x - man.player.x < 400 && helicopter4.sprite.y - man.player.y < 400){
                helicopter4.update(man);
            }
        }
        if(helicopter5.health > 0){
            if(helicopter5.sprite.x - man.player.x < 400 && helicopter5.sprite.y - man.player.y < 400){
                helicopter5.update(man);
            }
        }
        if(helicopter6.health > 0){
            if(helicopter6.sprite.x - man.player.x < 400 && helicopter6.sprite.y - man.player.y < 400){
                helicopter6.update(man);
            }
        }
        if(helicopter7.health > 0){
            if(helicopter7.sprite.x - man.player.x < 400 && helicopter7.sprite.y - man.player.y < 400){
                helicopter7.update(man);
            }
        }
        if(helicopter8.health > 0){
            if(helicopter8.sprite.x - man.player.x < 400 && helicopter8.sprite.y - man.player.y < 400){
                helicopter8.update(man);
            }
        }
        if(helicopter9.health > 0){
            if(helicopter9.sprite.x - man.player.x < 400 && helicopter9.sprite.y - man.player.y < 400){
                helicopter9.update(man);
            }
        }
        if(helicopter10.health > 0){
            if(helicopter10.sprite.x - man.player.x < 400 && helicopter10.sprite.y - man.player.y < 400){
                helicopter10.update(man);
            }
        }
        if(helicopter11.health > 0){
            if(helicopter11.sprite.x - man.player.x < 400 && helicopter11.sprite.y - man.player.y < 400){
                helicopter11.update(man);
            }
        }
        if(helicopter12.health > 0){
            if(helicopter12.sprite.x - man.player.x < 400 && helicopter12.sprite.y - man.player.y < 400){
                helicopter12.update(man);
            }
        }
        if(helicopter13.health > 0){
            if(helicopter13.sprite.x - man.player.x < 400 && helicopter13.sprite.y - man.player.y < 400){
                helicopter13.update(man);
            }
        }
        if(helicopter14.health > 0){
            if(helicopter14.sprite.x - man.player.x < 400 && helicopter14.sprite.y - man.player.y < 400){
                helicopter14.update(man);
            }
        }
        if(helicopter15.health > 0){
            if(helicopter15.sprite.x - man.player.x < 400 && helicopter15.sprite.y - man.player.y < 400){
                helicopter15.update(man);
            }
        }
        man.update(this.enemies);
        // if(this.pausebutton.isDown){
        //     this.paused = true;
        // }
        if( man.player.x >7124 && man.player.x < 7776){
            this.layer4.visible = false;
        }
        else this.layer4.visible = true;
    },

    createWorld: function(){
        this.map = this.add.tilemap('allmap');
        this.map.addTilesetImage('map', 'background');
        this.map.addTilesetImage('red', 'tileset');
        this.map.addTilesetImage('green', 'platformtile');
        this.map.addTilesetImage('blue', 'deathtile');
        this.layer0 = this.map.createLayer('layer_0');
        this.layer5 = this.map.createLayer('layer_5');
        this.layer3 = this.map.createLayer('layer_3');
        this.layer2 = this.map.createLayer('layer_2');
        this.layer1 = this.map.createLayer('layer_1');
        this.layer4 = this.map.createLayer('layer_4');
        this.layer0.setScale(2);
        this.layer5.setScale(2);
        this.layer3.setScale(2);
        this.layer2.setScale(2);
        this.layer1.setScale(2);
        this.layer4.setScale(2);
        this.layer0.resizeWorld();
        this.layer1.resizeWorld();
        this.layer2.resizeWorld();
        this.layer3.resizeWorld();
        this.layer4.resizeWorld();
        this.layer5.resizeWorld();
        this.map.setCollision(543495, true, this.layer2, true);
        this.map.setCollision(543496, true, this.layer3, true);
        this.map.setCollision(543494, true, this.layer0, true);
        this.map.setCollision(543496, true, this.layer5, true);
        

        var tilesArray = this.layer3.getTiles(0,0,this.game.world.width, this.game.world.height)
        for(var i = 0;i < tilesArray.length; i++){
            tilesArray[i].collideDown = false;
        }
    },
};