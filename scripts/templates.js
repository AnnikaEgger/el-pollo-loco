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
              class="wood-btn wood-sign start-btn"
            >
              <p>Play</p>
                <img src="./assets/img/wood-sign.svg" alt="start icon" />
            </button>
            </li>

            <li>
              <button onclick="showInfoScreen('Story')" class="wood-btn wood-sign">
                <p>Story</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="showInfoScreen('Instructions')"
                class="wood-btn wood-sign"
              >
                <p>Instructions</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button onclick="showInfoScreen('Settings')" class="wood-btn wood-sign">
                <p>Settings</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

     
          </ul>
        </nav>
      </div>`;
}

function pauseMenuHTML() {
  return `<div id="pause-overlay" class="pause-menu">
        <nav class="wood-signs-container wood-signs-container--pause">
          <ul class="wood-signs-menu wood-signs-menu--pause">
            <li>
              <button onclick="togglePauseGame()" class="wood-btn wood-sign">
                <p>Continue</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button onclick="restartGame()" class="wood-btn wood-sign">
                <p>Restart</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="backToHomeScreen('game')"
                class="wood-btn wood-sign"
              >
                <p>Home</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="showInfoScreen('Instructions', 'pause menu')"
                class="wood-btn wood-sign"
              >
                <p>Instructions</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>

            <li>
              <button
                onclick="showInfoScreen('Settings', 'pause menu')"
                class="wood-btn wood-sign"
              >
                <p>Settings</p>
                <img src="./assets/img/wood-sign.svg" alt="wooden sign" />
              </button>
            </li>
         
          </ul>
        </nav>


      </div>`;
}

function endScreenHTML() {
  return `     <div
        id="outro-screen"
        class="overlay-container outro-container"
      >
        <img
          id="endscreen-img"
          src=""
          alt="Outro Screen"
          class="outro-screen overlay-img overlay-img--full"
        />
       
        <div class="outro-btns-container">
          <button class="wood-btn" onclick="restartGame()">
            <p>Retry</p>
            <img src="./assets/icons/restart-icon.png" alt="restart icon" />
          </button>
          <button class="wood-btn" onclick="backToHomeScreen('game')">
            <p>Home</p>
            <img src="./assets/icons/home-icon.png" alt="home icon" />
          </button>
        </div>
      </div>`;
}

function InfoScreenHTML(innerContent) {
  return `<div id="info-container" class="information-container">${innerContent}</div>`;
}

function legalNoticeHTML(headline, origin) {
  return `<button
  onclick="closeInfoScreen('${origin}')"
  class="wood-btn close-btn close-btn--info-container"
>
  <img src="./assets/icons/close-icon.png" alt="close icon" />
</button>
<h2 id="infotext-headline" class="infotext-headline--${headline}">${headline}</h2>

<article id="infotext-container" class="infotext-container infotext-container--imprint">

    <p>
        Annika Egger<br />
        Alte Schule 3<br />
        86860 Jengen
    </p>
    <br />
    <br />

    <h3>Contact</h3>
    <br />
    <p>
        Phone: 0177 1401715<br />
        E-Mail: annikaegger83@gmail.com
    </p>
    <br />
    <br />

    <p>Source: <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank">https://www.e-recht24.de/impressum-generator.html</a></p>
    <br />
    <br />
    <br />

    <h3>Credits</h3>
    <br />

    <h4>Sounds</h4>
    <br />
    <ul>
        <li>
            <strong>snoring</strong><br />
            snore.wav by bogenseeberg -- <a href="https://freesound.org/s/587349/" target="_blank">https://freesound.org/s/587349/</a> -- License: Attribution 3.0
        </li>
        <br />
        <li>
            <strong>walking</strong><br />
            running gravel or dry leaves loop.wav by bevangoldswain -- <a href="https://freesound.org/s/54778/" target="_blank">https://freesound.org/s/54778/</a> -- License: Sampling+
        </li>
        <br />
        <li>
            <strong>endboss dying</strong><br />
            pitched Eagle by mokasza -- <a href="https://freesound.org/s/810192/" target="_blank">https://freesound.org/s/810192/</a> -- License: Attribution 4.0
        </li>
        <br />
        <li>
            <strong>endboss rising</strong><br />
            Risers - Horror Whooshes Tension Builder 1.mp3 by original_sound -- <a href="https://freesound.org/s/494981/" target="_blank">https://freesound.org/s/494981/</a> -- License: Attribution 3.0
        </li>
        <br />
        <li>
            <strong>sad trombone</strong><br />
            saddertrombones.mp3 by NotR -- <a href="https://freesound.org/s/172950/" target="_blank">https://freesound.org/s/172950/</a> -- License: Attribution NonCommercial 3.0
        </li>
    </ul>

    screen lock icon
    <a href="https://www.flaticon.com/free-icons/screen-rotate" title="screen rotate icons">Screen rotate icons created by Andrean Prabowo - Flaticon</a>

