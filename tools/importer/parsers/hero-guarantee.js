/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-guarantee block
 * Source: https://www.business.att.com/
 * Base Block: hero
 * Block Structure: Row 1 = background image, Row 2 = heading + body + checklist + CTAs
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.bg-hero-panel img, .hero-panel-image img');
  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.type-base');
  const listItems = element.querySelectorAll('.checkmark-list li, ul li');

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
  if (bodyText && bodyText.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = bodyText.textContent.trim();
    contentCell.appendChild(p);
  }
  if (listItems.length) {
    const ul = document.createElement('ul');
    listItems.forEach(li => {
      const newLi = document.createElement('li');
      newLi.textContent = li.textContent.trim();
      ul.appendChild(newLi);
    });
    contentCell.appendChild(ul);
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Guarantee', cells });
  element.replaceWith(block);
}
