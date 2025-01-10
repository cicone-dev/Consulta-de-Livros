const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    resultsDiv.innerHTML = '';

    const searchTerm = searchInput.value;
    const apiKey = 'AIzaSyDIKMwcHTttlkEvbSFJjfcP67BuC_BaBJI'; // Substitua pela sua própria chave de API do Google Books

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.items) {
                data.items.forEach(book => {
                    const title = book.volumeInfo.title;
                    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido';
                    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=Sem+Imagem';

                    const bookElement = document.createElement('div');
                    bookElement.classList.add('book');
                    bookElement.innerHTML = `
                        <img src="${thumbnail}" alt="${title}">
                        <h2>${title}</h2>
                        <p><strong>Autores:</strong> ${authors}</p>
                    `;
                    resultsDiv.appendChild(bookElement);
                });
            } else {
                resultsDiv.innerHTML = 'Nenhum livro encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar livros:', error);
            resultsDiv.innerHTML = 'Ocorreu um erro ao buscar livros.';
        });
});
