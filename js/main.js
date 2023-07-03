window.addEventListener("DOMContentLoaded", () => {
  const tabs = require('./modules/tabs'),
    modal = require('./modules/modal'),
    forms = require('./modules/forms'),
    timer = require('./modules/timer'),
    calc = require('./modules/calc'),
    cards = require('./modules/cards'),
    slider = require('./modules/slider');

  tabs();
  modal();
  forms();
  timer();
  calc();
  cards();
  slider();
});