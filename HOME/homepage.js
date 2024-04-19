document.addEventListener('DOMContentLoaded', () => {
  // Check local storage to see if dark mode was previously enabled
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    // Immediately remove the transition to avoid flickering on load
    document.body.style.transition = 'none';
    setTimeout(() => { document.body.style.transition = ''; }, 0);
  }
  loadHeader();
  loadFooter();
  loadCart();
});

//JAVASCRIPT FOR THE NAVIGATION BAR

function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
    document.getElementById('menu').style.borderRadius = '10px';
  }
}


//EXTRA

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function loadHeader() {
  fetch('../templates/header.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('header-placeholder').innerHTML = html;
      headerLoaded();
    })
    .catch(err => console.error('Failed to load header: ', err));
}

function headerLoaded() {
  console.log('Header is loaded');

  document.getElementById("settings").addEventListener("click", function () {
    document.getElementById("settingsDropdown").classList.toggle("show");
  });

  document.getElementById("darkModeToggle").addEventListener("change", function () {
    // Ensure transitions only after button click, not on initial load
    document.body.style.transition = 'background-color 0.3s, color 0.3s';

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });
}

function loadFooter() {
  fetch('../templates/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
      footerLoaded();
    })
    .catch(err => console.error('failed to load footer: ', err));
}

function footerLoaded() {
  console.log('Footer is loaded');
}

function loadCart() {
  fetch('../templates/cart.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('cart-placeholder').innerHTML = html;
      
    })
    .catch(err => console.error('failed to load footer: ', err));
}

function cartLoaded() {
  console.log('Cart base loaded')
  displayCart();
}

///CHECKOUT BUTTON

 // JavaScript to handle button click for redirection
  document.getElementById('checkoutButton').addEventListener('click', function() {
    
    window.location.href = '../HOME/checkout.html'; // Redirect URL
  }); 


// document.addEventListener('DOMContentLoaded', function() {
//     var checkoutButton = document.getElementById('checkoutButton');
//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', function() {
//             alert('Proceeding to checkout...');
//             // Add more functionality here as needed for your checkout process
//       ./  });
//     } else {
//         console.log('Checkout button not found');
//     }
// });
