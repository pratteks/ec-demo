/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-product block
 * Source: https://www.business.att.com/
 * Base Block: hero
 * Block Structure: Row 1 = background image, Row 2 = eyebrow + heading + body + legal + CTAs
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img');
  const heading = element.querySelector('h1, h2');
  const eyebrow = element.querySelector('.eyebrow-heading, .reuse-eyebrow');
  const bodyText = element.querySelector('.type-base');
  const legalText = element.querySelector('.type-legal, .legal-text');

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
    const h = document.createElement('h2');
    h.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;
    contentCell.appendChild(h);
  }
  if (bodyText && bodyText.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = bodyText.textContent.trim();
    contentCell.appendChild(p);
  }
  if (legalText && legalText.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = legalText.textContent.trim();
    contentCell.appendChild(p);
  }

  const ctas = element.querySelectorAll('.cta-container a');
  const ctaP = document.createElement('p');
  ctas.forEach((cta, i) => {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    if (i === 0) {
      const strong = document.createElement('strong');
      strong.appendChild(a);
      ctaP.appendChild(strong);
    } else {
      ctaP.appendChild(document.createTextNode(' '));
      ctaP.appendChild(a);
    }
  });
  if (ctaP.childNodes.length) contentCell.appendChild(ctaP);

  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Product', cells });
  element.replaceWith(block);
}
