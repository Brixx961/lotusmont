document.getElementById('subscribe-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById('email');
  const email = emailInput.value;

  try {
    const res = await fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    showPopup(data.message); // 🎉 show success popup

    // ✅ Clear the input field
    emailInput.value = '';
  } catch (err) {
    showPopup('Something went wrong. Try again later.', true); 
  }
});

function showPopup(message, isError = false) {
  const popup = document.getElementById('popup-message');
  const popupText = document.getElementById('popup-text');

  popupText.textContent = message;
  popup.classList.remove('hidden');
  popup.classList.add('show');

  // Style based on error or success
  popup.classList.toggle('error', isError);

  // Hide after 3 seconds and clear text
  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');

    // ✅ Clear popup text
    popupText.textContent = '';
  }, 3000);
}
