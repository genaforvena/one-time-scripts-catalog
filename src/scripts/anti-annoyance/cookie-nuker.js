// 🍪 Cookie Banner Nuker
// Description: Removes most common cookie consent popups and restores scrolling.
(function() {
  const selectors = [
    '[class*="cookie"]', '[id*="cookie"]', 
    '[class*="consent"]', '[id*="consent"]',
    '[class*="banner"]', '[id*="banner"]',
    '.qc-cmp2-container', '#onetrust-consent-sdk'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.innerText.toLowerCase().includes('cookie') || el.innerText.toLowerCase().includes('consent')) {
        el.remove();
      }
    });
  });
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = 'auto';
  console.log('Cookie banners nuked! 🍪💨');
})();
