const { useState } = React

export function LongTxt({ txt, length }) {

    const [isReadMore, setIsReadMore] = useState(false)

    let firstTxt = ''

    if (txt.length > length) {
        firstTxt = txt.substring(0, length)
    }

    function showLessOrMore() {
        setIsReadMore(!isReadMore)
    }

    return <p>
        {txt.length < length && <div>
            {txt}
        </div>}
        {txt.length > length && <div>
            {!isReadMore && <div>
                {firstTxt}
                <button className="read-btn" onClick={() => showLessOrMore()}>Read More...</button>
            </div>}
            {isReadMore && <div>
                {txt}
                <button className="read-btn" onClick={() => showLessOrMore()}>Read less</button>
            </div>
            }
        </div>}
    </p>
}