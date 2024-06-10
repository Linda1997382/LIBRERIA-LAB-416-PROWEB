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

        // Obtener los datos del formulario
        var ventaData = {
            VentaID: 1, // Reemplaza con el ID de la venta si es necesario
            LibroID: 1, // Reemplaza con el ID del libro comprado
            Cantidad: 1, // Reemplaza con la cantidad de libros comprados
            Precio: 10.00 // Reemplaza con el precio del libro
        };

        // Enviar los datos al backend
        $.ajax({
            url: 'http://localhost:3000/api/compra',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(ventaData),
            success: function(response) {
                alert(response.message); // Mostrar mensaje de éxito
                location.reload(); // Recargar la página después de registrar la venta
            },
            error: function(error) {
                alert('Error al realizar la compra'); // Mostrar mensaje de error
            }
        });
    });
});
