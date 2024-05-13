$(document).ready(function(){
    // AJAX para manejar la redirección al hacer clic en el enlace
    $('a[href="registro.html"]').click(function(e){
        e.preventDefault(); // Previene el comportamiento predeterminado del enlace
        window.location.href = $(this).attr('href'); // Redirige a la página de registro
    });
});

$(document).ready(function(){
    $('#loginForm').submit(function(e) {
        e.preventDefault(); // Evita que se envíe el formulario automáticamente

        // Obtener los valores del formulario
        var username = $('#username').val();
        var password = $('#password').val();

        // Validar el correo electrónico
        if (!validateEmail(username)) {
            showError('Por favor, introduce un correo electrónico válido.');
            return;
        }

        // Validar la contraseña
        if (!password) {
            showError('Por favor, introduce tu contraseña.');
            return;
        }

        // Si todas las validaciones pasan, enviar el formulario
        this.submit();
    });

    // Función para validar el formato de correo electrónico
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    // Función para mostrar mensajes de error con animaciones
    function showError(message) {

    // Remover cualquier mensaje de error existente
    $('.error-message').remove();

    // Crear un elemento div para el mensaje de error
    var errorDiv = $('<div>').addClass('error-message').text(message);

    // Añadir el mensaje de error al formulario
    $('#loginForm').prepend(errorDiv);

    // Cambiar el color del texto a rojo (opcional)
    errorDiv.css('color', 'red');
}

});