</article>`;
}

function privacyPolicyHTML(headline, origin) {
  return `   <button
  onclick="closeInfoScreen('${origin}')"
  class="wood-btn close-btn close-btn--info-container">
  <img src="./assets/icons/close-icon.png" alt="close icon" />
</button>
<h2 id="infotext-headline">${headline}</h2>

<article id="infotext-container" class="infotext-container infotext-container--imprint">

    <h3>1. Data Protection at a Glance</h3>
    <br />

    <h4>General Information</h4>
    <br />
    <p>The following information provides a simple overview of what happens to your personal data when you visit this website.<br />
    Personal data is any data that can be used to personally identify you. Detailed information on the subject of data protection can be found in our privacy policy listed below this text.</p>
    <br />
    <br />

    <h4>Data Collection on This Website</h4>
    <br />

    <h5>Who is responsible for data collection on this website?</h5>
    <br />
    <p>Data processing on this website is carried out by the website operator.<br />
    You can find the operator’s contact details in the section “Information on the Controller” in this privacy policy.</p>
    <br />
    <br />

    <h5>How do we collect your data?</h5>
    <br />
    <p>Your data is collected, on the one hand, when you provide it to us. This may include, for example, data that you enter into a contact form.</p>
    <br />
    <p>Other data is collected automatically or, after your consent, by our IT systems when you visit the website.<br />
    This primarily includes technical data (e.g. internet browser, operating system, or time the page was accessed). This data is collected automatically as soon as you enter this website.</p>
    <br />
    <br />

    <h5>What do we use your data for?</h5>
    <br />
    <p>Some of the data is collected to ensure that the website is provided without errors. Other data may be used to analyse your user behaviour.<br />
    If contracts can be concluded or initiated via the website, the transmitted data will also be processed for contract offers, orders, or other customer enquiries.</p>
    <br />
    <br />

    <h5>What rights do you have regarding your data?</h5>
    <br />
    <p>You have the right at any time to obtain free information about the origin, recipients, and purpose of your stored personal data. You also have the right to request the correction or deletion of this data.<br />
    If you have given consent to data processing, you may revoke this consent at any time with effect for the future.<br />
    Furthermore, under certain circumstances, you have the right to request the restriction of the processing of your personal data. You also have the right to lodge a complaint with the competent supervisory authority.</p>
    <br />
    <p>You can contact us at any time regarding this matter or any other questions relating to data protection.</p>
    <br />
    <br />
    <br />

    <h3>2. General Information and Mandatory Information</h3>
    <br />

    <h4>Data Protection</h4>
    <br />
    <p>The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.</p>
    <br />
    <p>When you use this website, various personal data is collected. Personal data is data that can be used to personally identify you.<br />
    This privacy policy explains which data we collect and what we use it for. It also explains how and for what purpose this happens.</p>
    <br />
    <p>Please note that data transmission over the internet (e.g. when communicating by email) may have security vulnerabilities.<br />
    Complete protection of data against access by third parties is not possible.</p>
    <br />
    <br />

    <h4>Information on the Controller</h4>
    <br />
    <p>The controller responsible for data processing on this website is:</p>
    <br />
    <p>
        Annika Egger<br />
        Alte Schule 3<br />
        86860 Jengen
    </p>
    <br />
    <p>
        Phone: 0177 1401715<br />
        Email: annikaegger83@gmail.com
    </p>
    <br />
    <p>The controller is the natural or legal person who alone or jointly with others decides on the purposes and means of processing personal data (e.g. names, email addresses, etc.).</p>
    <br />
    <br />

    <h4>Storage Duration</h4>
    <br />
    <p>Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies.<br />
    If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. retention periods under tax or commercial law); in the latter case, deletion will take place after these reasons cease to apply.</p>
    <br />
    <br />

    <h4>General Information on the Legal Basis for Data Processing on This Website</h4>
    <br />
    <p>If you have given your consent to data processing, we process your personal data on the basis of Art. 6 para. 1 lit. a GDPR or Art. 9 para. 2 lit. a GDPR if special categories of personal data pursuant to Art. 9 para. 1 GDPR are processed.<br />
    In the event of explicit consent to the transfer of personal data to third countries, data processing is also carried out on the basis of Art. 49 para. 1 lit. a GDPR.<br />
    If you have consented to the storage of cookies or access to information on your device (e.g. via device fingerprinting), data processing is additionally carried out on the basis of Section 25 para. 1 TDDDG.<br />
    Consent may be revoked at any time.<br />
    If your data is required for contract fulfilment or for carrying out pre-contractual measures, we process your data on the basis of Art. 6 para. 1 lit. b GDPR.<br />
    Furthermore, we process your data if this is necessary to fulfil a legal obligation on the basis of Art. 6 para. 1 lit. c GDPR.<br />
    Data processing may also be carried out on the basis of our legitimate interest pursuant to Art. 6 para. 1 lit. f GDPR.<br />
    Information on the respective applicable legal bases in each individual case is provided in the following sections of this privacy policy.</p>
    <br />
    <br />

    <h4>Recipients of Personal Data</h4>
    <br />
    <p>As part of our business activities, we cooperate with various external parties. In some cases, it is also necessary to transfer personal data to these external parties.<br />
    We only disclose personal data to external parties if this is necessary for contract fulfilment, if we are legally obliged to do so (e.g. disclosure of data to tax authorities), if we have a legitimate interest pursuant to Art. 6 para. 1 lit. f GDPR in the disclosure, or if another legal basis permits the data transfer.<br />
    When using processors, we only transfer our customers’ personal data on the basis of a valid data processing agreement. In the case of joint processing, a joint processing agreement will be concluded.</p>
    <br />
    <br />

    <h4>Withdrawal of Your Consent to Data Processing</h4>
    <br />
    <p>Many data processing operations are only possible with your express consent. You may withdraw consent that has already been given at any time.<br />
    The lawfulness of data processing carried out until the withdrawal remains unaffected by the withdrawal.</p>
    <br />
    <br />

    <h4>Right to Object to Data Collection in Specific Cases and to Direct Marketing (Art. 21 GDPR)</h4>
    <br />
    <p>IF DATA PROCESSING IS CARRIED OUT ON THE BASIS OF ART. 6 PARA. 1 LIT. E OR F GDPR, YOU HAVE THE RIGHT AT ANY TIME TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA ON GROUNDS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS.<br />
    THE RESPECTIVE LEGAL BASIS ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY.<br />
    IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR AFFECTED PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OVERRIDE YOUR INTERESTS, RIGHTS, AND FREEDOMS, OR THE PROCESSING SERVES THE ESTABLISHMENT, EXERCISE, OR DEFENCE OF LEGAL CLAIMS (OBJECTION PURSUANT TO ART. 21 PARA. 1 GDPR).</p>
    <br />
    <p>IF YOUR PERSONAL DATA IS PROCESSED FOR THE PURPOSE OF DIRECT MARKETING, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF YOUR PERSONAL DATA FOR SUCH MARKETING PURPOSES; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS RELATED TO SUCH DIRECT MARKETING. IF YOU OBJECT, YOUR PERSONAL DATA WILL NO LONGER BE USED FOR THE PURPOSE OF DIRECT MARKETING (OBJECTION PURSUANT TO ART. 21 PARA. 2 GDPR).</p>
    <br />
    <br />

    <h4>Right to Lodge a Complaint with the Competent Supervisory Authority</h4>
    <br />
    <p>In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority, in particular in the Member State of their habitual residence, place of work, or the location of the alleged infringement.<br />
    The right to lodge a complaint exists without prejudice to any other administrative or judicial remedies.</p>
    <br />
    <br />

    <h4>Right to Data Portability</h4>
    <br />
    <p>You have the right to receive data that we process automatically based on your consent or in fulfilment of a contract, either yourself or transferred to a third party, in a common, machine-readable format.<br />
    If you request the direct transfer of the data to another controller, this will only take place insofar as it is technically feasible.</p>
    <br />
    <br />

    <h4>Information, Correction and Deletion</h4>
    <br />
    <p>Within the framework of applicable legal provisions, you have the right at any time to receive free information about your stored personal data, its origin and recipients, and the purpose of the data processing, as well as the right to request correction or deletion of this data, where applicable.<br />
    For this purpose, as well as for any further questions regarding personal data, you can contact us at any time.</p>
    <br />
    <br />

    <h4>Right to Restriction of Processing</h4>
    <br />
    <p>You have the right to request the restriction of the processing of your personal data. You can contact us at any time regarding this matter. The right to restriction of processing applies in the following cases:</p>
    <br />
    <ul>
        <li>If you dispute the accuracy of your personal data stored by us, we generally need time to verify this.<br />For the duration of the verification, you have the right to request the restriction of the processing of your personal data.</li>
        <li>If the processing of your personal data was/is unlawful, you may request restriction of data processing instead of deletion.</li>
        <li>If we no longer need your personal data, but you require it for the exercise, defence, or assertion of legal claims, you have the right to request restriction of the processing of your personal data instead of deletion.</li>
        <li>If you have lodged an objection pursuant to Art. 21 para. 1 GDPR, a balance must be struck between your interests and ours.<br />As long as it has not been determined whose interests prevail, you have the right to request restriction of the processing of your personal data.</li>
    </ul>
    <br />
    <p>If you have restricted the processing of your personal data, such data – apart from storage – may only be processed with your consent or for the establishment, exercise, or defence of legal claims, or for the protection of the rights of another natural or legal person, or for reasons of important public interest of the European Union or a Member State.</p>
    <br />
    <br />

    <p>Source: <a href="https://www.e-recht24.de" target="_blank">https://www.e-recht24.de</a></p>

