

export function BookDetails({ book, onGoBack }) {

    return <section className="book-details">
        <h1>book Title : {book.title}</h1>
        <h3>Book Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        <img src={book.thumbnail} />
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <button onClick={onGoBack}>Go Back</button>
    </section>
}