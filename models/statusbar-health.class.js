class StatusbarHealth extends Statusbar {
  y = 0;

  static IMAGE_SETS = {
    blue: [
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
      "../img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
    ],
  };

  constructor(color) {
    let chosenImages = StatusbarHealth.IMAGE_SETS[color];
    super(chosenImages);
  }
}
