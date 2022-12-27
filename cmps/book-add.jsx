const { useState } = React

import { googleBookService } from "../services/google-book.service.js"

export function BookAdd({ onAddBook }) {

    const [bookToSearch, setBookToSearch] = useState({ title: '' })
    const [books, setBooks] = useState([])

    function onSearchBook(ev) {
        ev.preventDefault()
        console.log('bookToSearch:', bookToSearch)
        googleBookService.query(bookToSearch)
            .then(books => {
                setBooks(books)
                console.log('books:', books)
            })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value

        setBookToSearch(prevBook => {
            return { ...prevBook, [field]: value }
        })
    }

    return <section className="add-book-api-container">
        <form className="search-book-form" onSubmit={onSearchBook}>
            <label htmlFor="title">Book Title:</label>
            <input required
                type="text"
                name="title"
                id="title"
                value={bookToSearch.title}
                onChange={handleChange}
                placeholder="Enter Book Title" />
            <button>Search</button>
        </form>
        {!!books.length && <ul>
            {books.map(book => <li key={book.id}>
                <span>{book.title}</span>
                <button onClick={() => {
                    onAddBook(book)
                    setBookToSearch({ title: '' })
                    setBooks([])
                }}>+</button>
            </li>)}
        </ul>}
    </section>
}
