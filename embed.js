// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable common developer tools shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
document.addEventListener('keydown', function(e) {
    // Block F12
    if (e.key === 'F12') {
        e.preventDefault();
    }
    // Block Ctrl+Shift+I (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
    }
    // Block Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'U') {
        e.preventDefault();
    }
});

// Override console.log to prevent logging
(function() {
    var originalConsole = console.log;
    console.log = function() {
        // Fuck you, console loggers
        return;
    };
    // Also disable other console methods for extra fuckery
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
})();

// Detect if DevTools is open and fuck with the user
(function() {
    const devtools = /./;
    devtools.toString = function() {
        // If DevTools is open, mess with the page
        document.body.innerHTML = '<h1>Fuck off, no inspecting allowed!</h1>';
        return '';
    };
    setInterval(() => {
        // Constantly check for DevTools
        console.log(devtools);
    }, 1000);
})();

// Disable copy-paste to screw with source code copying
document.addEventListener('copy', function(e) {
    e.preventDefault();
});

// Block selection of text
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// Redirect or break the page if someone tries to view source
window.addEventListener('DOMContentLoaded', function() {
    // Fuck with view-source attempts
    if (window.location.protocol === 'view-source:') {
        window.location.href = 'about:blank';
    }
});
