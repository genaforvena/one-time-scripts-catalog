// 🎞️ Skip YouTube Ads
// Description: Automatically clicks the "Skip Ad" button on YouTube as soon as it appears.
(function() {
  const skipAds = () => {
    const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-ad-skip-button-slot');
    if (skipBtn) {
      skipBtn.click();
      console.log('YouTube Ad skipped! 🚀');
    }
  };
  setInterval(skipAds, 1000);
  console.log('YouTube Ad Skipper active...');
})();
