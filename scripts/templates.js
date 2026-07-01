/**
 * Returns the HTML markup for the home screen overlay.
 * @returns {string} The rendered home screen HTML.
 */
function homeScreenHTML() {
  return `  <div
        id="home-screen"
        class="overlay-container home-container"
      >
        <img
          class="overlay-img overlay-img--full"
          src="./assets/img/9_intro_outro_screens/start/startscreen_1.png"
          alt=""
        />

        <nav class="wood-signs-container wood-signs-container--home">
          <ul class="wood-signs-menu wood-signs-menu--home">
           <li>
                <button
            onclick="startGame()"
              class="wood-btn wood-btn--click wood-sign start-btn"
            >
              <p>Play</p>
                <img src="./assets/img/wood-sign.svg" alt="start icon" />
            </button>
            </li>

            <li>
              <button onclick="showInfoScreen('Story')" class="wood-btn wood-btn--click wood-sign">
                <p>Story</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="showInfoScreen('Instructions')"
                class="wood-btn wood-btn--click wood-sign"
              >
                <p>Instructions</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>
          </ul>
        </nav>
      </div>`;
}

/**
 * Returns the HTML markup for the pause menu overlay.
 * @returns {string} The rendered pause menu HTML.
 */
function pauseMenuHTML() {
  return `<div id="pause-overlay" class="pause-menu">
        <nav class="wood-signs-container wood-signs-container--pause">
          <ul class="wood-signs-menu wood-signs-menu--pause">
            <li>
              <button onclick="togglePauseGame()" class="wood-btn wood-btn--click wood-sign">
                <p>Continue</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button onclick="restartGame()" class="wood-btn wood-btn--click wood-sign">
                <p>Restart</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="backToHomeScreen('game')"
                class="wood-btn wood-btn--click wood-sign"
              >
                <p>Home</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="showInfoScreen('Instructions', 'pause menu')"
                class="wood-btn wood-btn--click wood-sign"
              >
                <p>Instructions</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

          </ul>
        </nav>
      </div>`;
}

/**
 * Returns the HTML markup for the end screen overlay.
 * @returns {string} The rendered end screen HTML.
 */
function endScreenHTML() {
  return `     <div
        id="outro-screen"
        class="overlay-container outro-container"
      >
        <img
          id="endscreen-img"
          src=""
          alt="Outro Screen"
          class="overlay-img overlay-img--full"
        />
        <div class="outro-btns-container">
          <button class="wood-btn" wood-btn--click onclick="restartGame()">
            <p>Retry</p>
            <img src="./assets/icons/restart-icon.png" alt="restart icon" />
          </button>
          <button class="wood-btn" wood-btn--click onclick="backToHomeScreen('game')">
            <p>Home</p>
            <img src="./assets/icons/home-icon.png" alt="home icon" />
          </button>
        </div>
      </div>`;
}

/**
 * Wraps arbitrary info-screen content in the shared info container layout.
 * @param {string} innerContent - The HTML content to display inside the container.
 * @returns {string} The complete info screen HTML.
 */
function InfoScreenHTML(innerContent) {
  return `<div id="info-container" class="information-container">${innerContent}</div>`;
}

/**
 * Returns the HTML content for the story information screen.
 * @param {string} headline - The headline text to display.
 * @param {string} origin - The location from which the screen was opened.
 * @returns {string} The story screen HTML.
 */
function storyHTML(headline, origin) {
  return ` <button
 onclick="closeInfoScreen('${origin}')"
  class="wood-btn wood-btn--click close-btn close-btn--info-container"
>
  <img src="./assets/icons/close-icon.png" alt="close icon" />
</button>
<h2 id="infotext-headline">${headline}</h2>

<article id="infotext-container" class="infotext-container infotext-container--story">
   <p>
      ¡Ayuda!<br><br>

      A horde of crazy chickens has taken over the Mexican desert,
      spreading chaos, feathers, and fear everywhere they go.<br><br>

      There is only one man crazy enough to take on an army of
      <b>Pollos Locos</b>...<br><br>

      <b>Pepe Peligroso.</b><br><br>

      He's fearless. He's unstoppable. And they call him Peligroso for a reason.<br><br>

      Armed with nothing but courage, an endless supply of Tabasco
      bottles, and a body built for battle (well... mostly), Pepe is ready
      to fight back.<br><br>

      The chickens chose the wrong desert...<br><br>

      Now step into the shoes of Pepe Peligroso and save the desert from
      the wildest chicken invasion ever seen!
           
          </p>
          </article>`;
}

