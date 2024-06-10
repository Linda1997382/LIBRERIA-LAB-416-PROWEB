$(document).ready(function () {
    $('#search-btn').click(function () {
        $('.btn-outline-success').toggleClass('btn-outline-success btn-success');
    });

    // Función para obtener y mostrar las categorías
    function fetchCategories() {
        $.ajax({
            url: 'http://localhost:3000/api/categories',
            type: 'GET',
            success: function (categories) {
                const categoryList = $('#category-list');
                categoryList.empty();
                categories.forEach(category => {
                    categoryList.append(`
                        <tr>
                            <td>${category.ID}</td>
                            <td>${category.Nombre}</td>
                            <td>
                                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${category.ID})">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });
            },
            error: function (error) {
                console.error('Error al obtener las categorías', error);
            }
        });
    }

    // Función para eliminar una categoría
    window.deleteCategory = function (id) {
        $.ajax({
            url: `http://localhost:3000/api/categories/${id}`,
            type: 'DELETE',
            success: function (response) {
                fetchCategories();
            },
            error: function (error) {
                console.error('Error al eliminar la categoría', error);
            }
        });
    }

    // Manejar la solicitud de agregar categoría
    $('#category-form').submit(function (event) {
        event.preventDefault();

        const categoryData = {
            nombre: $('#nombre').val()
        };

        $.ajax({
            url: 'http://localhost:3000/api/categories',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(categoryData),
            success: function (response) {
                $('#category-response').html(`<div class="alert alert-success">${response.message}</div>`);
                $('#category-form')[0].reset();
                fetchCategories();
            },
            error: function (error) {
                $('#category-response').html(`<div class="alert alert-danger">Error al agregar la categoría</div>`);
            }
        });
    });

    // Obtener y mostrar las categorías al cargar la página
    fetchCategories();
});