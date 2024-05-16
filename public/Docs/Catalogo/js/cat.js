document.addEventListener('DOMContentLoaded', function() {
    fetch('/books')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('books-container');
        data.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.className = 'book';
            bookDiv.innerHTML = `
                <img src="${book.cover_image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Price: $${book.price.toFixed(2)}</p>
                <p>${book.available ? 'Available' : 'Not Available'}</p>
            `;
            container.appendChild(bookDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});
