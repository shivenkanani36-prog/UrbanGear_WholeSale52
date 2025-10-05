document.addEventListener('DOMContentLoaded', () => {

    // Get cart from localStorage or initialize empty
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if(cartCount) cartCount.innerText = cart.length;
    }

    updateCartCount();

    // Add item to cart
    window.addToCart = function(name, price) {
        cart.push({name, price});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(name + " added to cart!");
    }

    // Remove item from cart
    window.removeFromCart = function(index) {
        cart.splice(index,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        location.reload();
    }

    // Cart page
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    if(cartItemsDiv && totalDiv) {
        let total = 0;
        if(cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            totalDiv.innerHTML = "";
        } else {
            cart.forEach((item,index)=>{
                cartItemsDiv.innerHTML += `<p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button></p>`;
                total += item.price;
            });
            totalDiv.innerHTML = "Total: ₹" + total;
        }
    }

    // Checkout page
    const checkoutForm = document.getElementById('checkout-form');
    if(checkoutForm) {
        checkoutForm.addEventListener('submit', function(e){
            e.preventDefault();
            alert("Order placed successfully!");
            localStorage.removeItem('cart');
            updateCartCount();
            document.getElementById('order-success').style.display = "block";
        });
    }

    // Search function
    const searchInput = document.getElementById('search-bar');
    if(searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            const products = document.querySelectorAll('.product');
            products.forEach(product => {
                const nameTag = product.querySelector('h3');
                if(nameTag) {
                    const name = nameTag.innerText.toLowerCase();
                    product.style.display = name.includes(filter) ? 'block' : 'none';
                }
            });
        });
    }

});
