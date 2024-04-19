

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartDiv = document.getElementById('cart-header');
    cartDiv.innerHTML = cart.map(item => `
        <p class="item-name">${item.name}</p>
          <h2>£${item.price}</h2>
    `).join('');
}

// For the main dish previewer

function handleAllergyCheckboxes(selected) {
    const allergyYes = document.getElementById('allergyYes');
    const allergyNo = document.getElementById('allergyNo');
    const allergyInfo = document.getElementById('allergyInfo');

    if (selected === 'yes') {
        allergyNo.checked = false;
        allergyInfo.style.display = allergyYes.checked ? 'block' : 'none';
    } else if (selected === 'no') {
        allergyYes.checked = false;
        allergyInfo.style.display = 'none';
    }
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(item => item['Product ID'] === id);
    if (found) {
        found.quantity += 1; // Increase the quantity if item is already in the cart
    } else {
        cart.push({id, name, price, quantity: 1 }); // Add new item to the cart
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    displayCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const quantityInput = document.getElementById('quantity');

    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 0) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
    });
});

/* Quantity Selector js */
function changeQuantity(change) {
    var input = document.querySelector('.quantity-input');
    var currentValue = parseInt(input.value);
    var newValue = currentValue + change;

    if (newValue < 1) newValue = 1; // Prevents the quantity from being less than 1

    input.value = newValue;
}

// ENDS HERE

let exchangeRates = {};
const UrlWithKey = `https://v6.exchangerate-api.com/v6/5c47b1d9f87a7e3435f52977/latest/GBP`

document.addEventListener('DOMContentLoaded', function() {
    fetchExchangeRates().then(() => {
        document.querySelectorAll('.currency-option').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
        
                const selectedCurrency = this.getAttribute('data-currency');
                const prices = document.querySelectorAll('.price-display');
        
                prices.forEach(priceE1 => {
                    const basePrice = parseFloat(priceE1.getAttribute('data-base-price'));
                    const convertedPrice = basePrice * exchangeRates[selectedCurrency];
                    priceE1.textContent = formatPrice(convertedPrice, selectedCurrency);
            })
            });
        });
        
        function formatPrice(price, currency) {
            let symbol = "";
            switch(currency) {
                case "USD": symbol = "$"; break;
                case "INR": symbol = "₹"; break;
                default: symbol = "£";
            }
            return `${symbol}${price.toFixed(0)}`; // format to 0 decimal place
        }
    });
});

function fetchExchangeRates() {
    return fetch(UrlWithKey)
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.conversion_rates;
            console.log("data", data)
            exchangeRates['GBP'] = 1;
            console.log("exchange:", exchangeRates)
        })
        .catch(err => console.error("Failed to fetch exchange rates: ", err));
}

// DISH PREVIWER JAVASCRIPT GOES HERE
document.addEventListener('DOMContentLoaded', () => {
    let menuData = {};

    fetch('menu.json') // Ensure the path to your JSON file is correct
        .then(response => response.json())
        .then(data => {
            menuData = data;
            // Initially display all items - assuming you want to start with 'Breakfast'
            displayAllItems(menuData);
        })
        .catch(error => console.error("Fetching error:", error));

    const menuContainer = document.getElementById('Example');
    const filterLinks = document.querySelectorAll('.filter-link');

    function displayMenuItems(menuItems) {
        document.getElementById('details-container').style.display = 'none';
        menuContainer.innerHTML = ''; // Clear the container
        menuItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card';

            card.style.backgroundImage = `url('${item.ImageAddress}')`;
            card.style.backgroundSize = 'cover';  // Ensure the background covers the element
            card.style.backgroundPosition = 'center'; // Center the background image

            card.innerHTML = `
                <div class="content">
                <h2 class="title">${item.Name}<span class="price-display" data-base-price="${item.Price}">£${item.Price}</span></h2>
                <p class="copy">${item.Description}</p>
                <button class="btn details-btn" data-index="${index}">Add to cart</button>
                </div>
            `;
            menuContainer.appendChild(card);
        });

        document.querySelectorAll('.details-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const dishIndex = event.target.getAttribute('data-index');
                showDetails(menuItems[dishIndex]);
            });
        });
    }

    function displayAllItems(data) {
        const allItems = [];
        Object.keys(data).forEach(category => {
            allItems.push(...data[category]);
        });
        displayMenuItems(allItems);
    }

    function showDetails(dish) {
        const detailsHeader = document.getElementById('details-header');
        detailsHeader.innerHTML = `
            <h1>${dish.Name}</h1>
            <button id="close-btn">Close</button>
            <p>${dish.Description}</p>
            <p class="Ingredients">Contains: ${dish.Content}</p>
        `;

        const atcContainer = document.getElementById('mdish-last');
        // atcContainer.innerHTML = `
        //     <button class="add-to-cart-btn" onclick="addToCart('${dish['Product ID']}, ${dish.Name}', ${dish.Price})">Add to Cart Custom</button>
        // `;

        const detailsImageContainer = document.getElementById('details-image-container');
        detailsImageContainer.style.backgroundImage = `url('${dish.ImageAddress}')`;

        document.getElementById('kcal-amount').textContent = `${dish.Energy} kcal`;
        document.getElementById('protien-amount').textContent = `${dish.Protien.toFixed(1)} g`;
        document.getElementById('fats-amount').textContent = `${dish.Fat.toFixed(1)} g`;
        document.getElementById('carbs-amount').textContent = `${dish.Carbs} g`;
        document.getElementById('details-container').style.display = 'flex';

        document.getElementById('close-btn').addEventListener('click', function () {
            document.getElementById('details-container').style.display = 'none';
        });
    }
    

    // Filtering functionality - adjusted for object keys
    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const category = link.getAttribute('data-category'); // Ensure your HTML uses the exact category names as keys
            const subCategory = link.getAttribute('data-sub-category');
            let filteredMenu = [];

            if (category === 'All') {
                displayAllItems(menuData);
                return;
            }

            if (subCategory) { // Filtering by sub-category within a main category
                filteredMenu = menuData[category].filter(item => item['Sub Cateogory'] === subCategory);
            } else { // Filtering by main category only
                filteredMenu = menuData[category] || [];
            }
            document.getElementById('category-title').textContent = `${category}`;
            displayMenuItems(filteredMenu);
        });
    });
});
