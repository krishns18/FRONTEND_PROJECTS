import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import BookShelf from './BookShelf';

class DisplayBooks extends Component {

  // Fetching all books and setting the initial state of shelfs.
  componentDidMount() { 
    this.fetchAllBooks();  
  }
  
  // Initial state of book shelfs. State needs to be maintained.
  constructor(props) {
    super(props);
    this.state = {
      total: [],
      current: [],
      wishlisted: [],
      read: []
    };
    this.updateResults = this.updateResults.bind(this);
  }

  // Making fetchAllBooks function so that I can call it when I move a book from shelf.
  fetchAllBooks() {
    // Calling BooksAPI getAll() method.
    BooksAPI.getAll().then( (booklist) => { 
      this.setState({
        current: booklist.filter( (book) => { return book.shelf === 'currentlyReading'}),
        wishlisted : booklist.filter( (book) => {return book.shelf === 'wantToRead'}),
        read: booklist.filter( (book) => { return book.shelf === 'read'}),
        total: booklist
      });
    })
  }

  /* This function will be passed as props to BookShelf and will call
     the fetchAllBooks() method to reset the state.
  */
  updateResults() {
    this.fetchAllBooks();
  }

  render() {
    // bookshelf variables
    const { current, wishlisted, read } = this.state;
    // Added a check for thumbnail. A few of the books do not have a thumbnail.
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>My BookShelf</h1>
        </div> 
        <div className="list-books-content">
          <div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              { current.length > 0 && current.map((book,index) => (
                <BookShelf 
                  book={book} 
                  key={index} 
                  onUpdate={this.updateResults}
                  imageUrl={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail}/>
              ))}
              </ol>  
            </div>
          </div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              { wishlisted.length > 0 && wishlisted.map((book,index) => (
                <BookShelf 
                  book={book} 
                  key={index} 
                  onUpdate={this.updateResults}
                  imageUrl={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail}/>
              ))}
              </ol>  
            </div>
          </div>
          <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              { read.length > 0 && read.map((book,index) => (
                <BookShelf 
                  book={book} 
                  key={index} 
                  onUpdate={this.updateResults}
                  imageUrl={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail}/>
              ))}
              </ol>  
            </div>
          </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>  
        </div> 
      </div>
    );
  }
}

export default DisplayBooks;