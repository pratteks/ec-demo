/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner block
 * Source: https://www.business.att.com/
 * Base Block: hero
 * Block Structure: Row 1 = background image, Row 2 = eyebrow + heading + body
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img');
  const heading = element.querySelector('h1, h2');
  const eyebrow = element.querySelector('.eyebrow-heading, .reuse-eyebrow');
  const body = element.querySelector('.type-base, .price-comp + div + div + div p');
  const paragraphs = element.querySelectorAll('.max-width-595 p, .max-width-595 .type-base');

  const cells = [];
  if (bgImg) {
    cells.push([bgImg.cloneNode(true)]);
  }

  const contentCell = document.createElement('div');
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = eyebrow.textContent.trim();
    contentCell.appendChild(p);
  }
  if (heading) {
    const h = document.createElement('h1');
    h.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;
    contentCell.appendChild(h);
  }
  paragraphs.forEach(p => {
    if (p.textContent.trim() && !p.closest('.eyebrow-heading')) {
      const para = document.createElement('p');
      para.textContent = p.textContent.trim();
      contentCell.appendChild(para);
    }
  });

  const ctas = element.querySelectorAll('.cta-container a');
  ctas.forEach(cta => {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    contentCell.appendChild(strong);
  });

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Banner', cells });
  element.replaceWith(block);
}
