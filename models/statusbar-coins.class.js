class StatusbarCoins extends Statusbar {
  y;

  static IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "./assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    let chosenImages = StatusbarCoins.IMAGES;
    super(chosenImages, "coins");
    this.getDimensions();
  }

  getDimensions() {
    super.getDimensions();
    this.y = (100 / 480) * canvas.height;
  }
}
