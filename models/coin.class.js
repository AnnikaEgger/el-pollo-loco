class Coin extends DrawableObject {
  width = 150;
  height = 150;
  offsetValue = 50;

  COIN_SMALL = "../img/8_coin/coin_1.png";
  COIN_BIG = "../img/8_coin/coin_2.png";

  collectingSound = new Audio("../audio/coin/collecting.mp3");

  constructor(x, y) {
    super();

    this.offset = {
      left: this.offsetValue,
      right: this.offsetValue,
      top: this.offsetValue,
      bottom: this.offsetValue,
    };

    this.loadImage("../img/8_coin/coin_2.png");
    this.x = x;
    this.y = y;
  }
}
