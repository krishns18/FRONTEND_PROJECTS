import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';
class BookShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: props.shelf
    };
    this.updateShelf = this.updateShelf.bind(this);
  }
  // Method to update the shelf with the current state of books.
  updateShelf(book,shelf) {
    BooksAPI.update(book, shelf).then((books) => { 
      this.setState({shelf: shelf});
      if(this.props.onUpdate) {
        this.props.onUpdate();
      }
      if(this.props.onPostUpdate) {
        this.props.onPostUpdate(book,shelf);
      }
    }); 
  }

  render() {
    const { book, index, imageUrl } = this.props;
    return(
      <li key={index}>
        <div className="book">
          <div className="book-top">
            <div 
              className="book-cover" 
              style={{ width: 128, height: 193, backgroundImage:`url(${imageUrl}`}}>
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf ? book.shelf : "none"} onChange={(event) => this.updateShelf(book,event.target.value)}>
                <option value="" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>  
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>  
      </li>   
    );
  }
}

export default BookShelf;