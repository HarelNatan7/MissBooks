const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BooksFilter } from '../cmps/books-filter.jsx';
import { BooksList } from '../cmps/books-list.jsx';
import { UserMsg } from '../cmps/user-msg.jsx';

import { bookService } from './../services/book.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function BooksIndex() {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg('Book removed')
        })
        .catch((err) => {
            console.log('Had issues removing', err)
            showErrorMsg('Could not remove book, try again please!')
        })
    }

    return <section className="books-index ">
        {userMsg && <UserMsg msg={userMsg} />}
            <div className="panel-container">
                <BooksFilter onSetFilter={onSetFilter} />
                <hr />
                <Link to="/book/edit">Add Book</Link>
            </div>
            {!isLoading && <BooksList books={books} onRemoveBook={onRemoveBook} />}
            {isLoading && <div>Loading..</div>}

    </section>
}