/**
 * Displays the player's current health value.
 * @class StatusbarHealth
 */
class StatusbarHealth extends Statusbar {
  y = 0;

  static IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  /**
   * Creates the player's health bar using the health-specific sprite set.
   */
  constructor() {
    let chosenImages = StatusbarHealth.IMAGES;
    super(chosenImages, "health");
  }
}