/**
 * Returns the HTML content for the instructions information screen.
 * @param {string} headline - The headline text to display.
 * @param {string} origin - The location from which the screen was opened.
 * @returns {string} The instructions screen HTML.
 */
function instructionsHTML(headline, origin) {
  return `<button
 onclick="closeInfoScreen('${origin}')"
  class="wood-btn wood-btn--click close-btn close-btn--info-container"
>
  <img src="./assets/icons/close-icon.png" alt="close icon" />
</button>
<h2 id="infotext-headline">${headline}</h2>

<article id="infotext-container" class="infotext-container infotext-container--instructions">

<div class="game-instructions">
    <h3>Goal</h3>
    <p>Defeat the <strong>End Boss</strong>! Collect <strong>Tabasco bottles</strong> along your journey to prepare for the final fight.</p>

    <h3>Controls</h3>
    <ul>
        <li><strong>Desktop:</strong>
            <ul>
                <li><kbd>Left</kbd> / <kbd>Right</kbd> Arrows = Move</li>
                <li><kbd>Space</kbd> = Jump</li>
                <li><kbd>D</kbd> = Throw Tabasco bottle</li>
            </ul>
        </li>
        <li><strong>Mobile:</strong> Use the on-screen buttons.</li>
    </ul>

       <h3>Enemies & Combat</h3>
 <ul>
    <li>
        <strong>Chickens:</strong> Jump on them or throw Tabasco to defeat.
        <ul>
            <li>🐣 <strong>Small Chicken:</strong> Deals 5 damage</li>
            <li>🐔 <strong>Normal Chicken:</strong> Deals 10 damage</li>
            <li>🐔 <strong>Boss Chicken:</strong> Deals 15 damage</li>

        </ul>
    </li>
    <li><strong>Invincibility:</strong> 0.5-seconds invincibility for you and the endboss after a hit.</li>
</ul>

    <h3>Economy & Shopping</h3>
    <p>Collect coins to buy Tabasco bottles:</p>
    <ul>
      <li>💰 <strong>Wallet Capacity:</strong> Maximum 10 Coins</li>
      <li>🌶️ <strong>Tabasco Bottle Cost:</strong> 1 Coin</li>
      <li>🎒 <strong>Bottle Capacity:</strong> Maximum 10</li>
    </ul>
</div>
  `;
}

/**
 * Returns the button bar markup for the home screen.
 * @param {string} muteIconSrc - The image path for the mute button icon.
 * @returns {string} The home screen button HTML.
 */
function homeScreenBtnsHTML(muteIconSrc) {
  return ` <button class="wood-btn wood-btn--click mute-btn" onclick="toggleGameSound()">
          <img id="mute-btn-img" src=${muteIconSrc} />
        </button>
        <div id="imprint-container" class="imprint-container display-flex">
          <button onclick="showInfoScreen('Legal Notice')">
            <p>Legal Notice</p>
          </button>

          <button onclick="showInfoScreen('Privacy Policy')">
            <p>Privacy Policy</p>
          </button>
        </div>
        <button onclick="toggleFullscreen()" class="wood-btn wood-btn--click fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}

/**
 * Returns the button bar markup for the information screens.
 * @param {string} muteIconSrc - The image path for the mute button icon.
 * @returns {string} The info screen button HTML.
 */
function infoScreenBtnsHTML(muteIconSrc) {
  return ` <button class="wood-btn wood-btn--click mute-btn" onclick="toggleGameSound()">
          <img id="mute-btn-img" src=${muteIconSrc} />
        </button>

        <button onclick="toggleFullscreen()" class="wood-btn wood-btn--click fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}

/**
 * Returns the button bar markup for the active gameplay screen.
 * @param {string} muteIconSrc - The image path for the mute button icon.
 * @param {string} pauseIconSrc - The image path for the pause/play button icon.
 * @returns {string} The gameplay button HTML.
 */
function gameScreenBtnsHTML(muteIconSrc, pauseIconSrc) {
  return ` <button class="wood-btn wood-btn--click mute-btn" onclick="toggleGameSound()">
          <img id="mute-btn-img" src=${muteIconSrc} />
        </button>
        <button
          id="pause-btn"
          class="wood-btn wood-btn--click pause-btn"
          onclick="togglePauseGame()"
        >
          <img
            id="pause-btn-img"
            src=${pauseIconSrc}
            alt="Pause Icon"
          />
        </button>
        <button onclick="toggleFullscreen()" class="wood-btn wood-btn--click fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}
