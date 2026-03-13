// 🤝 LinkedIn Auto-Connect
// Description: Clicks all "Connect" buttons in the "People you may know" section.
(function() {
  const connectButtons = Array.from(document.querySelectorAll('button')).filter(btn => btn.innerText.trim() === 'Connect');
  connectButtons.forEach((btn, index) => {
    setTimeout(() => {
      btn.click();
      console.log(`Sent connection request #${index + 1}`);
    }, index * 800);
  });
  alert(`Sending ${connectButtons.length} connection requests...`);
})();