</article>`;
}

function storyHTML(headline, origin) {
  return ` <button
 onclick="closeInfoScreen('${origin}')"
  class="wood-btn close-btn close-btn--info-container"
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

function instructionsHTML(headline, origin) {
  return `<button
 onclick="closeInfoScreen('${origin}')"
  class="wood-btn close-btn close-btn--info-container"
>
  <img src="./assets/icons/close-icon.png" alt="close icon" />
</button>
<h2 id="infotext-headline">${headline}</h2>

<article id="infotext-container" class="infotext-container infotext-container--instructions">

    <div class="game-instructions">
      <h2>How to Play</h2>
      <p>Use the following keys to control your character:</p>
      
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 12px;">
          <kbd>←</kbd> <kbd>→</kbd> : <strong>Move</strong> (Left / Right)
        </li>
        <li style="margin-bottom: 12px;">
          <kbd>Space</kbd> : <strong>Jump</strong>
        </li>
        <li style="margin-bottom: 12px;">
          <kbd>D</kbd> : <strong>Throw Bottle</strong>
        </li>
      </ul>
      
      <p style="margin-top: 20px; font-style: italic;">
        Good luck! Dodge the obstacles and defeat your enemies.
      </p>
    </div>
    </article>
  `;
}

function homeScreenBtnsHTML(muteIconSrc) {
  return ` <button class="wood-btn mute-btn" onclick="toggleGameSound()">
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
        <button onclick="toggleFullscreen()" class="wood-btn fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}

function infoScreenBtnsHTML(muteIconSrc) {
  return ` <button class="wood-btn mute-btn" onclick="toggleGameSound()">
          <img id="mute-btn-img" src=${muteIconSrc} />
        </button>

        <button onclick="toggleFullscreen()" class="wood-btn fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}

function gameScreenBtnsHTML(muteIconSrc, pauseIconSrc) {
  return ` <button class="wood-btn mute-btn" onclick="toggleGameSound()">
          <img id="mute-btn-img" src=${muteIconSrc} />
        </button>
        <button
          id="pause-btn"
          class="wood-btn pause-btn"
          onclick="togglePauseGame()"
        >
          <img
            id="pause-btn-img"
            src=${pauseIconSrc}
            alt="Pause Icon"
          />
        </button>
        <button onclick="toggleFullscreen()" class="wood-btn fullscreen-btn">
          <img src="./assets/icons/fullscreen-icon.png" alt="Fullscreen Icon" />
        </button>`;
}
