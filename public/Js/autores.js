$(document).ready(function () {
    $('#search-btn').click(function () {
        $('.btn-outline-success').toggleClass('btn-outline-success btn-success');
    });

    // Función para obtener y mostrar los autores
    function fetchAuthors() {
        $.ajax({
            url: 'http://localhost:3000/api/authors',
            type: 'GET',
            success: function (response) {
                const authorList = $('#author-list');
                authorList.empty();
                response.forEach(author => {
                    authorList.append(`
                        <tr>
                            <td>${author.ID}</td>
                            <td>${author.Nombre}</td>
                            <td>${author.Nacionalidad || 'N/A'}</td>
                            <td>${author.FechaNacimiento || 'N/A'}</td>
                            <td>${author.Biografia || 'N/A'}</td>
                            <td>
                                <button class="btn btn-danger btn-sm delete-author" data-id="${author.ID}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });

                // Agregar manejador de eventos para eliminar autores
                $('.delete-author').click(function () {
                    const authorId = $(this).data('id');
                    deleteAuthor(authorId);
                });
            },
            error: function (error) {
                console.error('Error al obtener los autores', error);
            }
        });
    }

    // Función para eliminar un autor
    function deleteAuthor(id) {
        $.ajax({
            url: `http://localhost:3000/api/authors/${id}`,
            type: 'DELETE',
            success: function (response) {
                fetchAuthors();
            },
            error: function (error) {
                console.error('Error al eliminar el autor', error);
            }
        });
    }

    // Manejar la solicitud de agregar autor
    $('#author-form').submit(function (event) {
        event.preventDefault();

        const authorData = {
            nombre: $('#nombre').val(),
            nacionalidad: $('#nacionalidad').val(),
            fechaNacimiento: $('#fechaNacimiento').val(),
            biografia: $('#biografia').val()
        };

        $.ajax({
            url: 'http://localhost:3000/api/authors',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(authorData),
            success: function (response) {
                $('#author-response').html(`<div class="alert alert-success">${response.message}</div>`);
                $('#author-form')[0].reset();
                fetchAuthors();
            },
            error: function (error) {
                $('#author-response').html(`<div class="alert alert-danger">Error al agregar el autor</div>`);
            }
        });
    });

    // Obtener y mostrar los autores al cargar la página
    fetchAuthors();
});
