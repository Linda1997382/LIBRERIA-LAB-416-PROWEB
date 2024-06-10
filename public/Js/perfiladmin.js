document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');
    
    if (logoutButton) {
      logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('user');
        window.location.href = 'login.html';
      });
    }
  });
  
  document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('updateContactForm');
  const updateMessage = document.getElementById('updateMessage');
  
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      const response = await fetch('http://localhost:3000/api/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name, email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem('user', JSON.stringify(result.user)); // Actualiza los datos del usuario en sessionStorage
        updateMessage.innerHTML = '<div class="alert alert-success" role="alert">Datos actualizados correctamente</div>';
      } else {
        updateMessage.innerHTML = `<div class="alert alert-danger" role="alert">${result.message}</div>`;
      }
    } catch (error) {
      updateMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error al actualizar los datos. Por favor, inténtalo de nuevo más tarde.</div>';
    }
  });
});
