const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx"
import { HomePage } from "./views/home.jsx"
import { BooksIndex } from "./views/books-index.jsx"
import { AboutUs } from "./views/about.jsx"
import { BookDetails } from "./cmps/book-details.jsx"
import { BookEdit } from "./views/book-edit.jsx"
import { UserMsg } from './cmps/user-msg.jsx'


export function App() {

    return <Router>
        <section className="main-layout app">
            <AppHeader />
            <main className="full main-layout">
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<BooksIndex />} path="/book" />
                    <Route element={<BookEdit />} path="/book/edit" />
                    <Route element={<BookDetails />} path="/book/:bookId" />
                    <Route element={<BookEdit />} path="/book/edit/:bookId" />
                </Routes>
            </main>
            <UserMsg />
        </section>
    </Router>
}