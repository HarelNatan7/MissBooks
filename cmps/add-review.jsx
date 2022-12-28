const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM

import { surveyService } from "../services/survey.service.js"
import { bookService } from './../services/book.service.js';
import { showSuccessMsg } from "../services/event-bus.service.js"


export function AddReview({ bookId }) {

    const [rateBy, setRateBy] = useState(null)
    const [reviewToAdd, setReviewToAdd] = useState({ fullname: null, rate: null, date: null })
    const navigate = useNavigate()


    function onSaveReview(ev, bookId) {
        ev.preventDefault()
        bookService.addReview(bookId, reviewToAdd)
        setReviewToAdd(reviewToAdd)
        showSuccessMsg('Review Saved')
        // navigate(`/book`)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'radio') value = target.id

        setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
        console.log('reviewToAdd:', reviewToAdd)
    }

    function onClickRadio({ target }) {
        let { value } = target
        setRateBy(value)
    }

    return <section >
        <form className="review-container" onSubmit={() => onSaveReview(event, bookId)}>
            <label htmlFor="fullname">Full Name: </label>
            <input type="text"
                name="fullname"
                id="fullname"
                placeholder="Full Name"
                value={reviewToAdd.fullname}
                onChange={handleChange}
            />
            <label htmlFor="date">Read At: </label>
            <input type="date"
                name="date"
                id="date"
                onChange={handleChange}
                value={reviewToAdd.date}
            />
            <div className="rate-radio-container">
                RateByStars:
                <input type="radio" value={'RateByStars'} onClick={onClickRadio} name="rate" />
                RateByTextbox:
                <input type="radio" value={'RateByTextbox'} onClick={onClickRadio} name="rate" />
                RateBySelect:
                <input type="radio" value={'RateBySelect'} onClick={onClickRadio} name="rate" />
            </div>
            <DynamicCmp rateBy={rateBy} handleChange={handleChange} reviewToAdd={reviewToAdd}/>
            <button>Add Your Review</button>
        </form>
    </section>
}

function DynamicCmp({ rateBy, reviewToAdd, handleChange }) {
    switch (rateBy) {
        case 'RateBySelect':
            return <RateBySelect handleChange={handleChange} reviewToAdd={reviewToAdd}/>
        case 'RateByTextbox':
            return <RateByTextbox handleChange={handleChange} reviewToAdd={reviewToAdd}/>
        case 'RateByStars':
            return <RateByStars handleChange={handleChange} reviewToAdd={reviewToAdd}/>
    }
}

function RateByTextbox({ handleChange, reviewToAdd }) {
    return <input type="text" value={reviewToAdd.rate} onChange={handleChange} />
}

function RateBySelect({ handleChange, reviewToAdd }) {
    return (
            <select value={reviewToAdd.rate} onChange={handleChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
    )
}

function RateByStars({ handleChange, reviewToAdd }) {
    return (
        <section className="rate">
            <input type="radio" id="5" name="rate" value={reviewToAdd.rate} onChange={handleChange} />
            <label htmlFor="5" title="text">5 stars</label>
            <input type="radio" id="4" name="rate" value={reviewToAdd.rate} onChange={handleChange} />
            <label htmlFor="4" title="text">4 stars</label>
            <input type="radio" id="3" name="rate" value={reviewToAdd.rate} onChange={handleChange} />
            <label htmlFor="3" title="text">3 stars</label>
            <input type="radio" id="2" name="rate" value={reviewToAdd.rate} onChange={handleChange} />
            <label htmlFor="2" title="text">2 stars</label>
            <input type="radio" id="1" name="rate" value={reviewToAdd.rate} onChange={handleChange} />
            <label htmlFor="1" title="text">1 star</label>
        </section>
    )
}
