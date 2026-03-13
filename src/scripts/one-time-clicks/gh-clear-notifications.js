// 🗑️ GitHub Notification Cleaner
// Description: Selects and archives/deletes all notifications on the current page.
(function() {
  const selectAll = document.querySelector('input[aria-label="Select all"]');
  if (selectAll) {
    selectAll.click();
    setTimeout(() => {
      const archiveButton = document.querySelector('button[aria-label="Done"], button[title="Done"]');
      if (archiveButton) {
        archiveButton.click();
        console.log('Notifications archived!');
      } else {
        alert('Could not find Archive/Done button.');
      }
    }, 500);
  } else {
    alert('No notifications found or select all checkbox not found.');
  }
})();
