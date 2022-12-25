

export function BooksPreview({ book }) {

    return <article className="book-preview">
        <h2>Book Name: {book.title}</h2>
        <img src={book.thumbnail} />
        <h3>Book Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        
    </article>
}