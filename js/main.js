var Megaman = Megaman || {};

Megaman.game = new Phaser.Game(900, 440, Phaser.AUTO, 'canvas');

Megaman.game.state.add('Menu', Megaman.Menu);
Megaman.game.state.add('Preload', Megaman.Preload);
Megaman.game.state.add('Game', Megaman.Game);

Megaman.game.state.start('Menu');