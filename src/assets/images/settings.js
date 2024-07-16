'use strict';

// Set client auth mode - true to enable client auth, false to disable it
var isClientAuthEnabled = false;

let revieSettings = {};

/**
 * Initializes the SDK and sets a global field with passed name for it the can
 * be referred later
 *
 * @param {string} name Name by which the chat widget should be referred
 */
function initSdk(name) {
  window.history.forward(1);
  // Retry initialization later if WebSDK is not available yet
  if (!WebSDK) {
    setTimeout(function () {
      initSdk(name);
    }, 2000);
    return;
  }

  if (!name) {
    name = 'Bots';          // Set default reference name to 'Bots'
  }
  var Bots;

  setTimeout(function () {
    /**
     * SDK configuration settings
     * Other than URI, all fields are optional with two exceptions for auth modes
     * In client auth disabled mode, 'channelId' must be passed, 'userId' is optional
     * In client auth enabled mode, 'clientAuthEnabled: true' must be passed
     */
    var chatWidgetSettings = {
      // DEV
      // URI: 'oda-3f5128a3f9064a8dbf35ab4774427892-da7.data.digitalassistant.oci.oraclecloud.com', // DEV/UAT ODA URI, only the hostname part should be passed, without the https://
      // channelId: '30e8d86b-d2b1-404c-a9b2-b7a7ec941a30',                   // DEV/UAT Channel ID, available in channel settings in ODA UI

      // PROD
      URI: 'oda-b9fbfdc1c08a4780ad36517c171aae76-da7.data.digitalassistant.oci.oraclecloud.com', // PROD ODA URI, only the hostname part should be passed, without the https://
      channelId: 'd6274671-7b3c-4a7c-b398-7563b3f6d8fc',                  // PROD Channel ID, available in channel settings in ODA UI

      clientAuthEnabled: isClientAuthEnabled,     // Enables client auth enabled mode of connection if set true
      enableAutocomplete: true,                   // Enables autocomplete suggestions on user input
      enableBotAudioResponse: true,               // Enables audio utterance of skill responses
      enableClearMessage: false,                   // Enables display of button to clear conversation
      enableEndConversation: true,
      enableHeaderActionCollapse: false,
      enableSpeech: false,                         // Enables voice recognition
      speechLocale: WebSDK.SPEECH_LOCALE.EN_US,   // Sets locale used to speak to the skill, the SDK supports EN_US, FR_FR, and ES_ES locales for speech
      showConnectionStatus: true,                 // Displays current connection status on the header
      shareMenuItems: [{                          // Custom Attachment items
        type: 'jpg png jpeg',
        label: 'Upload Image',
      },],
      i18n: {                                     // Provide translations for the strings used in the widget
        en: {                                   // en locale, can be configured for any locale
          chatTitle: 'Chat with Revie', // Set title at chat header
          share_jpg_png_jpeg: 'Upload Image',
        }
      },
      botButtonIcon: 'https://www.bir.gov.ph/images/bir_images/revie/revie-v2.gif',
      logoIcon: 'https://www.bir.gov.ph/images/bir_images/revie/revie-v2-icon.png',
      botIcon: 'https://www.bir.gov.ph/images/bir_images/revie/revie-v2-icon.png',
      personIcon: 'https://www.bir.gov.ph/images/bir_images/revie/user.png',
      // closeIcon: 'https://birccs.custhelp.com/rnt/rnw/img/enduser/close_chat.png',
      timestampMode: 'relative',                  // Sets the timestamp mode, relative to current time or default (absolute)
      theme: WebSDK.THEME.CLASSIC            // Redwood dark theme. The default is THEME.DEFAULT, while older theme is available as THEME.CLASSIC
    };

    // Language selection
    chatWidgetSettings.multiLangChat = {
      primary: 'en',
      supportedLangs: [
        {
          lang: 'en'
        },
        {
          lang: 'fil',
          label: 'Filipino',
        },
      ],
    }

    revieSettings = chatWidgetSettings;

    // Initialize SDK
    Bots = new WebSDK(chatWidgetSettings);

    var isHandled = false;
    var message = "First Start";

    Bots.setWidth('420px');
    Bots.showTypingIndicator();
    Bots.setFontFamily('"Gill Sans", sans-serif');

    Bots.on(WebSDK.EVENT.WIDGET_OPENED, function () {
      if (!isHandled && Bots.isConnected() && !Bots.getConversationHistory().messagesCount) {
        Bots.sendMessage(message, { hidden: true });
        isHandled = true;
      }
    });

    Bots.on(WebSDK.EVENT.NETWORK, function (state) {
      if (!isHandled && Bots.isConnected() && Bots.isChatOpened() && !Bots.getConversationHistory().messagesCount) {
        Bots.sendMessage(message, { hidden: true });
        isHandled = true;
      }
    });

    Bots.on(WebSDK.EVENT.CHAT_END, function () {
      isHandled = false;
    });

    // Connect to the ODA
    Bots.connect();

    // Create global object to refer Bots
    window[name] = Bots;
  }, 0);
}

/**
 * Function to generate JWT tokens. It returns a Promise to provide tokens.
 * The function is passed to SDK which uses it to fetch token whenever it needs
 * to establish connections to chat server
 *
 * @returns {Promise} Promise to provide a signed JWT token
 */
function generateToken() {
  return new Promise(function (resolve) {
    mockApiCall('https://mockurl').then(function (token) {
      resolve(token);
    });
  });
}

/**
 * A function mocking an endpoint call to backend to provide authentication token
 * The recommended behaviour is fetching the token from backend server
 *
 * @returns {Promise} Promise to provide a signed JWT token
 */
function mockApiCall() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      var now = Math.floor(Date.now() / 1000);
      var payload = {
        iat: now,
        exp: now + 3600,
        channelId: '<channelID>',
        userId: '<userID>'
      };
      var SECRET = '<channel-secret>';

      // An unimplemented function generating signed JWT token with given header, payload, and signature
      var token = generateJWTToken({ alg: 'HS256', typ: 'JWT' }, payload, SECRET);
      resolve(token);
    }, Math.floor(Math.random() * 1000) + 1000);
  });
}

/**
 * Unimplemented function to generate signed JWT token. Should be replaced with
 * actual method to generate the token on the server.
 *
 * @param {object} header
 * @param {object} payload
 * @param {string} signature
 */
function generateJWTToken(header, payload, signature) {
  throw new Error('Method not implemented.');
}
