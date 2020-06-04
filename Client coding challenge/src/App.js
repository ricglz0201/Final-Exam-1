import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

const fetchBooks = async (name) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${name}`;
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error('Problem while fetching')
    }
    const { items } = await response.json();
    return items;
  } catch (err) {
    throw new Error(err);
  }
}

const App = () => {
  const [books, setBooks] = React.useState([]);
  const [error, setError] = React.useState('');
  const fetchAndUpdateBooks = async (name) => {
    try {
      const data = await fetchBooks(name);
      setBooks(data);
    } catch (err) {
      setError(err);
    }
  }
  return (
    <section>
      <BookForm callback={fetchAndUpdateBooks} />
      <section className="books">
        {
          books.map((book) => <Book key={book.id} book={book} />)
        }
      </section>
      <div>{error}</div>
    </section>
  )
}

export default App;
