$(document).ready(function () {
    // Obtener y mostrar las editoriales al cargar la página
    fetchEditorials();

    // Función para agregar una nueva editorial
    $('#editorial-form').submit(function (event) {
        event.preventDefault();

        const editorialData = {
            Nombre: $('#nombre').val(),
            Sede: $('#sede').val(),
            Fundacion: $('#fundacion').val(),
            Descripcion: $('#descripcion').val()
        };

        $.ajax({
            url: 'http://localhost:3000/api/editorials',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(editorialData),
            success: function (response) {
                $('#editorial-response').html(`<div class="alert alert-success">${response.message}</div>`);
                $('#editorial-form')[0].reset();
                fetchEditorials(); // Actualizar la lista de editoriales después de agregar una nueva
            },
            error: function (error) {
                $('#editorial-response').html(`<div class="alert alert-danger">Error al agregar la editorial</div>`);
            }
        });
    });

    // Función para obtener y mostrar las editoriales
    function fetchEditorials() {
        $.get('http://localhost:3000/api/editorials')
            .done(function (editorials) {
                $('#editorial-list').empty(); // Limpiar la lista antes de volver a mostrar las editoriales
                editorials.forEach(function (editorial) {
                    $('#editorial-list').append(`
                        <tr>
                            <td>${editorial.ID}</td>
                            <td>${editorial.Nombre}</td>
                            <td>${editorial.Sede}</td>
                            <td>${editorial.Fundacion}</td>
                            <td>${editorial.Descripcion}</td>
                            <td>
                                <button class="btn btn-danger delete-editorial" data-id="${editorial.ID}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });

                // Agregar el listener para los botones de eliminar
                $('.delete-editorial').click(function () {
                    const editorialId = $(this).data('id');
                    deleteEditorial(editorialId);
                });
            })
            .fail(function (error) {
                console.error('Error al obtener las editoriales:', error);
            });
    }

    // Función para eliminar una editorial
    function deleteEditorial(editorialId) {
        $.ajax({
            url: `http://localhost:3000/api/editorials/${editorialId}`,
            type: 'DELETE',
            success: function (response) {
                fetchEditorials(); // Actualizar la lista después de eliminar
            },
            error: function (error) {
                console.error('Error al eliminar la editorial:', error);
            }
        });
    }
});
