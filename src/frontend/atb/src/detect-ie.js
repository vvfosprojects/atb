const version = detectIE();

if (version) {
    document.getElementById('result').innerHTML = '' +
        '<h1>Per usare l\'applicazione hai bisogno di un browser!</h1>\n' +
        '<h2>Questi sono quelli che raccomandiamo:</h2>\n' +
        '<p>Google Chrome\n' +
        '    <a href="https://www.google.com/intl/en/chrome/browser/" target="_blank" rel="noopener">\n' +
        '        Download\n' +
        '    </a>\n' +
        '</p>\n' +
        '<p>Mozilla Firefox\n' +
        '    <a href="https://www.mozilla.org/firefox/all/" target="_blank" rel="noopener">\n' +
        '        Download\n' +
        '    </a></p>\n' +
        '<p>Opera\n' +
        '    <a href="http://www.opera.com/download/get/" target="_blank" rel="noopener">\n' +
        '        Download\n' +
        '    </a>\n' +
        '</p>';
}

function detectIE() {
    const ua = window.navigator.userAgent;

    const msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
        const rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    const edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return false;
}
