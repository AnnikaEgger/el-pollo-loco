class StatusbarBottles extends Statusbar {
  y = 65;

  static IMAGE_SETS = {
    blue: [
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
      "../img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
    ],
  };

  constructor(color) {
    let chosenImages = StatusbarBottles.IMAGE_SETS[color];
    super(chosenImages, "bottles");
  }
}
