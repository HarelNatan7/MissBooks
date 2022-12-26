
const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from './../services/book.service.js';
import {  showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch(err => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                showSuccessMsg('Book Saved')
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setBookToEdit(prevBook => {
            if (field === 'amount') {
                prevBook.listPrice.amount = value
                console.log('prevBook.listPrice.amount:', prevBook.listPrice.amount)
            }
            return { ...prevBook, [field]: value }
        })
    }

    return <section className="add-book-container">
        <h2>Add Book </h2>
        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Book Title:</label>
            <input required
                type="text"
                name="title"
                id="title"
                value={bookToEdit.title}
                onChange={handleChange}
                placeholder="Enter Book Title" />
            <label htmlFor="amount">Book Price:</label>
            <input required
                type="number"
                name="amount"
                id="amount"
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
                placeholder="Enter Book Price" />
            <button >{bookToEdit.id ? 'Save' : 'Add'}</button>
            <Link to="/book">Cancel</Link>
        </form>
    </section>
}