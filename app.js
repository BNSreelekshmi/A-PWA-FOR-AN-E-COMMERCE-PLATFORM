

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function addToCart(id) {
    const cart = getCart();
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Alert (optional)
    alert(`Product ${id} added to cart!`);

    // Notification
    const product = products.find(p => p.id == id);
    if (Notification.permission === 'granted' && product) {
        new Notification('PWA Shop', {
            body: `${product.name} added to cart!`,
            icon: product.image
        });
    }
}

function updateCartCount() {
    const span = document.getElementById('cart-count');
    if (span) span.textContent = getCart().length;
}

function displayCart() {
    const cart = getCart();
    const container = document.getElementById('cart-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;
    let html = '<ul class="list-group">';

    cart.forEach(id => {
        const product = products.find(p => p.id == id);
        if (product) {
            total += product.price;
            html += `<li class="list-group-item">
                        ${product.name} - $${product.price}
                     </li>`;
        }
    });

    html += '</ul>';

    
    html += `<h4 class="mt-3">Total: $${total}</h4>`;

    container.innerHTML = html;
}
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// ====================
// Products and Rendering
// ====================

const products = [
    {id:1, name:'Product 1', price:10, image:'images/product1.jpeg'},
    {id:2, name:'Product 2', price:40, image:'images/product2.jpeg'},
    {id:3, name:'Product 3', price:30, image:'images/product3.jpeg'},
    {id:4, name:'Product 4', price:45, image:'images/product4.png'},
    {id:3, name:'Product 5', price:28, image:'images/product5.jpg'},
    {id:3, name:'Product 6', price:52, image:'images/product6.jpg'}
];

function initProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // Clear previous content to prevent duplicates
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';
       card.innerHTML = `
    <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <button class="btn btn-primary mt-auto add-to-cart" data-id="${product.id}">  Add to Cart
            </button>
        </div>
    </div>
`;
        container.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            addToCart(id);
        });
    });

    updateCartCount();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker Failed:', err));
    }

    Notification.requestPermission().then(permission => {
        if (permission === 'granted') console.log('Notifications enabled!');
    });

    initProducts();
});