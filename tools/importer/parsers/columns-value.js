/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-value block
 * Source: https://www.business.att.com/
 * Base Block: columns
 * Block Structure: 4-column table with icon + heading + body + link per column
 * Generated: 2026-02-11
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll('.cta-item, .multi-cta-item');
  const row = [];

  items.forEach(item => {
    const icon = item.querySelector('img');
    const heading = item.querySelector('h3, h4, .heading, .type-base-bold');
    const body = item.querySelector('.type-base, .description, p');
    const link = item.querySelector('a');

    const col = document.createElement('div');
    if (icon) {
      const p = document.createElement('p');
      p.appendChild(icon.cloneNode(true));
      col.appendChild(p);
    }
    if (heading) {
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(strong);
      col.appendChild(p);
    }
    if (body && body.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = body.textContent.trim();
      col.appendChild(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim();
      const p = document.createElement('p');
      p.appendChild(a);
      col.appendChild(p);
    }

    row.push(col);
  });

  const cells = [row];
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Value', cells });
  element.replaceWith(block);
}
