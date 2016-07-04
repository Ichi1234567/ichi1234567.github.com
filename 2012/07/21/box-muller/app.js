require.config({
  "baseUrl": "http://ichi1234567.github.com/rnds/javascript",
  "paths": {
    "jq-rnds": "http://ichi1234567.github.com/rnds/javascript/jq-rnds",
    "rnd": "http://ichi1234567.github.com/rnds/javascript/rnd",
    "display": "http://ichi1234567.github.com/rnds/javascript/display"
  }
});

define([
  "jq-rnds"
  ], function() {
    setTimeout(function() {
      $("#line-g").rndD3({
          "mode": "rand_mm"
      });
    }, 1000);
});
