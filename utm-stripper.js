/**
 * This script removes UTM parameters from the URL after a short delay (100ms).
 * It ensures that UTM parameters are stripped from the URL without interfering with 
 * the Umami analytics tracking that relies on them. The URL in the browser's address 
 * bar is updated using `history.replaceState()` to remove the UTM parameters, while 
 * preserving the page's path, any non-UTM query parameters, and the hash fragment (e.g. #section-1).
 * 
 * This helps maintain clean URLs in the browser while ensuring that analytics 
 * tracking (such as Umami) still works properly by capturing UTM parameters before they are removed.
 * 
 * The function executes only if the browser supports `history.replaceState` and if the 
 * current URL contains query parameters.
 * 
 * @function
 */

// Javascript Immediately Invoked Function Expression (IIFE)
// We set a brief timeout (async, non-blocking) to give umami time to read the UTM parameters 
setTimeout(function() {
    (function() {
        // Feature check: if none of these features are supported, exit immediately.
        // This script depends on features that are IE8+
        if (!window.history || !window.history.replaceState || !window.location.search) return;
        
        // Search for UTM tags and remove them if present
        var params = window.location.search.slice(1).split('&');
        var newParams = params.filter(param => param.substring(0, 4) !== 'utm_');

        // If any UTM tags were removed, we use the window.history API to replace them
        // without triggering a page reload.s
        if (newParams.length < params.length) {
            var search = newParams.length ? '?' + newParams.join('&') : '';
            var url = window.location.pathname + search + window.location.hash;
            window.history.replaceState(null, '', url);
        }
    })();
}, 100);  