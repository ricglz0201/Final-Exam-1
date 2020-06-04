import React from 'react';

function Book({ book }){
  const { searchInfo = {}, volumeInfo = {} } = book;
  const { title, authors = [], imageLinks={} } = volumeInfo;
  return(
    <section className="book">
      <h4 className="title">{title}</h4>
      <h6 className="title">{authors[0] || 'Anónimo'}</h6>
      <img src={imageLinks.thumbnail} alt="Representation of the book" />
      <p>{searchInfo.textSnippet}</p>
    </section>
  );
}

export default Book;
