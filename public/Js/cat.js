document.addEventListener('DOMContentLoaded', async function () {
    const booksContainer = document.getElementById('books-container');

    try {
        const response = await fetch('http://localhost:3000/api/books');
        const books = await response.json();

        if (response.ok) {
            booksContainer.innerHTML = books.map(book => `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${book.Imagen}" class="card-img-top" alt="${book.Titulo}">
                        <div class="card-body">
                            <h5 class="card-title">${book.Titulo}</h5>
                            <p class="card-text">${book.Descripcion}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <small class="text-muted">Precio: $${book.Precio}</small>
                                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="addToCart(${book.ID})">Agregar al carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            booksContainer.innerHTML = `<div class="alert alert-danger">Error al obtener los libros</div>`;
        }
    } catch (error) {
        booksContainer.innerHTML = `<div class="alert alert-danger">Error al obtener los libros</div>`;
    }
});

async function addToCart(libroID) {
    const usuarioID = 1; // Reemplaza con el ID real del usuario
    const cantidad = 1; // Ajusta según lo necesario

    try {
        const response = await fetch('http://localhost:3000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuarioID, libroID, cantidad }),
        });

        if (response.ok) {
            alert('Libro agregado al carrito');
        } else {
            alert('Error al agregar el libro al carrito');
        }
    } catch (error) {
        alert('Error al agregar el libro al carrito');
    }
}

//localizar el usuario
document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    const cartLink = document.getElementById('cart-link');
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("Usuario recuperado en index.html:", user);

    if (user) {
      loginLink.href = 'Miperfil.html';
      loginLink.innerHTML = `<i class="fas fa-user"></i> Mi Perfil`;
    } else {
      cartLink.href = 'login.html';
    }
  });
