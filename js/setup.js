'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var SETUP_TOP = '80px';
  var SETUP_LEFT = '50%';
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;

  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    setup.style.top = SETUP_TOP;
    setup.style.left = SETUP_LEFT;
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var setupWizard = setup.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');

  wizardCoat.addEventListener('click', function () {
    setup.querySelector('input[name="coat-color"]').value = wizardCoat.style.fill = COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)];
  });

  wizardEyes.addEventListener('click', function () {
    setup.querySelector('input[name="eyes-color"]').value = wizardEyes.style.fill = EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)];
  });

  wizardFireball.addEventListener('click', function () {
    setup.querySelector('input[name="fireball-color"]').value = wizardFireball.style.background = FIREBALL_COLORS[getRandomInt(0, FIREBALL_COLORS.length - 1)];
  });

  var similarListElement = setup.querySelector('.setup-similar-list');

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var wizards = [];

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var makeRandomWizards = function () {
    for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
      wizards[i] = {
        name: WIZARD_NAMES[getRandomInt(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInt(0, WIZARD_SURNAMES.length - 1)],
        coatColor: COAT_COLORS[getRandomInt(0, COAT_COLORS.length - 1)],
        eyesColor: EYE_COLORS[getRandomInt(0, EYE_COLORS.length - 1)]
      };
    }
  };

  makeRandomWizards();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');
})();
