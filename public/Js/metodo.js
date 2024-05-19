$(document).ready(function(){
    // Mostrar u ocultar campos según el método de pago seleccionado
    $('#metodoPago').change(function(){
        var metodoSeleccionado = $(this).val();
        if (metodoSeleccionado === 'tarjeta') {
            $('#paypalFields').hide();
            $('#tarjetaFields').show();
        } else if (metodoSeleccionado === 'paypal') {
            $('#paypalFields').show();
            $('#tarjetaFields').hide();
        } else {
            $('#paypalFields').hide();
            $('#tarjetaFields').hide();
        }
    });

    // Manejar el envío del formulario
    $('#compraForm').submit(function(e) {
        e.preventDefault(); // Evitar el envío del formulario para este ejemplo
        // Aquí puedes enviar los datos del formulario a tu servidor o procesarlos según tus necesidades
        console.log('Formulario enviado');
    });
});