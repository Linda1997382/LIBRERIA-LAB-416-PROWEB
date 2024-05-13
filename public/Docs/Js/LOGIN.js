$(document).ready(function(){
    // Manejar clic en el enlace de registro
    $('a[href="registro.html"]').click(function(e){
        e.preventDefault(); // Previene el comportamiento predeterminado del enlace
        window.location.href = $(this).attr('href'); // Redirige a la página de registro
    });

    // Manejar el envío del formulario de usuario
    $('#loginForm').submit(function(e) {
        e.preventDefault(); // Evita que se envíe el formulario automáticamente
        handleFormSubmit($(this), '#username', '#password');
    });

    // Manejar el envío del formulario de administrador
    $('#adminLoginForm').submit(function(e) {
        e.preventDefault(); // Evita que se envíe el formulario automáticamente
        handleFormSubmit($(this), '#adminUsername', '#adminPassword');
    });

    // Función general para manejar el envío de ambos formularios
    function handleFormSubmit(form, usernameSelector, passwordSelector) {
        var username = $(usernameSelector).val();
        var password = $(passwordSelector).val();

        // Validar el correo electrónico
        if (!validateEmail(username)) {
            showError(form, 'Por favor, introduce un correo electrónico válido.');
            return;
        }

        // Validar la contraseña
        if (!password) {
            showError(form, 'Por favor, introduce tu contraseña.');
            return;
        }

        // Si todas las validaciones pasan, enviar el formulario
        form.off('submit').submit(); // Desactivar el manejador de eventos y enviar
    }

    // Función para validar el formato de correo electrónico
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Función para mostrar mensajes de error con animaciones
    function showError(form, message) {
        // Remover cualquier mensaje de error existente
        form.find('.error-message').remove();

        // Crear un elemento div para el mensaje de error
        var errorDiv = $('<div>').addClass('error-message').text(message);

        // Añadir el mensaje de error al formulario
        form.prepend(errorDiv);

        // Cambiar el color del texto a rojo (opcional)
        errorDiv.css('color', 'red');
    }
});
