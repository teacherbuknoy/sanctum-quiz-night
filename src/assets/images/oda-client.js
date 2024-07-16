window.history.forward(1);
$('#gender input').click(function () {
  $('#gender input').not(this).prop('checked', false);
});
let settingsGlobal = {};
document.addEventListener('DOMContentLoaded', () => {
  settingsGlobal = revieSettings;
})


$(document).on('click', '.oda-chat-button-close', function () {
  // your function here
  endChat();
});

$(document).on('click', '.js-external-tin-form', () => {
  Bots.sendMessage({
    messagePayload: {
      postback: {
        action: 'ViewFeedbackSurvey',
        'system.state': 'feedback'
      },
      text: 'ViewFeedbackSurvey',
      type: 'postback'
    },
  }, {
    hidden: true,
  })
})

function showFormValues(formObjectList) {
  let formValueText = ``;
  formObjectList.forEach((item, i) => {
    formValueText += `• ${item.label}: ${item.value}${formObjectList.length - 1 > i ? "\n" : ""}`
  })

  return `Details submitted!

${formValueText}`
}

function cancelForm() {
  Bots.sendMessage({
    "messagePayload": {
      "postback": {
        "action": "CancelChat",
        "system.state": "miniThanks"
      },
      "text": "CancelChat",
      "type": "postback"
    }
  }, {
    hidden: true
  });
}

function ecomplaint_validate() {
  var firstname = document.querySelectorAll("[id=\"firstname\"]");
  var lastname = document.querySelectorAll("[id=\"lastname\"]");
  var email = document.querySelectorAll("[id=\"email\"]");
  var mobile = document.querySelectorAll("[id=\"mobile\"]");
  var complaint = document.querySelectorAll("[id=\"complaint\"]");
  Bots.sendMessage({
    "messagePayload": {
      "postback": {
        "variables": {
          "firstname": firstname[firstname.length - 1].value,
          "lastname": lastname[lastname.length - 1].value,
          "email": email[email.length - 1].value,
          "mobile": mobile[mobile.length - 1].value,
          "complaint": complaint[mobile.length - 1].value
        },
        "action": "FormSubmit",
        "system.state": "miniThanks"
      },
      "text": "Details submitted!",
      "type": "postback"
    }
  }, {
    hidden: true
  });
  var firstname = document.getElementById("firstname");
  firstname.disabled = true;
  var lastname = document.getElementById("lastname");
  lastname.disabled = true;
  var email = document.getElementById("email");
  email.disabled = true;
  var mobile = document.getElementById("mobile");
  mobile.disabled = true;
  var complaint = document.getElementById("complaint");
  complaint.disabled = true;
}

function tin_query_validate() {
  var fname = document.querySelectorAll("[id=\"fname\"]");
  var mname = document.querySelectorAll("[id=\"mname\"]");
  var lname = document.querySelectorAll("[id=\"lname\"]");
  var gender = document.querySelectorAll("input[name='gender']:checked");
  var birthdate = document.querySelectorAll("[id=\"birthdate\"]");
  var email = document.querySelectorAll("[id=\"email\"]");
  var mobile = document.querySelectorAll("[id=\"mobile\"]");

  Bots.sendMessage({
    "messagePayload": {
      "postback": {
        "variables": {
          "firstname": fname[fname.length - 1].value,
          "middlename": mname[mname.length - 1].value,
          "lastname": lname[lname.length - 1].value,
          "gender": gender[gender.length - 1].value,
          "birthdate": (birthdate[birthdate.length - 1].value).replace(/(....).(..).(..)/, "$2/$3/$1"),
          "email": email[email.length - 1].value,
          "mobile": mobile[mobile.length - 1].value,
        },
        "action": "FormSubmit",
        "system.state": "miniThanks"
      },
      "text": showFormValues([{
        label: "First Name",
        value: fname[fname.length - 1].value
      },
      {
        label: "Middle Name",
        value: mname[mname.length - 1].value || ""
      },
      {
        label: "Last Name",
        value: lname[lname.length - 1].value
      },
      {
        label: "Sex assigned at birth",
        value: gender[gender.length - 1].value
      },
      {
        label: "Birthdate",
        value: (birthdate[birthdate.length - 1].value).replace(/(....).(..).(..)/, "$2/$3/$1")
      },
      {
        label: "E-mail",
        value: email[email.length - 1].value,
      },
      {
        label: "Mobile Number",
        value: mobile[mobile.length - 1].value,
      },
      ]),
      "type": "postback"
    }
  }, {
    hidden: true
  });
  var fname = document.getElementById("fname");
  fname.disabled = true;
  var mname = document.getElementById("mname");
  mname.disabled = true;
  var lname = document.getElementById("lname");
  lname.disabled = true;
  var birthdate = document.getElementById("birthdate");
  birthdate.disabled = true;
  var email = document.getElementById("email");
  email.disabled = true;
  var mobile = document.getElementById("mobile");
  mobile.disabled = true;
}

