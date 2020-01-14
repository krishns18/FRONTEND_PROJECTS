import React from 'react';
import { Route } from 'react-router-dom';
// importing components.
import DisplayBooks from './DisplayBooks';
import SearchBooks from './SearchBooks';
import '../App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/" exact render={({ history }) => (
          <DisplayBooks/>
        )} />
        <Route path="/search" render={( { history }) => (
          <SearchBooks />
        )} /> 
      </div>
    )
  }
}

export default BooksApp

