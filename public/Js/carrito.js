document.addEventListener('DOMContentLoaded', async function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const usuarioID = 1; // Reemplaza con el ID real del usuario

    try {
        // Obtener los items del carrito desde el servidor
        const response = await fetch(`http://localhost:3000/api/cart/${usuarioID}`);
        const cartItems = await response.json();

        if (response.ok) {
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<li class="list-group-item">Tu carrito está vacío</li>';
                totalPriceElement.textContent = '$0';
                return;
            }

            let totalPrice = 0;
            cartItemsContainer.innerHTML = '';

            for (const item of cartItems) {
                const bookResponse = await fetch(`http://localhost:3000/api/books/${item.LibroID}`);
                const book = await bookResponse.json();

                if (bookResponse.ok) {
                    totalPrice += book.Precio * item.Cantidad;
                    cartItemsContainer.innerHTML += `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>${book.Titulo}</h5>
                                <p>${book.Descripcion}</p>
                                <small class="text-muted">Precio: $${book.Precio}</small>
                                <small class="text-muted">Cantidad: ${item.Cantidad}</small>
                            </div>
                            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${usuarioID}, ${book.ID})">Eliminar</button>
                        </li>
                    `;
                }
            }

            // Actualizar el precio total
            totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            cartItemsContainer.innerHTML = '<li class="list-group-item">Error al obtener los detalles del carrito</li>';
        }
    } catch (error) {
        cartItemsContainer.innerHTML = '<li class="list-group-item">Error al obtener los detalles del carrito</li>';
    }
});

async function removeFromCart(usuarioID, libroID) {
    try {
        const response = await fetch(`http://localhost:3000/api/cart/${usuarioID}/${libroID}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Libro eliminado del carrito');
            location.reload();
        } else {
            alert('Error al eliminar el libro del carrito');
        }
    } catch (error) {
        alert('Error al eliminar el libro del carrito');
    }
}

