$(document).ready(function() {
    // Array para almacenar los elementos del carrito
    var cartItems = [];

    // Función para agregar un elemento al carrito
    function addToCart(item) {
        cartItems.push(item);
        updateCart();
    }

    // Función para eliminar un elemento del carrito
    function removeFromCart(index) {
        cartItems.splice(index, 1);
        updateCart();
    }

    // Función para actualizar la interfaz del carrito
    function updateCart() {
        var totalPrice = 0;
        var cartList = $('#cart-items');
        cartList.empty();

        // Recorrer todos los elementos del carrito
        cartItems.forEach(function(item, index) {
            var listItem = $('<li>').addClass('list-group-item');
            listItem.text(item.name + ' - $' + item.price);
            var removeBtn = $('<button>').addClass('btn btn-danger btn-sm ms-2');
            removeBtn.html('<i class="fas fa-trash-alt"></i>');
            removeBtn.click(function() {
                removeFromCart(index);
            });
            listItem.append(removeBtn);
            cartList.append(listItem);
            totalPrice += item.price;
        });

        // Actualizar el precio total
        $('#total-price').text('$' + totalPrice.toFixed(2));
    }

    // Evento de clic para agregar elementos al carrito
    $('.add-to-cart').click(function() {
        var itemName = $(this).data('name');
        var itemPrice = parseFloat($(this).data('price'));
        addToCart({ name: itemName, price: itemPrice });
    });
});
