/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo block
 * Source: https://www.business.att.com/
 * Base Block: cards
 * Block Structure: 2-column table, image | eyebrow + heading + body + legal + CTA per row
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.card-item, .card-grid-item');
  const cells = [];

  cards.forEach(card => {
    const img = card.querySelector('img');
    const eyebrow = card.querySelector('.eyebrow, .eyebrow-heading');
    const heading = card.querySelector('h2, h3, .heading');
    const body = card.querySelector('.type-base, .description');
    const legal = card.querySelector('.type-legal');
    const cta = card.querySelector('a.btn-primary, a.btn-secondary, a.att-track');

    const imgCell = document.createElement('div');
    if (img) imgCell.appendChild(img.cloneNode(true));

    const textCell = document.createElement('div');
    if (eyebrow && eyebrow.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = eyebrow.textContent.trim();
      textCell.appendChild(p);
    }
    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(strong);
      textCell.appendChild(p);
    }
    if (body && body.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = body.textContent.trim();
      textCell.appendChild(p);
    }
    if (legal && legal.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = legal.textContent.trim();
      textCell.appendChild(p);
    }
    if (cta) {
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      textCell.appendChild(p);
    }

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Promo', cells });
  element.replaceWith(block);
}
