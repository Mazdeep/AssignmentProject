document.querySelectorAll('.restaurant').forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Example: Change shadow color on hover
        item.style.boxShadow = '0 6px 16px rgba(255,165,0,0.6)'; // Orange glow
    });
    item.addEventListener('mouseleave', () => {
        // Revert to original shadow
        item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    });
});