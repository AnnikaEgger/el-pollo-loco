class Coin extends DrawableObject {
  offsetValue;
  coinValue;
  index;
  maxY = (65 / 480) * canvas.height;

  COINS = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  static collectingSound = new Audio("../audio/coin/collecting.mp3");

  static AUDIOS = [Coin.collectingSound];

  constructor() {
    super();
    this.index = this.getRandomIndex(this.COINS);
    this.x =
      Math.random() * (canvas.width * 3 - (250 / 720) * canvas.width) +
      (250 / 720) * canvas.width;
    this.y =
      this.maxY + Math.random() * ((320 / 480) * canvas.height - this.maxY);
    this.getDimensions();

    this.loadImage(this.COINS[this.index]);
  }

  getDimensions() {
    if (this.index == 0) {
      this.getSmallCoin();
    } else {
      this.getBigCoin();
    }
    this.getOffset();
  }

  getSmallCoin() {
    this.offsetValue = (45 / 720) * canvas.width;
    this.width = (120 / 720) * canvas.width;
    this.height = this.width;
    this.coinValue = 1;
  }

  getBigCoin() {
    this.offsetValue = (52 / 720) * canvas.width;
    this.width = (150 / 720) * canvas.width;
    this.height = this.width;
    this.coinValue = 2;
  }

  getOffset() {
    this.offset = {
      left: this.offsetValue,
      right: this.offsetValue,
      top: this.offsetValue,
      bottom: this.offsetValue,
    };
  }
}
