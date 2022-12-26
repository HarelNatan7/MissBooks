const { Link } = ReactRouterDOM

import { BooksPreview } from "./books-preview.jsx"

export function BooksList({ books, onRemoveBook, onSelectBook }) {

    return <ul className="books-list">
        {books.map(book => <li key={book.id}>
            <BooksPreview book={book}/>
            <div>
                    <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                    <Link to={`/book/${book.id}`}>Select Book!</Link>
                </div>
        </li>)}
    </ul>
}