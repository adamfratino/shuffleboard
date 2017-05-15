import Hammer from 'hammerjs';

document.addEventListener('DOMContentLoaded', () => {
  const biscuits = document.querySelectorAll('.biscuit');
  const svg = document.querySelector('.shuffleboard');
  const resetButton = document.querySelector('.reset-button');
  const point = svg.createSVGPoint();
  let ctm = svg.getScreenCTM().inverse();

  function moveBiscuit(e) {
    point.x = e.center.x;
    point.y = e.center.y;

    const {x, y} = point.matrixTransform(ctm);
    e.target.setAttribute('cx', x);
    e.target.setAttribute('cy', y);
  }

  [...biscuits].forEach(biscuit => {
    const hammer = new Hammer(biscuit);
    hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
    hammer.on('pan', moveBiscuit);
  });

  function setBiscuits() {
    const svgWidth = svg.viewBox.baseVal.width;

    [...biscuits].forEach((b, i, arr) => {
      const radius = parseInt(b.getAttribute('r'), 10);
      const paddedDiam = radius * 2 + 20;
      const half = arr.length / 2;

      if (i < half) {
        b.setAttribute('cx', paddedDiam * i);
      } else {
        b.setAttribute('cx', svgWidth - (i - half) * paddedDiam);
      }

      b.setAttribute('cy', 1800);
    });
  }

  setBiscuits();

  resetButton.addEventListener('click', setBiscuits);

  window.addEventListener('resize', () => {
    ctm = svg.getScreenCTM().inverse();
  });
});
