class Coin extends DrawableObject {
  offsetValue;
  coinValue;

  COINS = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  collectingSound = new Audio("../audio/coin/collecting.mp3");

  constructor(x, y) {
    super();
    let index = this.getRandomIndex(this.COINS);

    if (index == 0) {
      this.getSmallCoin();
    } else {
      this.getBigCoin();
    }
    this.getOffset();

    this.AUDIOS = [...this.AUDIOS, this.collectingSound];

    this.loadImage(this.COINS[index]);
    this.x = x;
    this.y = y;
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
