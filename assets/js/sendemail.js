const CLIENT_ID = '870386663742-fg3r73kr60jl45bbu9uq63a4l2u2r3rm.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCQzX_t4TnHxByowHej10k3V2WNKcXRDJk';

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
const SCOPES = 'https://www.googleapis.com/auth/gmail.send';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Handle the initial sign-in state.
        console.log("good")
    }, function(error) {
        console.log("error")
        console.log(JSON.stringify(error, null, 2));
    });
}

function sendEmail() {
    var to = document.getElementById('to').value;
    var subject = document.getElementById('subject').value;
    var body = document.getElementById('body').value;
    var email = `
To: ${to}
Subject: ${subject}

${body}`;

    var base64EncodedEmail = btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_');
    gapi.client.gmail.users.messages.send({
        'userId': 'me',
        'resource': {
            'raw': base64EncodedEmail
        }
    }).then(function(response) {
        console.log('Email sent', response);
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}
