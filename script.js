const cart = [];

        // Fetch products from fakestoreAPI
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched products:", data); // Debug: log products to check if they are fetched correctly
                return data;
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Failed to load products. Please try again later.");
                return []; // Return an empty array in case of an error
            }
        }

        // Display products fetched from API
        async function displayProducts() {
            const productContainer = document.getElementById('products-container');
            const products = await fetchProducts();
            productContainer.innerHTML = ''; // Clear the container

            if (products.length === 0) {
                productContainer.innerHTML = '<p>Unable to display products at this time. Please try again later.</p>';
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

        // Toggle cart visibility
        document.getElementById('cart-link').addEventListener('click', () => {
            const cartContainer = document.getElementById('cart-container');
            cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
        });

        // Initialize by displaying products
        displayProducts();
    
        function addProduct() {
            const title = document.getElementById('product-title').value;
            const price = document.getElementById('product-price').value;
            const imageUrl = document.getElementById('product-image').value;
            const description = document.getElementById('product-description').value;
            const errorMessage = document.getElementById('error-message');
            const productPreview = document.getElementById('product-preview');
      
            // Simple form validation
            if (title === '' || price === '' || imageUrl === '' || description === '') {
              errorMessage.textContent = 'Please fill out all fields.';
              return;
            }
      
            errorMessage.textContent = '';
      
            // Preview the product details
            document.getElementById('preview-title').textContent = title;
            document.getElementById('preview-price').textContent = price;
            document.getElementById('preview-image').src = imageUrl;
            document.getElementById('preview-description').textContent = description;
      
            productPreview.style.display = 'block';
      
            // Clear form after preview (optional)
            document.getElementById('product-form').reset();
          }