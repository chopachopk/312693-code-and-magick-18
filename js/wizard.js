'use strict';
(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');

  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {}
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  wizardCoat.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    setup.querySelector('input[name="coat-color"]').value = wizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = getRandomElement(EYE_COLORS);
    setup.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  wizardFireball.addEventListener('click', function () {
    setup.querySelector('input[name="fireball-color"]').value = wizardFireball.style.background = getRandomElement(FIREBALL_COLORS);
  });

  window.wizard = wizard;

})();
