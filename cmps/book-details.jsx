const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from '../cmps/long-txt.jsx';

import { booksService } from './../services/books.service.js';

export function BookDetails() {

    const [book, setBook] = useState(null)
    const {bookId} = useParams()
    const navigate = useNavigate()
    const date = (new Date).getFullYear()

    useEffect(() => {
        loadBook()
    }, [bookId])
    
    function loadBook() {
        booksService.get(bookId)
        .then((book) => setBook(book))
        .catch((err) => {
            console.log('Had issues in book details', err)
            navigate('/book')
        })
    }
    
    function checkBookReading() {
        let strPagesCount = ''
        if (book.pageCount > 500) strPagesCount = book.pageCount + ' Serious Reading'
        else if (book.pageCount <= 500 && book.pageCount > 200) strPagesCount = book.pageCount + ' Descent Reading'
        else if (book.pageCount < 100) strPagesCount = book.pageCount + ' Light Reading'
        else strPagesCount = book.pageCount
        return strPagesCount
    }

    function checkBookPublishYear() {
        let strPublishedAt = ''
        if (date - book.publishedDate > 10) strPublishedAt = book.publishedDate + ' Vintage'
        else if (date - book.publishedDate <= 1) strPublishedAt = book.publishedDate + ' New'
        else strPublishedAt = book.publishedDate
        return strPublishedAt
    }

    function checkBookPrice() {
        let dynClass = ''
        if (book.listPrice.amount > 150) dynClass = 'red'
        else if (book.listPrice.amount < 20) dynClass = 'green'
        return dynClass
    }

    function onGoBack() {
        navigate('/book')
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details">
        <h2>Title : {book.title}</h2>
        <h3>Price: <span className={checkBookPrice()}>{book.listPrice.amount} {book.listPrice.currencyCode}</span></h3>
        <h4>Published At: {checkBookPublishYear()}</h4>
        <h4>Pages Count: {checkBookReading()}</h4>
        {book.listPrice.isOnSale && <h2 className="green">On Sale Right Now ! </h2>}
        <img src={book.thumbnail} />
        <LongTxt txt={book.description} length={100} />
        <button onClick={onGoBack}>Go Back</button>
        <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
    </section>
}