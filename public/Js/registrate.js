document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const messageDiv = document.getElementById('message');
  const btnBackToLogin = document.getElementById('btnBackToLogin');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      showMessage('Las contraseñas no coinciden', 'danger');
      return;
    }

    // Enviar los datos al servidor
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('Registro exitoso', 'success');
        // Redirigir a la página de inicio de sesión después de unos segundos
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 3000);
      } else {
        showMessage(result.message, 'danger');
      }
    } catch (error) {
      showMessage('Error al registrar. Inténtalo de nuevo más tarde.', 'danger');
    }
  });

  btnBackToLogin.addEventListener('click', function () {
    window.location.href = 'login.html';
  });

  function showMessage(message, type) {
    messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }
});