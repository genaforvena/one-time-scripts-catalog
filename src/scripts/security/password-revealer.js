// 🔓 Password Revealer
// Description: Changes all password input fields to text fields to show hidden passwords.
(function() {
  const passwords = document.querySelectorAll('input[type="password"]');
  passwords.forEach(el => el.type = 'text');
  console.log(`Revealed ${passwords.length} passwords! 🔓`);
})();
