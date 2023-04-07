const openpgp = require('openpgp');

window.chrome.webview.addEventListener("message", function (event) {
    console.log("On message")
});
