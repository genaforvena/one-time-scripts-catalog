// 📖 Reading Time Estimator
// Description: Estimates how long it will take to read the current page's content.
(function() {
  const text = document.body.innerText;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / 225); // Average reading speed: 225 wpm
  const div = document.createElement('div');
  div.style.cssText = 'position:fixed; bottom:20px; right:20px; background:rgba(0,0,0,0.8); color:white; padding:10px 15px; border-radius:30px; z-index:99999; font-family:sans-serif; pointer-events:none;';
  div.innerText = `📖 ~${time} min read (${words} words)`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
})();
