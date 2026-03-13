// 🌑 Dark Mode Enforcer
// Description: Forces a dark theme on any website using CSS filters.
(function() {
  const style = document.createElement('style');
  style.id = 'dark-mode-enforcer';
  style.innerHTML = `
    html { filter: invert(1) hue-rotate(180deg) !important; }
    img, video, canvas, iframe, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
  `;
  if (document.getElementById('dark-mode-enforcer')) {
    document.getElementById('dark-mode-enforcer').remove();
    console.log('Dark Mode disabled.');
  } else {
    document.head.appendChild(style);
    console.log('Dark Mode enabled! 🌑');
  }
})();
