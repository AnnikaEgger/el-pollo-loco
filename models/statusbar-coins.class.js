class StatusbarCoins extends Statusbar {
  y = (100 / 480) * canvas.height;

  static IMAGES = [
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    let chosenImages = StatusbarCoins.IMAGES;
    super(chosenImages, "coins");
  }
}
