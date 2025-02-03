document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        // Toggle the display property of the content
        if (content.style.display === 'block') {
            content.style.display = 'none';
            button.querySelector('.arrow').textContent = '▼';
        } else {
            content.style.display = 'block';
            button.querySelector('.arrow').textContent = '▲';
        }
    });
});
