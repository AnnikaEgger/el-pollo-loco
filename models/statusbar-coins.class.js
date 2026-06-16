class StatusbarCoins extends Statusbar {
  y = 130;

  static IMAGE_SETS = {
    blue: [
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
      "../img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
    ],
  };

  constructor(color) {
    let chosenImages = StatusbarCoins.IMAGE_SETS[color];
    super(chosenImages, "coins");
  }
}
