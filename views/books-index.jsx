const { useState, useEffect } = React

import { BooksFilter } from '../cmps/books-filter.jsx';
import { BooksList } from '../cmps/books-list.jsx';
import { BookDetails } from '../cmps/book-details.jsx';
import { BookEdit } from '../cmps/book-edit.jsx';
import { UserMsg } from '../cmps/user-msg.jsx';


import { booksService } from './../services/books.service.js';

export function BooksIndex() {

    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())
    const [userMsg, setUserMsg] = useState('')

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        booksService.query(filterBy).then(booksToUpdate => setBooks(booksToUpdate))
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        booksService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            flashMsg('Book removed!')
        })
    }

    function onSelectBook(bookId) {
        booksService.get(bookId).then((book) => {
            setSelectedBook(book)
        })
    }

    function onAddNewBook(newBook) {
        console.log(newBook);
        booksService.post(newBook).then((newBook) => {
            setBooks(prevBooks => {
                return [...prevBooks, newBook]
            })
        })
    }

    function flashMsg(msg) {
        setUserMsg(msg)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    return <section className="books-index ">
        {userMsg && <UserMsg msg={userMsg} />}
        {!selectedBook && <div>
            <div className="panel-container">
                <BooksFilter onSetFilter={onSetFilter} />
                <hr />
                <BookEdit onAddNewBook={onAddNewBook} />
            </div>
            <BooksList books={books} onRemoveBook={onRemoveBook} onSelectBook={onSelectBook} />
        </div>}

        {selectedBook && <BookDetails
            book={selectedBook}
            onGoBack={() => setSelectedBook(null)}
        />}
    </section>
}