// Load header and footer
export async function loadLayout() {
  const header = await fetch('templates/header.html').then(res => res.text());
  document.getElementById('header-placeholder').innerHTML = header;
  const footer = await fetch('templates/footer.html').then(res => res.text());
  document.getElementById('footer-placeholder').innerHTML = footer;
  const cartHolder = document.getElementById('cart-placeholder');
  if (cartHolder) {
    const cart = await fetch('templates/cart.html').then(res => res.text());
    cartHolder.innerHTML = cart;
  }
  setupNav();
}

// Navigation toggle for mobile
function setupNav() {
  const toggle = document.getElementById('nav-toggle');
  if (!toggle) return;
  const menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}

// Simple cart toggle
export function initCart() {
  const cart = document.getElementById('cart');
  if (!cart) return;
  document.getElementById('cart-icon')?.addEventListener('click', () => cart.classList.remove('hidden'));
  document.getElementById('close-cart')?.addEventListener('click', () => cart.classList.add('hidden'));
}

// Run on pages
window.addEventListener('DOMContentLoaded', loadLayout);
