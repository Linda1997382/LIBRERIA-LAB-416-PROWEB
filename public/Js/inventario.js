// Agregar/editar libros
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
      const link = form.link.value; // Nuevo campo para el enlace

      // Enviar los datos al servidor
      try {
          const response = await fetch('http://localhost:3000/api/books', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ Titulo: titulo, AutorID: autorID, EditorialID: editorialID, Precio: precio, Descripcion: descripcion, CategoriaID: categoriaID, Imagen: imagen, Link: link }), // Incluir el enlace en el cuerpo de la solicitud
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

// Ver lista de libros
document.addEventListener('DOMContentLoaded', async function () {
  const booksDiv = document.getElementById('books');

  try {
      const response = await fetch('http://localhost:3000/api/books');
      const books = await response.json();

      if (response.ok) {
          booksDiv.innerHTML = `
              <div class="table-responsive">
                  <table class="table">
                      <thead>
                          <tr>
                              <th style="background-color: #f8f9fa; font-weight: bold;">ID</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Título</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">AutorID</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">EditorialID</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Precio</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Descripción</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">CategoriaID</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Imagen</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Link</th>
                              <th style="background-color: #f8f9fa; font-weight: bold;">Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${books.map((book, index) => `
                              <tr style="background-color: ${index % 2 === 0 ? '#f2f2f2' : 'transparent'};">
                              <td>${book.ID}</td>
                              <td>${book.Titulo}</td>
                              <td>${book.AutorID}</td>
                              <td>${book.EditorialID}</td>
                              <td>${book.Precio}</td>
                              <td>${book.Descripcion}</td>
                              <td>${book.CategoriaID}</td>
                              <td>${book.Imagen}</td>
                              <td><a href="${book.Link}" target="_blank">${book.Link}</a></td>
                              <td>
                                  <button onclick="deleteBook(${book.ID})" class="btn btn-danger">Eliminar</button>
                              </td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>
          </div>
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

// Función para abrir el modal de edición
function openEditModal() {
  const modal = document.getElementById('editBookModal');
  modal.style.display = 'block';
}

// Función para cargar los datos del libro a editar en el formulario de edición
async function loadBookDataForEdit(bookId) {
  try {
      const response = await fetch(`http://localhost:3000/api/books/${bookId}`);
      if (!response.ok) {
          throw new Error('Error al obtener los datos del libro');
      }
      const bookData = await response.json();
      // Llenar el formulario con los datos del libro obtenidos
      document.getElementById('editTitulo').value = bookData.Titulo;
      document.getElementById('editAutorID').value = bookData.AutorID;
      document.getElementById('editEditorialID').value = bookData.EditorialID;
      document.getElementById('editPrecio').value = bookData.Precio;
      document.getElementById('editDescripcion').value = bookData.Descripcion;
      document.getElementById('editCategoriaID').value = bookData.CategoriaID;
      document.getElementById('editImagen').value = bookData.Imagen;
      document.getElementById('editLink').value = bookData.Link;
  } catch (error) {
      console.error('Error al cargar los datos del libro:', error);
      alert('Error al cargar los datos del libro');
  }
}


// Función para cerrar el modal de edición
function closeEditModal() {
  const modal = document.getElementById('editBookModal');
  modal.style.display = 'none';
}

// Agrega un evento click al botón de cierre del modal de edición
document.getElementById('editModalClose').addEventListener('click', function() {
  closeEditModal();
});

// Agrega un evento submit al formulario de edición para manejar la acción de guardar cambios
document.getElementById('editBookForm').addEventListener('submit', function(event) {
  event.preventDefault();
  // Aquí puedes enviar los datos del formulario a tu servidor para guardar los cambios
});

// Agrega un evento click a los botones "Editar" de cada libro para abrir el modal de edición y cargar los datos del libro correspondiente
document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll('.btn-edit');
  editButtons.forEach(button => {
      button.addEventListener('click', function () {
          const bookId = this.dataset.bookId; // Obtenemos el ID del libro a editar desde el atributo "data-book-id" del botón
          loadBookDataForEdit(bookId); // Cargamos los datos del libro en el formulario de edición
          openEditModal(); // Abrimos el modal de edición
      });
  });
});