function tin_rdo_validate() {
  var tin = document.querySelectorAll("[id=\"tin\"]");
  var fname = document.querySelectorAll("[id=\"fname\"]");
  var mname = document.querySelectorAll("[id=\"mname\"]");
  var lname = document.querySelectorAll("[id=\"lname\"]");
  var gender = document.querySelectorAll("input[name='gender']:checked");
  var birthdate = document.querySelectorAll("[id=\"birthdate\"]");

  Bots.sendMessage({
    "messagePayload": {
      "postback": {
        "variables": {
          "TIN": tin[tin.length - 1].value,
          "firstname": fname[fname.length - 1].value,
          "middlename": mname[mname.length - 1].value,
          "lastname": lname[lname.length - 1].value,
          "gender": gender[gender.length - 1].value,
          "birthdate": (birthdate[birthdate.length - 1].value).replace(/(....).(..).(..)/, "$2/$3/$1")
        },
        "action": "FormSubmit",
        "system.state": "miniThanks"
      },
      "text": "Details submitted!",
      "type": "postback"
    }
  }, {
    hidden: true
  });

  var tin = document.getElementById("tin");
  tin.disabled = true;
  var fname = document.getElementById("fname");
  fname.disabled = true;
  var mname = document.getElementById("mname");
  mname.disabled = true;
  var lname = document.getElementById("lname");
  lname.disabled = true;
  var birthdate = document.getElementById("birthdate");
  birthdate.disabled = true;
}

function data() {
  //Email Validation
  var x = document.birchatdetail.email.value;
  if (x.length == 0) {
    x = "anonoymous@email.com";
  }
  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
    document.getElementById("validatemsg").style.display = "block";
    document.birchatdetail.email.focus();
    document.getElementById("email").value = "";

  } else {
    document.getElementById("validatemsg").style.display = "none";
    var fname = document.querySelectorAll("[id=\"fname\"]");
    var mname = document.querySelectorAll("[id=\"mname\"]");
    var lname = document.querySelectorAll("[id=\"lname\"]");
    var email = document.querySelectorAll("[id=\"email\"]");
    var tin = document.querySelectorAll("[id=\"tin\"]");
    var bcode = document.querySelectorAll("[id=\"bcode\"]");
    var cnumber = document.querySelectorAll("[id=\"cnumber\"]");
    Bots.sendMessage({
      "messagePayload": {
        "postback": {
          "variables": {
            "firstname": fname[fname.length - 1].value,
            "middlename": mname[mname.length - 1].value,
            "lastname": lname[lname.length - 1].value,
            "email": email[email.length - 1].value,
            "TIN": tin[tin.length - 1].value,
            "branchCode": bcode[bcode.length - 1].value,
            "mobile": cnumber[cnumber.length - 1].value,
          },
          "action": "FormSubmit",
          "system.state": "miniThanks"
        },
        "text": "Details submitted!",
        "type": "postback"
      }
    }, {
      hidden: true
    });
    var fname = document.getElementById("fname");
    fname.disabled = true;
    var mname = document.getElementById("mname");
    mname.disabled = true;
    var lname = document.getElementById("lname");
    lname.disabled = true;
    var email = document.getElementById("email");
    email.disabled = true;
  }
  //Email Validation
}

function restartChat() {
  var settings = {
    ...settingsGlobal
  };
  Bots.disconnect();
  Bots.destroy();
  Bots = new WebSDK(settings);
  Bots.setWidth('420px');
  var isHandled = false;
  var message = "First Start";

  Bots.on(WebSDK.EVENT.WIDGET_OPENED, function () {
    if (!isHandled && Bots.isConnected() && !Bots.getConversationHistory().messagesCount) {
      Bots.sendMessage(message, {
        hidden: true
      });
      isHandled = true;
    }
  });

  Bots.on(WebSDK.EVENT.NETWORK, function (state) {
    if (!isHandled && Bots.isConnected() && Bots.isChatOpened() && !Bots.getConversationHistory().messagesCount) {
      Bots.sendMessage(message, {
        hidden: true
      });
      isHandled = true;
    }
  });

  Bots.on(WebSDK.EVENT.CHAT_END, function () {
    isHandled = false;
  });

  Bots.connect();
  Bots.openChat();
}

function endChat() {
  var settings = {
    ...settingsGlobal
  };
  Bots.disconnect();
  Bots.destroy();
  Bots = new WebSDK(settings);
  Bots.setWidth('420px');
  var isHandled = false;
  var message = "First Start";


  Bots.on(WebSDK.EVENT.WIDGET_OPENED, function () {
    if (!isHandled && Bots.isConnected() && !Bots.getConversationHistory().messagesCount) {
      Bots.sendMessage(message, {
        hidden: true
      });
      isHandled = true;
    }
  });

  Bots.on(WebSDK.EVENT.NETWORK, function (state) {
    if (!isHandled && Bots.isConnected() && Bots.isChatOpened() && !Bots.getConversationHistory().messagesCount) {
      Bots.sendMessage(message, {
        hidden: true
      });
      isHandled = true;
    }
  });

  Bots.on(WebSDK.EVENT.CHAT_END, function () {
    isHandled = false;
  });

  Bots.connect();
}

const RECAPTCHA_SELECTOR = '.oda-chat-wrapper .oda-chat-action-postback.oda-chat-action-url'
document.body.addEventListener('click', e => {

  if (e.target.matches('button')) {
    console.log(e.target)
  }

  if (e.target.matches(`${RECAPTCHA_SELECTOR}, ${RECAPTCHA_SELECTOR} *`)) {
    console.log(e.target)
    disableTarget(e.target)
  }
})

function disableTarget(target) {
  let button = target
  if (target.matches(`${RECAPTCHA_SELECTOR} *`)) {
    button = target.closest(RECAPTCHA_SELECTOR)
  }

  button.setAttribute('disabled', '')
}