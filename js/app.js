'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const biscuits = document.querySelectorAll('.biscuit');
  const svg = document.querySelector('.shuffleboard');
  const point = svg.createSVGPoint();

  function moveBiscuit(e) {
    point.x = e.clientX;
    point.y = e.clientY;

    const ctm = e.target.getScreenCTM().inverse();
    const {x, y} = point.matrixTransform(ctm);
    e.target.setAttribute('cx', x);
    e.target.setAttribute('cy', y);
  }

  [...biscuits].forEach(biscuit => {
    biscuit.addEventListener('mousedown', function(e) {
      this.addEventListener('mousemove', moveBiscuit);
    });
  });

  document.addEventListener('mouseup', function(e) {
    [...biscuits].forEach(b => b.removeEventListener('mousemove', moveBiscuit))
  });
});
