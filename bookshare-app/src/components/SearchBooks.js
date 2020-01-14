import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {DebounceInput} from 'react-debounce-input';
import * as BooksAPI from '../utils/BooksAPI';
import BookShelf from './BookShelf';

class SearchBooks extends Component {
  //Initial state for this component
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      list: []
    }
    this.updatePostResults = this.updatePostResults.bind(this);
  }

  updateSearchTerm = (query) => {
    this.setState({ query: query}, this.fetchResults);
  }

  fetchResults() {
    const { query, list } = this.state;
    if(query === '' || query === undefined) {
      this.setState({ list: []});
      return;
    }
    // Calling BooksAPI.search method to get the list of books.
    BooksAPI.search(query).then((results) => { 
      // API returns error as "empty query."
      if(results.error && results.error === 'empty query') {
        this.setState({ list: results});
      } else {
        if(list !== results) {
          // fetching list of books on my current shelf and merging with search results.
          BooksAPI.getAll().then( (booklist) => { 
            let updated_results = results.map((item) => {
               let myBook = booklist.find( (b) => b.title === item.title);
               if(myBook) {
                 item.shelf = myBook.shelf;
               }
               return item;
            })
            this.setState({ list: updated_results});
          })
          
        }
      }
    })
  }

  // Update state after adding books.
  updatePostResults(book,shelf) {
    let bookIndex = this.state.list.indexOf(book);
    let updated_list = this.state.list.map((item,index) => {
        if(index === bookIndex) {
          item.shelf = shelf;
        }
        return item;
    })
    this.setState({ list : updated_list});
    
  }

  render() {
    const { query, list } = this.state;
    return(
      <div>
        <br/>
        <br/>
        <div className="search-books" >
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
            <DebounceInput 
                  type="text"
                  debounceTimeout={150}
                  minLength={2} 
                  placeholder="Search by title or author"
                  value={query} onChange={(event) => this.updateSearchTerm(event.target.value)}
            />  
            </div>
          </div>
          <div className="search-book-results">
            <ol className="books-grid">
              {list.length > 0 && list.map( ( book, index) => (
                <BookShelf 
                  onPostUpdate={this.updatePostResults} 
                  shelf={book.shelf} 
                  book={book} 
                  key={index}
                  imageUrl={book.imageLinks === undefined ? '' : book.imageLinks.thumbnail} />
              ))}
            </ol>
          </div>
        </div> 
      </div> 
    );
  }
}

export default SearchBooks;