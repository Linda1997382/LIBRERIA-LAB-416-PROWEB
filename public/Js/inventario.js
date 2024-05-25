        //agregar/editar libros
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('bookForm');
            const messageDiv = document.getElementById('message');
      
            form.addEventListener('submit', async function (event) {
              event.preventDefault();
      
              const titulo = form.titulo.value;
              const autorID = form.autorID.value;
              const editorialID = form.editorialID.value;
              const precio = form.precio.value;
              const descripcion = form.descripcion.value;
              const categoriaID = form.categoriaID.value;
              const imagen = form.imagen.value;
      
              // Enviar los datos al servidor
              try {
                const response = await fetch('http://localhost:3000/api/books', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ Titulo: titulo, AutorID: autorID, EditorialID: editorialID, Precio: precio, Descripcion: descripcion, CategoriaID: categoriaID, Imagen: imagen }),
                });
      
                const result = await response.json();
      
                if (response.ok) {
                  showMessage('Libro guardado exitosamente', 'success');
                  form.reset();
                } else {
                  showMessage(result.message, 'danger');
                }
              } catch (error) {
                showMessage('Error al guardar el libro. Inténtalo de nuevo más tarde.', 'danger');
              }
            });
      
            function showMessage(message, type) {
              messageDiv.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
            }
          });
      
          //ver lista de libros
          document.addEventListener('DOMContentLoaded', async function () {
            const booksDiv = document.getElementById('books');
      
            try {
              const response = await fetch('http://localhost:3000/api/books');
              const books = await response.json();
      
              if (response.ok) {
                booksDiv.innerHTML = `
                  <table class="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>AutorID</th>
                        <th>EditorialID</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>CategoriaID</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${books.map(book => `
                        <tr>
                          <td>${book.ID}</td>
                          <td>${book.Titulo}</td>
                          <td>${book.AutorID}</td>
                          <td>${book.EditorialID}</td>
                          <td>${book.Precio}</td>
                          <td>${book.Descripcion}</td>
                          <td>${book.CategoriaID}</td>
                          <td>${book.Imagen}</td>
                          <td>
                            <button onclick="deleteBook(${book.ID})" class="btn btn-danger">Eliminar</button>
                            <button onclick="editBook(${book.ID})" class="btn btn-warning">Editar</button>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                `;
              } else {
                booksDiv.innerHTML = `<div class="alert alert-danger">Error al obtener los libros</div>`;
              }
            } catch (error) {
              booksDiv.innerHTML = `<div class="alert alert-danger">Error al obtener los libros</div>`;
            }
          });
      
          async function deleteBook(id) {
            try {
              const response = await fetch(`http://localhost:3000/api/books/${id}`, {
                method: 'DELETE'
              });
              if (response.ok) {
                alert('Libro eliminado');
                location.reload();
              } else {
                alert('Error al eliminar el libro');
              }
            } catch (error) {
              alert('Error al eliminar el libro');
            }
          }
          async function editBook(id) {
        try {
          console.log(id)
          // Obtener el libro a editar del servidor
          const response = await fetch(`http://localhost:3000/api/books/${id}`);
          
          if (response.ok) {
            const book = await response.json();
            
            // Llenar un formulario de edición con los datos del libro
            const editForm = document.getElementById('editBookForm');
            editForm.titulo.value = book.Titulo;
            editForm.autorID.value = book.AutorID;
            editForm.editorialID.value = book.EditorialID;
            editForm.precio.value = book.Precio;
            editForm.descripcion.value = book.Descripcion;
            editForm.categoriaID.value = book.CategoriaID;
            editForm.imagen.value = book.Imagen;
            
            
            // Mostrar el formulario de edición
            document.getElementById('editBookModal').style.display = 'block';
          } else {
            // Manejar errores si la solicitud no es exitosa
            throw new Error('Error al obtener el libro para editar');
          }
        } catch (error) {
          // Manejar errores de red u otros errores
          console.error('Error al obtener el libro para editar:', error);
          alert('Error al obtener el libro para editar');
        }
      }
      // Función para cerrar el modal de edición de libro
      function closeEditModal() {
        document.getElementById('editBookModal').style.display = 'none';
      }
      
      