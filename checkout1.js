
  const form = document.getElementById('gform');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent default form submit
    
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // since Google Apps Script doesn't send CORS headers by default
    }).then(() => {
      alert('Your order is successful!');
      form.reset();
    }).catch(() => {
      alert('Something went wrong. Please try again.');
    });
  });

