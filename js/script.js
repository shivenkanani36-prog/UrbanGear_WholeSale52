let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if(cartCount) cartCount.innerText = cart.length;
}
updateCartCount();

function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

function removeFromCart(index) {
    cart.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    location.reload();
}

// Search function
const searchInput = document.getElementById('search-bar');
if(searchInput) {
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        document.querySelectorAll('.product').forEach(product => {
            const name = product.querySelector('h3').innerText.toLowerCase();
            if(name.includes(filter)) product.style.display = 'block';
            else product.style.display = 'none';
        });
    });
}

// Cart page
if(document.getElementById('cart-items')) {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalDiv = document.getElementById('total');
    let total = 0;
    if(cart.length === 0) {
