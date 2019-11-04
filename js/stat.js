'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_CONCAVITY = 5;
  var GAP = 10;
  var FONT_GAP = 20;
  var CHART_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;

  var renderCloud = function (ctx, x, y, color) {
    var midX = x + CLOUD_WIDTH / 2;
    var midY = y + CLOUD_HEIGHT / 2;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(midX, y + CLOUD_CONCAVITY);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + CLOUD_WIDTH - CLOUD_CONCAVITY, midY);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(midX, y + CLOUD_HEIGHT - CLOUD_CONCAVITY);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + CLOUD_CONCAVITY, midY);
    ctx.closePath();
    ctx.fill();
  };

  var getMaxElement = function (arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.textAlign = 'center';
    ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + FONT_GAP * 2);

    ctx.font = '12px PT Mono';
    var chartGap = (CLOUD_WIDTH - names.length * BAR_WIDTH - (names.length - 1) * BAR_GAP) / 2;
    var maxTime = getMaxElement(times);
    for (var i = 0; i < names.length; i++) {
      var barX = CLOUD_X + chartGap + (BAR_GAP + BAR_WIDTH) * i;
      var barHeight = times[i] * CHART_HEIGHT / maxTime;
      ctx.fillStyle = '#000';
      ctx.fillText(Math.round(times[i]), barX + BAR_WIDTH / 2, CLOUD_Y + 220 - barHeight);
      ctx.fillText(names[i], barX + BAR_WIDTH / 2, CLOUD_Y + 240);
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var randomBlueColor = 'hsl(241, ' + getRandomInt(0, 100) + '%, 34%)';
        ctx.fillStyle = randomBlueColor;
      }
      ctx.fillRect(barX, CLOUD_Y + 235, BAR_WIDTH, -barHeight);
    }
  };
})();
