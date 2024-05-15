
  document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Verificar que todos los campos estén llenos
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      document.getElementById('message').innerHTML = '<div class="alert alert-danger" role="alert">Por favor, completa todos los campos</div>';
      return;
    }

    // Verificar formato de correo electrónico
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('message').innerHTML = '<div class="alert alert-danger" role="alert">Correo electrónico inválido</div>';
      return;
    }

    if (password !== confirmPassword) {
      document.getElementById('message').innerHTML = '<div class="alert alert-danger" role="alert">Las contraseñas no coinciden</div>';
      return;
    }

    // Aquí puedes agregar el código para enviar los datos del formulario a tu backend
    // Por ejemplo, utilizando fetch() o XMLHttpRequest()

    document.getElementById('message').innerHTML = '<div class="alert alert-success" role="alert">¡Registro exitoso!</div>';
    // Aquí podrías redirigir al usuario a otra página, mostrar un mensaje de éxito, etc.
  });

  document.getElementById('btnBackToLogin').addEventListener('click', function() {
    window.location.href = 'login.html';
  });