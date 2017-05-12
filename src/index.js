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
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.on('pan', moveBiscuit);
  });

  resetButton.addEventListener('click', () => {
    [...biscuits].forEach((b, i) => {
      b.setAttribute('cx', 100 * i + 100);
      b.setAttribute('cy', 1400);
    });
  })

  window.addEventListener('resize', () => {
    ctm = svg.getScreenCTM().inverse();
  });
});
