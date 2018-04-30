
(function() {

    // ready from http://youmightnotneedjquery.com/#ready
    function ready(fn) {
        if (document.readyState != 'loading'){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    var baseURL = "https://www.jangampe.de/scripts/mathjax/";

    ready(function() {
        var s;

        s = document.createElement("script");
        s.type = "text/javascript";
        s.src = baseURL + "core/MathJax.js";
        s.onload = function() {
            MathJax.Hub.Config({
                config: ["MMLorHTML.js"],
                jax: ["input/TeX","input/MathML","input/AsciiMath","output/HTML-CSS","output/NativeMML", "output/CommonHTML"],
                extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js", "CHTML-preview.js"],
                TeX: {
                    extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js",
                                 "https://www.jangampe.de/scripts/mathjax/extra/xyjax.js",
                                 "enclose.js",
                                 "color.js"]
                },
                "HTML-CSS": {
                    availableFonts: ["STIX","TeX"],
                    preferredFont: "TeX",
                    webFont: "Tex"
                }
            });
        };
        document.head.appendChild(s);
    });

})();
