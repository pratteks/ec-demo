/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-simple block
 * Source: https://www.business.att.com/
 * Base Block: hero
 * Block Structure: Row 1 = background image, Row 2 = heading + CTA
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img');
  const heading = element.querySelector('h1, h2');

  const cells = [];
  if (bgImg) {
    cells.push([bgImg.cloneNode(true)]);
  }

  const contentCell = document.createElement('div');
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;
    contentCell.appendChild(h);
  }

  const ctas = element.querySelectorAll('.cta-container a');
  ctas.forEach(cta => {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    const p = document.createElement('p');
    p.appendChild(strong);
    contentCell.appendChild(p);
  });

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Simple', cells });
  element.replaceWith(block);
}
