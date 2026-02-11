/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-industry block
 * Source: https://www.business.att.com/
 * Base Block: cards
 * Block Structure: 2-column table, image | heading + description per row
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.story-stack-item, .swiper-slide');
  const cells = [];

  items.forEach(item => {
    const img = item.querySelector('.story-img img, img');
    const heading = item.querySelector('h3, h4, .heading');
    const body = item.querySelector('.type-base, .description, p');

    const imgCell = document.createElement('div');
    if (img) imgCell.appendChild(img.cloneNode(true));

    const textCell = document.createElement('div');
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

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Industry', cells });
  element.replaceWith(block);
}
