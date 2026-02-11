/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for AT&T Business page cleanup
 * Purpose: Remove non-content elements from AT&T Business pages
 * Applies to: All AT&T Business pages (www.business.att.com)
 * Generated: 2026-02-11
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav',
      '.global-nav',
      '.global-footer',
      '.cookie-consent',
      '.onetrust-consent-sdk',
      '#onetrust-consent-sdk',
      '.chat-widget',
      '.att-chat',
      '#att-chat-wrapper',
      '.skip-nav',
      '.breadcrumb',
      'script',
      'style',
      'noscript',
      '.hidden',
      '[aria-hidden="true"]'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    WebImporter.DOMUtils.remove(element, [
      'iframe',
      'link',
      '.tracking-pixel',
      'img[src*="pixel"]',
      'img[src*="tracking"]'
    ]);
  }
}
