const { useState, useEffect } = React

export function BookEdit({ onAddNewBook }) {

    const [newBook, setNewBook] = useState({
        title: null, price: null
    })

    function onSubmitAddBook(ev) {
        ev.preventDefault()
    }

    function onAddBook() {
        setNewBook(newBook)
        onAddNewBook(newBook)
    }

    function handleNewBook({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setNewBook(prev => {
            return { ...prev, [field]: value }
        })
    }

    return <section className="add-book-container">
        <h2>Add Book </h2>
        <form onSubmit={onSubmitAddBook}>
            <label htmlFor="title">Book Title:</label>
            <input type="text"
                name="title"
                value={setNewBook.title}
                onChange={handleNewBook}
                required
                placeholder="Enter Book Title" />
            <label htmlFor="price">Book Price:</label>
            <input type="number"
                name="price"
                value={setNewBook.price}
                onChange={handleNewBook}
                required
                placeholder="Enter Book Price" />
            <button onClick={onAddBook}>Add Book</button>
        </form>
    </section>
}