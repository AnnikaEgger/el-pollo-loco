class Coin extends DrawableObject {
  offsetValue;
  coinValue;
  index;
  maxY = (20 / 480) * canvas.height;

  COINS = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

  static collectingSound = new Audio("./assets/audio/coin/collecting.mp3");

  static AUDIOS = [Coin.collectingSound];

  constructor(existingCoins) {
    super();
    Coin.collectingSound.volume = 0.15;
    this.index = this.getRandomIndex(this.COINS);

    this.setValidXPosition(existingCoins);

    this.y =
      this.maxY + Math.random() * ((150 / 480) * canvas.height - this.maxY);
    this.getDimensions();

    this.loadImage(this.COINS[this.index]);
  }

  getRandomX() {
    return (
      Math.random() * (canvas.width * 3 - (400 / 720) * canvas.width) +
      (400 / 720) * canvas.width
    );
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
