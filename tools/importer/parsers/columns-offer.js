/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-offer block
 * Source: https://www.business.att.com/
 * Base Block: columns
 * Block Structure: 2-column table, image | eyebrow + heading + body + checklist + CTA
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const img = element.querySelector('.hero-panel-image img, img');
  const eyebrow = element.querySelector('.eyebrow-heading, .reuse-eyebrow');
  const heading = element.querySelector('h1, h2');
  const bodyText = element.querySelector('.type-base');
  const listItems = element.querySelectorAll('.checkmark-list li, ul li');
  const legal = element.querySelector('.type-legal');
  const cta = element.querySelector('.cta-container a');

  const imgCol = document.createElement('div');
  if (img) imgCol.appendChild(img.cloneNode(true));

  const textCol = document.createElement('div');
  if (eyebrow && eyebrow.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = eyebrow.textContent.trim();
    textCol.appendChild(p);
  }
  if (heading) {
    const h = document.createElement('h2');
    h.innerHTML = `<strong>${heading.textContent.trim()}</strong>`;
    textCol.appendChild(h);
  }
  if (bodyText && bodyText.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = bodyText.textContent.trim();
    textCol.appendChild(p);
  }
  if (listItems.length) {
    const ul = document.createElement('ul');
    listItems.forEach(li => {
      const newLi = document.createElement('li');
      newLi.textContent = li.textContent.trim();
      ul.appendChild(newLi);
    });
    textCol.appendChild(ul);
  }
  if (legal && legal.textContent.trim()) {
    const p = document.createElement('p');
    p.textContent = legal.textContent.trim();
    textCol.appendChild(p);
  }
  if (cta) {
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    const strong = document.createElement('strong');
    strong.appendChild(a);
    const p = document.createElement('p');
    p.appendChild(strong);
    textCol.appendChild(p);
  }

  const cells = [[imgCol, textCol]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Offer', cells });
  element.replaceWith(block);
}
