class Coin extends DrawableObject {
  width;
  height;
  offsetValue;
  coinValue;

  COINS = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  collectingSound = new Audio("../audio/coin/collecting.mp3");

  constructor(x, y) {
    super();
    let index = this.getRandomIndex(this.COINS);

    if (index == 0) {
      this.offsetValue = 45;
      this.width = 120;
      this.height = 120;
      this.coinValue = 1;
    } else {
      this.offsetValue = 52;
      this.width = 150;
      this.height = 150;
      this.coinValue = 2;
    }

    this.offset = {
      left: this.offsetValue,
      right: this.offsetValue,
      top: this.offsetValue,
      bottom: this.offsetValue,
    };

    this.loadImage(this.COINS[index]);
    this.x = x;
    this.y = y;
  }
}
