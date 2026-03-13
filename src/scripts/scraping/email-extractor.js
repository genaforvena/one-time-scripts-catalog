// 📧 Email Extractor
// Description: Finds all email addresses on the current page and copies them to the clipboard.
(function() {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = [...new Set(document.body.innerText.match(emailRegex))];
  if (emails.length > 0) {
    const list = emails.join('\n');
    navigator.clipboard.writeText(list).then(() => {
      alert(`Found and copied ${emails.length} emails to clipboard:\n\n${list}`);
    });
  } else {
    alert('No email addresses found on this page.');
  }
})();
