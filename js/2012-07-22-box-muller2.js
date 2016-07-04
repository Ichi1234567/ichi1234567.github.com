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
    $("#box-muller2").rndD3({
      "mode": "rand_boxmuller"
    });
    $("#rnd-cos").rndD3({
      "mode": "rand_cos2"
    });
    $("#2x-y").rndD3({
      "mode": "rand_line"
    });
  }, 1000);
});
