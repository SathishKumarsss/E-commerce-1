document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.add-to-cart');
    const buyNowButton = document.querySelector('.buy-now');
    const sizeElements = document.querySelectorAll('.diff-size h5');
    let selectedSize = null; // Initially, no size is selected

    // Function to update cart count
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
        document.getElementById('cart-count').textContent = cartCount;
    };

    sizeElements.forEach(size => {
        size.addEventListener('click', () => {
            selectedSize = size.getAttribute('data-size'); // Update selected size
            sizeElements.forEach(el => el.classList.remove('selected'));
            size.classList.add('selected');
        });
    });

    const addToCart = () => {
        if (!selectedSize) {
            showPopup('Please select a size before adding to cart.');
            return;
        }

        // Check if user is logged in
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (!storedUserData) {
            showPopup('Please login or register to add items to your cart.');
            return;
        }

        const productImg = (document.querySelector('#main-img')).src;
        const productInfo = document.querySelector('.product-info');
        const productName = productInfo.getAttribute('data-name');
        const productDetails = document.querySelector('.product-info p').textContent; // Include the <p> text
        const productPrice = parseFloat(productInfo.getAttribute('data-price'));
        const productQuantity = parseInt(document.querySelector('.product-quantity').value);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.name === productName && item.size === selectedSize);

        if (existingProduct) {
            showPopup('Product is already in the cart.');
            return;
        } else {
            cart.push({ name: productName, details: productDetails, price: productPrice, quantity: productQuantity, size: selectedSize, img: productImg });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showPopup('Product added to cart successfully!');
    };

    addToCartButton.addEventListener('click', addToCart);

    buyNowButton.addEventListener('click', () => {
        if (!selectedSize) {
            showPopup('Please select a size before adding to cart.');
            return;
        }

        // Check if user is logged in
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (!storedUserData) {
            showPopup('Please login or register to add items to your cart.');
            return;
        }
        
        
        const productImg = (document.querySelector('#main-img')).src;
        const productInfo = document.querySelector('.product-info');
        const productName = productInfo.getAttribute('data-name');
        const productDetails = document.querySelector('.product-info p').textContent; // Include the <p> text
        const productPrice = parseFloat(productInfo.getAttribute('data-price'));
        const productQuantity = parseInt(document.querySelector('.product-quantity').value);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.name === productName && item.size === selectedSize);

        if (existingProduct) {
            showPopup('Product is already in the cart.');
            return;
        } else {
            cart.push({ name: productName, details: productDetails, price: productPrice, quantity: productQuantity, size: selectedSize, img: productImg });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showPopup('Product added to cart successfully!');

       
        addToCart();
        // Redirect to the checkout page
        window.location.href = 'cart.html';
    });

    updateCartCount();
});

// Function to show popup alert
const showPopup = (message) => {
    const popupContainer = document.getElementById('popup-container');
    const popupMessage = document.getElementById('popup-message');
    const popupOkButton = document.getElementById('popup-ok-button');

    popupMessage.textContent = message;
    popupContainer.style.display = 'flex';

    popupOkButton.addEventListener('click', () => {
        popupContainer.style.display = 'none';
    });
};











function change(swap){
    const temp=document.getElementById('main-img').src;
    document.getElementById('main-img').src=document.getElementById(swap).src;
    document.getElementById(swap).src=temp;
    }

function filterProducts() {
    let input = document.getElementById('product-search').value.toLowerCase();
    let productCards = document.getElementsByClassName('product-card');
    let banner = document.querySelector('.banner-con');
    let anyVisible = false;

    for (let i = 0; i < productCards.length; i++) {
        let title = productCards[i].getElementsByClassName('product-title')[0].innerText.toLowerCase();
        let description = productCards[i].getElementsByClassName('product-description')[0].innerText.toLowerCase();

        if (title.includes(input) || description.includes(input)) {
            productCards[i].classList.remove('hidden');
            anyVisible = true;
        } else {
            productCards[i].classList.add('hidden');
        }
    }

    if (input && !anyVisible) {
        banner.classList.add('hidden');
    } else {
        banner.classList.remove('hidden');
    }
}
document.getElementById('product-search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        filterProducts();
    }
});
