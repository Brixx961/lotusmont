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
    showPopup("Subscription successful"); // Global subscribe popup
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
  popup.classList.toggle('error', isError);

  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
    popupText.textContent = '';
  }, 3000);
}

// Separate popup for contact form
function showContactPopup(message, isError = false) {
  const popup = document.getElementById('contact-popup-message');
  const popupText = document.getElementById('contact-popup-text');

  popupText.textContent = message;
  popup.classList.remove('hidden');
  popup.classList.add('show');
  popup.classList.toggle('error', isError);

  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
    popupText.textContent = '';
  }, 3000);
}

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const email = document.getElementById('contact-email').value;
  const message = document.getElementById('contact-message').value;

  try {
    const res = await fetch('/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, email, message }),
    });

    const data = await res.json();
    showContactPopup("Thank you! Your message has been received.");

    document.getElementById('contact-name').value = '';
    document.getElementById('contact-phone').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
  } catch (err) {
    showContactPopup('Something went wrong. Try again later.', true);
  }
});
