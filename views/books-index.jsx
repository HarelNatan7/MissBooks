const { useState, useEffect } = React

import { BooksList } from '../cmps/books-list.jsx';

import { booksService } from './../services/books.service.js';

export function BooksIndex() {

    const [books, setBooks] = useState([])

    useEffect(() => {
        loadBooks()
    },[])

    function loadBooks() {
        booksService.query().then(books => setBooks(books))
    }
    
    return <section className="books-index ">
        <div>
        <h1>Hello from Books Index!</h1>
        <BooksList books={books} />
        </div>
    </section>
}