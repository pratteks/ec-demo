/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-product block
 * Source: https://www.business.att.com/
 * Base Block: cards
 * Block Structure: 2-column table, image | heading + body + price + CTA per row
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const tiles = element.querySelectorAll('.multi-tile-item, .swiper-slide');
  const cells = [];

  tiles.forEach(tile => {
    const img = tile.querySelector('img');
    const heading = tile.querySelector('h3, h4, .heading');
    const body = tile.querySelector('.type-base, .description, p');
    const price = tile.querySelector('.price, .type-base-bold');
    const legal = tile.querySelector('.type-legal');
    const cta = tile.querySelector('a.btn-secondary, a.btn-primary, a.att-track');

    const imgCell = document.createElement('div');
    if (img) imgCell.appendChild(img.cloneNode(true));

    const textCell = document.createElement('div');
    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      textCell.appendChild(strong);
    }
    if (body && body.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = body.textContent.trim();
      textCell.appendChild(p);
    }
    if (price && price.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = price.textContent.trim();
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

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Product', cells });
  element.replaceWith(block);
}
