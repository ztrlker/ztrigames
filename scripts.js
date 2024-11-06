let cart = [];
let cartTotal = 0;

function addToCart(product, price) {
    cart.push({ product, price });
    cartTotal += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.product} - S/ ${item.price}`;
        cartItems.appendChild(listItem);
    });

    cartTotalElement.textContent = cartTotal;
    document.querySelector("a[href='#carrito']").textContent = `Carrito (${cart.length})`;
}

function checkout() {
    alert(`Total de la compra: S/ ${cartTotal}. Gracias por comprar en Ztrigames.`);
    cart = [];
    cartTotal = 0;
    updateCart();
}

function filterProducts() {
    const filtroCategoria = document.getElementById('filtroCategoria').value;
    const filtroPrecio = document.getElementById('filtroPrecio').value;
    const productos = document.querySelectorAll('.lista-productos .producto');

    productos.forEach((producto) => {
        const categoria = producto.getAttribute('data-categoria');
        const precio = parseInt(producto.getAttribute('data-precio'));

        let mostrar = true;

        if (filtroCategoria !== 'todos' && categoria !== filtroCategoria) {
            mostrar = false;
        }

        if (filtroPrecio !== 'todos') {
            if (filtroPrecio === 'menos-100' && precio >= 100) mostrar = false;
            if (filtroPrecio === '100-200' && (precio < 100 || precio > 200)) mostrar = false;
            if (filtroPrecio === 'mas-200' && precio <= 200) mostrar = false;
        }

        producto.style.display = mostrar ? 'block' : 'none';
    });
}

function calcularTotal() {
    const filas = document.querySelectorAll('#carrito-items tr');
    let total = 0;
    filas.forEach(fila => {
        const precio = parseFloat(fila.cells[1].textContent.replace('S/ ', ''));
        const cantidad = parseInt(fila.querySelector('input[type="number"]').value);
        const subtotal = precio * cantidad;
        fila.cells[3].textContent = 'S/ ' + subtotal.toFixed(2);
        total += subtotal;
    });
    document.getElementById('total').textContent = 'S/ ' + total.toFixed(2);
}

function eliminarProducto(button) {
    const row = button.closest('tr');
    row.remove();
    calcularTotal();
}

function procederPago() {
    alert("Redirigiendo al pago...");
    // Aquí puedes redirigir al usuario a la página de pago o agregar funcionalidad adicional
}
