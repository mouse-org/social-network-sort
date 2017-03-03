// From: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/btoa#Unicode_Strings

// ucs-2 string to base64 encoded ascii
function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
// Usage:
utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"

utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"
