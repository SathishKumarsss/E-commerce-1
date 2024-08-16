



document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartCGST = document.getElementById('cart-cgst');
    const cartSGST = document.getElementById('cart-sgst');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartSummary() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        const cgst = subtotal * 0.09;
        const sgst = subtotal * 0.09;
        const total = subtotal + cgst + sgst;

        cartSubtotal.textContent = `${subtotal.toFixed(2)}`;
        cartCGST.textContent = `${cgst.toFixed(2)}`;
        cartSGST.textContent = `$${sgst.toFixed(2)}`;
        cartTotal.textContent = `${total.toFixed(2)}`;
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}" class="cart-item-img"></td>
                <td>${item.name}</td>
                <td>${item.details}</td>
                <td>${item.size}</td>
                <td>${item.price.toFixed(2)}</td>
                <td><input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}"></td>
                <td>${(item.price * 0.09).toFixed(2)}</td>
                <td>${(item.price * 0.09).toFixed(2)}</td>
                <td>${(item.price + item.price * 0.09 * 2).toFixed(2)}</td>
                <td>
                    <div class="cart-btns">
                        <i class="fa-solid fa-shop buy-now-icon" data-index="${index}" aria-hidden="true"></i>
                        <i class="fa fa-trash delete-icon" data-index="${index}" aria-hidden="true"></i>
                    </div>
                </td>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        updateCartSummary();
    }

    cartItemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-icon')) {
            const index = e.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
            showPopup('Product deleted from cart successfully!');
        } else if (e.target.classList.contains('buy-now-icon')) {
            const index = e.target.getAttribute('data-index');
            const item = cart[index];
            updateOrderDetails(item);
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
            showPopup('Product purchased successfully!');
        }
    });

    clearCartBtn.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    });

    placeOrderBtn.addEventListener('click', () => {
        localStorage.setItem('orderDetails', JSON.stringify(cart));
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
        window.location.href = 'your-orders.html';
    });

    function updateOrderDetails(item) {
        let orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
        orderDetails.push(item);
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    }

    renderCartItems();
    updateCartCount();
});

const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
};

// Call the function to update the cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);