const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BooksFilter } from '../cmps/books-filter.jsx';
import { BooksList } from '../cmps/books-list.jsx';
import { UserMsg } from '../cmps/user-msg.jsx';

import { booksService } from './../services/books.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function BooksIndex() {

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(booksService.getDefaultFilter())

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        booksService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        booksService.remove(bookId).then(() => {
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