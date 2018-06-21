var Megaman = Megaman || {};

Megaman.Menu = function(game){
    this.game = game;
};

Megaman.Menu.prototype = {
    preload: function() {
        this.load.image('menu', 'assets/menu.png');
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    },
    create: function() {
        this.menu = this.add.image(0, 0, 'menu');
        this.startButton = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.exitButton = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.guideButton = this.input.keyboard.addKey(Phaser.Keyboard.G);
    },

    update: function(){       
        if(this.startButton.isDown){
            this.state.start('Preload');
        }
        
    }
};