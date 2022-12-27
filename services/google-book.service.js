
export const googleBookService = {
    query
}

function query(txt) {
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${txt.title}`).then(res => {

        const regex = new RegExp(txt.title, 'i')
        let items = res.data.items.filter(item => regex.test(item.volumeInfo.title))
        console.log('items:', items)
        return Promise.resolve(items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            img: item.volumeInfo.imageLinks.smallThumbnail,
            pageCount: item.volumeInfo.pageCount,
            description: item.volumeInfo.description,
            language: item.volumeInfo.language,
            publishedDate: item.volumeInfo.publishedDate,
        })))
    })
}