class StatusbarHealth extends Statusbar {
  y = 0;

  static IMAGES = [
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "../img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    let chosenImages = StatusbarHealth.IMAGES;
    super(chosenImages, "health");
  }
}
