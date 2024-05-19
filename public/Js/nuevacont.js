document.getElementById('requestResetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;

    // Simulación de envío de correo
    console.log("Enviando código a:", email);
    document.getElementById('resetMessage').innerHTML = 'Código enviado. Por favor, revisa tu correo.';
    document.getElementById('resetPasswordContainer').style.display = 'block'; // Mostrar el segundo formulario
  });

  document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const code = document.getElementById('verificationCode').value;
    const newPassword = document.getElementById('newPassword').value;

    // Simulación de verificación de código y cambio de contraseña
    console.log("Verificando código y cambiando contraseña:", code, newPassword);
    document.getElementById('resetPasswordMessage').innerHTML = 'Contraseña actualizada correctamente.';
  });