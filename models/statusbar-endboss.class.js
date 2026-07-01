/**
 * Displays the end boss health bar during the final encounter.
 * @class StatusbarEndboss
 */
class StatusbarEndboss extends Statusbar {
  y = 0;

  static IMAGES = [
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  /**
   * Creates the boss health bar and places it near the right side of the HUD.
   */
  constructor() {
    let chosenImages = StatusbarEndboss.IMAGES;
    super(chosenImages, "endboss");
    this.getDimensions();
  }

  /**
   * Positions the boss bar at its dedicated x-coordinate on the screen.
   */
  getDimensions() {
    super.getDimensions();
    this.x = (490 / 720) * canvas.width;
  }
}
