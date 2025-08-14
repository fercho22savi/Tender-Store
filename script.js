document.addEventListener('DOMContentLoaded', () => {
    // Product data
    const products = [
        { id: 1, name: 'Smartwatch Ultrafino', price: 199.99, image: 'https://cdn.pixabay.com/photo/2016/11/29/09/56/smartwatch-1869678_1280.jpg', description: 'Un reloj inteligente con todas las funciones que necesitas.' },
        { id: 2, name: 'Audífonos Bluetooth', price: 89.99, image: 'https://cdn.pixabay.com/photo/2017/04/06/11/04/audio-2207038_1280.jpg', description: 'Sonido de alta calidad y batería de larga duración.' },
        { id: 3, name: 'Cámara Réflex Profesional', price: 1200.00, image: 'https://cdn.pixabay.com/photo/2016/11/29/09/56/camera-1869634_1280.jpg', description: 'Captura momentos inolvidables con la mejor calidad.' },
        { id: 4, name: 'Laptop Ultraligera', price: 950.50, image: 'https://cdn.pixabay.com/photo/2016/09/25/11/50/notebook-1694602_1280.jpg', description: 'Rendimiento y portabilidad en un solo dispositivo.' },
        { id: 5, name: 'Teléfono Móvil Gama Alta', price: 799.00, image: 'https://cdn.pixabay.com/photo/2016/11/29/09/56/phone-1869584_1280.jpg', description: 'El último modelo con cámara de 108MP.' },
        { id: 6, name: 'Tablet con Stylus', price: 450.00, image: 'https://cdn.pixabay.com/photo/2016/09/25/11/50/tablet-1694600_1280.jpg', description: 'Perfecta para dibujar, tomar notas y ver series.' }
    ];

    // DOM references
    const menuLinks = document.querySelectorAll('.menu ul li a');
    const productCatalog = document.getElementById('product-catalog');
    const userDashboard = document.getElementById('user-dashboard');
    const shoppingCartView = document.getElementById('shopping-cart-view');
    const shoppingCartSidebar = document.getElementById('shopping-cart-sidebar');
    const mainHeaderTitle = document.getElementById('main-header-title');

    // Authentication and Cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    let users = JSON.parse(localStorage.getItem('users')) || [
        { id: 1, name: 'Usuario Prueba', email: 'user@tienda.com', password: 'user' }
    ];
    if (localStorage.getItem('users') === null) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // --- Rendering Functions ---
    function renderProducts() {
        productCatalog.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
                </div>
            `;
            productCatalog.appendChild(card);
        });
    }

    function renderCart() {
        const cartItemsList = document.getElementById('cart-items');
        const cartItemsListFull = document.getElementById('cart-items-full');
        const cartTotalSpan = document.getElementById('cart-total');
        const cartTotalSpanFull = document.getElementById('cart-total-full');
        const cartItemCountSpan = document.getElementById('cart-item-count');

        [cartItemsList, cartItemsListFull].forEach(list => {
            if (list) list.innerHTML = '';
        });

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            if (cartItemsList) cartItemsList.innerHTML += cartItemHTML;
            if (cartItemsListFull) cartItemsListFull.innerHTML += cartItemHTML;
        });

        if (cartTotalSpan) cartTotalSpan.textContent = total.toFixed(2);
        if (cartTotalSpanFull) cartTotalSpanFull.textContent = total.toFixed(2);
        if (cartItemCountSpan) cartItemCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCheckoutButtonState();
    }

    // --- Navigation and Main Logic ---
    function handleMenuClick(viewId) {
        menuLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`[href="#${viewId}"]`).classList.add('active');

        [productCatalog, userDashboard, shoppingCartView].forEach(el => el.style.display = 'none');
        shoppingCartSidebar.style.display = 'none';

        switch (viewId) {
            case 'inicio':
                productCatalog.style.display = 'grid';
                shoppingCartSidebar.style.display = 'flex';
                mainHeaderTitle.textContent = 'Catálogo de Productos';
                break;
            case 'carrito':
                shoppingCartView.style.display = 'flex';
                mainHeaderTitle.textContent = 'Mi Carrito de Compras';
                renderCart();
                break;
            case 'mi-cuenta':
                if (loggedInUser) {
                    userDashboard.style.display = 'flex';
                    mainHeaderTitle.textContent = 'Mi Cuenta';
                    renderUserDashboard();
                } else {
                    document.getElementById('authModal').style.display = 'flex';
                    document.getElementById('login-form').style.display = 'block';
                    document.getElementById('register-form').style.display = 'none';
                }
                break;
        }
    }

    // --- Cart Functions ---
    function addToCart(productId) {
        const product = products.find(p => p.id == productId);
        if (product) {
            const cartItem = cart.find(item => item.id == productId);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            renderCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id != productId);
        renderCart();
    }

    function updateCheckoutButtonState() {
        const termsCheckboxSidebar = document.getElementById('terms-checkbox');
        const termsCheckboxFull = document.getElementById('terms-checkbox-full');
        const checkoutBtnSidebar = document.getElementById('checkoutBtn');
        const checkoutBtnFull = document.getElementById('checkoutBtnFull');

        const termsChecked = (termsCheckboxSidebar && termsCheckboxSidebar.checked) || (termsCheckboxFull && termsCheckboxFull.checked);
        const cartNotEmpty = cart.length > 0;
        const loggedIn = loggedInUser !== null;
        
        if (checkoutBtnSidebar) checkoutBtnSidebar.disabled = !(loggedIn && termsChecked && cartNotEmpty);
        if (checkoutBtnFull) checkoutBtnFull.disabled = !(loggedIn && termsChecked && cartNotEmpty);
    }
    
    // --- Authentication Functions ---
    function checkLoginStatus() {
        const loginItem = document.getElementById('loginItem');
        const logoutItem = document.getElementById('logoutItem');

        if (loggedInUser) {
            loginItem.style.display = 'none';
            logoutItem.style.display = 'list-item';
        } else {
            loginItem.style.display = 'list-item';
            logoutItem.style.display = 'none';
        }
        updateCheckoutButtonState();
    }

    function loginUser(email, password) {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            loggedInUser = user;
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            alert('Inicio de sesión exitoso.');
            document.getElementById('authModal').style.display = 'none';
            checkLoginStatus();
            handleMenuClick('inicio');
        } else {
            alert('Credenciales incorrectas.');
        }
    }

    function logoutUser() {
        loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        alert('Sesión cerrada.');
        checkLoginStatus();
        handleMenuClick('inicio');
    }

    function renderUserDashboard() {
        if (loggedInUser) {
            document.getElementById('user-name').textContent = loggedInUser.name;
            document.getElementById('user-email').textContent = loggedInUser.email;
        }
    }

    // --- Event Listeners ---
    productCatalog.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(e.target.dataset.id);
        }
    });

    shoppingCartSidebar.addEventListener('click', (e) => {
        if (e.target.closest('.remove-item-btn')) {
            removeFromCart(e.target.closest('.remove-item-btn').dataset.id);
        }
    });
    
    shoppingCartView.addEventListener('click', (e) => {
        if (e.target.closest('.remove-item-btn')) {
            removeFromCart(e.target.closest('.remove-item-btn').dataset.id);
        }
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        alert('Redireccionando a PayPal para pagar...');
        cart = [];
        renderCart();
    });
    
    document.getElementById('checkoutBtnFull').addEventListener('click', () => {
        alert('Redireccionando a PayPal para pagar...');
        cart = [];
        renderCart();
        handleMenuClick('inicio');
    });

    document.getElementById('terms-checkbox').addEventListener('change', updateCheckoutButtonState);
    if(document.getElementById('terms-checkbox-full')) {
        document.getElementById('terms-checkbox-full').addEventListener('change', updateCheckoutButtonState);
    }
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = e.currentTarget.getAttribute('href').substring(1) || 'inicio';
            handleMenuClick(viewId);
        });
    });

    // Nuevo evento para el botón "Inicio" en el menú
    const homeLink = document.querySelector('.menu ul li a[href="#inicio"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            handleMenuClick('inicio');
        });
    }

    document.getElementById('loginBtn').addEventListener('click', () => {
        document.getElementById('authModal').style.display = 'flex';
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });
    
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
    });

    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('authModal').style.display = 'none';
            document.getElementById('termsModal').style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target === document.getElementById('authModal') || event.target === document.getElementById('termsModal')) {
            event.target.style.display = 'none';
        }
    };
    
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(email, password);
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            alert('El correo electrónico ya está registrado.');
        } else {
            const newUser = { id: Date.now(), name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            document.getElementById('registerForm').reset();
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('register-form').style.display = 'none';
        }
    });

    document.getElementById('showTerms').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('termsModal').style.display = 'flex';
    });

    if(document.getElementById('showTermsFull')) {
        document.getElementById('showTermsFull').addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('termsModal').style.display = 'flex';
        });
    }
    
    // Initial setup
    renderProducts();
    renderCart();
    checkLoginStatus();
    handleMenuClick('inicio');
});