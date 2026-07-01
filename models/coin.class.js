class Coin extends DrawableObject {
  offsetValue;
  coinValue = 2;
  index;
  maxY;

  COINS = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];

  static collectingSound = new Audio("./assets/audio/coin/collecting.mp3");
  static AUDIOS = [Coin.collectingSound];
  static {
    Coin.collectingSound.volume = 0.25;
  }

  constructor(existingCoins) {
    super();
    this.index = this.getRandomIndex(this.COINS);
    this.setValidXPosition(existingCoins);
    this.getDimensions();
    this.y =
      this.maxY + Math.random() * ((150 / 480) * canvas.height - this.maxY);
    this.loadImage(this.COINS[this.index]);
  }

  getRandomX() {
    return (
      Math.random() * (canvas.width * 4.5 - (250 / 720) * canvas.width) +
      (250 / 720) * canvas.width
    );
  }

  getDimensions() {
    this.maxY = (20 / 480) * canvas.height;
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
  }

  getBigCoin() {
    this.offsetValue = (52 / 720) * canvas.width;
    this.width = (150 / 720) * canvas.width;
    this.height = this.width;
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
