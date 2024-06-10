$(document).ready(function () {
    // Obtener y mostrar las ventas del libro al cargar la página
    const libroId = 1; // ID del libro del que se quieren mostrar las ventas
    fetchSales(libroId);
});

// Función para obtener y mostrar las ventas del libro
function fetchSales(libroId) {
    $.get(`http://localhost:3000/api/ventas/libro/${libroId}`)
        .done(function (ventas) {
            $('#ventas-list').empty(); // Limpiar la lista antes de volver a mostrar las ventas
            ventas.forEach(function (venta) {
                $('#ventas-list').append(`
                    <tr>
                        <td>${venta.VentaID}</td>
                        <td>${venta.LibroID}</td>
                        <td>${venta.Cantidad}</td>
                        <td>${venta.Precio}</td>
                    </tr>
                `);
            });
        })
        .fail(function (error) {
            console.error('Error al obtener las ventas del libro:', error);
        });
}

  
