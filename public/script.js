document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email');
  const popup = document.getElementById('popup-message');
  const popupText = document.getElementById('popup-text');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = emailInput.value.trim();
    if (!email) return;

    try {
      const response = await fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      popup.classList.remove('hidden', 'error');
      popup.classList.add('show');
      popupText.textContent = result.message;

      if (!response.ok) {
        popup.classList.add('error');
      } else {
        emailInput.value = ''; 
        setTimeout(() => {
          popup.classList.remove('show');
    
        }, 1000); 
      }
    } catch (err) {
      popup.classList.remove('hidden');
      popup.classList.add('show', 'error');
      popupText.textContent = '❌ Something went wrong.';
    }
  });
});
