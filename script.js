// Global state
let isAdminMode = false;
const cart = [];

// Dummy user data 
const users = [
    { username: 'admin', role: 'admin' },
    { username: 'tclinton478@gmail.com', role: 'user' },
    { username: 'spectrewriting124@gmail.com', role: 'user' },
    { username: 'toyeintonbra117@gmail.com', role: 'user' }
];

// Toggle between User and Admin Mode
document.getElementById('toggle-mode').addEventListener('click', () => {
    isAdminMode = !isAdminMode;
    document.body.classList.toggle('admin-mode', isAdminMode);
    document.getElementById('toggle-mode').textContent = isAdminMode ? 'Toggle to User Mode' : 'Toggle to Admin Mode';
    displayUsers(); // Show user management if in admin mode
});

// Display users (Admin functionality)
function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.username} (${user.role})`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeUser(user.username);
        });
        userItem.appendChild(removeButton);
        userList.appendChild(userItem);
    });
}

function removeUser(username) {
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
    }
}

// Initialize user list when the page loads
displayUsers();


// Fetch products from fakestoreAPI
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products. Please try again later.");
        return [];
    }
}

// Display products fetched from fakestoreAPI
async function displayProducts() {
    const productContainer = document.getElementById('products-container');
    const category = document.getElementById('category-filter').value;
    const sortOption = document.getElementById('sort-options').value;
    let products = await fetchProducts();

    // Filter products by selected category
    products = products.filter(product => category === 'all' || product.category.toLowerCase() === category);

    // Sort products based on selected option
    if (sortOption === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
        products.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Clear existing products and display filtered and sorted products
    productContainer.innerHTML = '';
    if (products.length === 0) {
        productContainer.innerHTML = '<p>No products available.</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description.substring(0, 60)}...</p>
            <p><strong>$${product.price.toFixed(2)}</strong></p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

// Add items to cart
function addToCart(productId, productName, productPrice) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    displayCart();
}

// Display cart items and total price
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = ''; // Clear previous cart items

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPrice.innerText = total.toFixed(2);
    cartContainer.style.display = 'block'; // Show the cart
}

// Remove item from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    displayCart();
}

// Simulating of checkout process
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Checkout successful. Thank you for your purchase!");
    cart.length = 0;
    displayCart();
});

// Manage users (Admin functionality)
function displayUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = `${user.username} (${user.role})`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeUser(user.username);
        });
        userItem.appendChild(removeButton);
        userList.appendChild(userItem);
    });
}

function removeUser(username) {
    const index = users.findIndex(user => user.username === username);
    if (index !== -1) {
        users.splice(index, 1);
        displayUsers();
    }
}

// Add a new product (Admin functionality)
function addProduct() {
    const title = document.getElementById('product-title').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageUrl = document.getElementById('product-image').value;
    const description = document.getElementById('product-description').value;
    const errorMessage = document.getElementById('error-message');
    const productPreview = document.getElementById('product-preview');

    // Simple form validation
    if (title === '' || isNaN(price) || imageUrl === '' || description === '') {
        errorMessage.textContent = 'Please fill out all fields with valid data.';
        return;
    }

    errorMessage.textContent = '';

    // Preview the product details
    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-price').textContent = price.toFixed(2);
    document.getElementById('preview-image').src = imageUrl;
    document.getElementById('preview-description').textContent = description;

    productPreview.style.display = 'block';

    // Clear form after preview (optional)
    document.getElementById('product-form').reset();
}

// Initialize event listeners for filters
document.getElementById('category-filter').addEventListener('change', displayProducts);
document.getElementById('sort-options').addEventListener('change', displayProducts);

// Initialize by displaying products
displayProducts();
