// 💖 Like All Instagram Posts
// Description: Likes all visible posts on the current page.
(function() {
  const heartIcons = document.querySelectorAll('span[aria-label="Like"] svg[aria-label="Like"]');
  heartIcons.forEach((icon, index) => {
    setTimeout(() => {
      const button = icon.closest('button');
      if (button) {
        button.click();
        console.log(`Liked post #${index + 1}`);
      }
    }, index * 500); // 500ms delay to avoid rate limiting
  });
  alert(`Attempting to like ${heartIcons.length} posts!`);
})();
