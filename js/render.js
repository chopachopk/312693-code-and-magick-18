'use strict';
(function () {
  var NUMBER_OF_WIZARDS = 4;

  var wizardTemplate = document.querySelector('#similar-wizard-template');

  var renderWizard = function (wizard) {
    var element = wizardTemplate.content.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;

    return element;
  };

  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  window.render = function (data) {
    var takeNumber = data.length > NUMBER_OF_WIZARDS ? NUMBER_OF_WIZARDS : data.length;
    var fragment = document.createDocumentFragment();
    similarList.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };
})();
