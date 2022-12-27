const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { LongTxt } from '../cmps/long-txt.jsx';
import { AddReview } from '../cmps/add-review.jsx';

import { bookService } from './../services/book.service.js';

export function BookDetails() {

    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const [isAddReview, setIsAddReview] = useState(false)
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()
    const date = (new Date).getFullYear()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBook(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })

            bookService.getNextBookId(bookId)
            .then(setNextBookId)
            bookService.getPrevBookId(bookId)
            .then(setPrevBookId)
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
        <div className="btn-book-details flex">
        <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
        <Link to={`/book/${prevBookId}`}>Previous Book</Link>
        <Link to={`/book/${nextBookId}`}>Next Book</Link>
        <button onClick={onGoBack}>Go Back</button>
        <button onClick={() => setIsAddReview(!isAddReview)}>{isAddReview ? 'Close Review' : 'Add Review'}</button>
        </div>
        {isAddReview && <div>
            <AddReview bookId={bookId}/>
        </div>}

        {book.reviews && <div className="book-reviews">
            <h2>Book Reviews: </h2>
            {book.reviews.map(review => {
                return <section className="review">
                <label>Full Name: {review.fullname}</label>
                <label>Rate: {review.rate}</label>
                <label>Read At: {review.date}</label>
                </section>
            })}
        </div>}
    </section>
}