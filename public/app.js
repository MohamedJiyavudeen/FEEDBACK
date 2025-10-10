document.getElementById('feedbackForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  status.textContent = '';

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const rating = parseInt(document.getElementById('rating').value);
  const message = document.getElementById('message').value.trim();

  if (!rating || !message) {
    status.style.color = 'red';
    status.textContent = '⚠️ Please give rating and message.';
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/feedback',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, rating, message })
    });
    const data = await res.json();
    if (!res.ok) throw data;

    status.style.color = 'green';
    status.textContent = data.message || '✅ Thanks for your feedback!';
    document.getElementById('feedbackForm').reset();
  } catch (err) {
    status.style.color = 'red';
    status.textContent = err.error || '❌ Submit failed';
  }
});
