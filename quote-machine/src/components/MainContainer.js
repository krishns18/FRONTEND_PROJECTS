import React, { Component } from 'react';

class MainContainer extends Component {
  renderNewQuote = (e) => {
    e.preventDefault();
    this.props.generateQuote();
  }
  render() {
    if(this.props.quote) {
      let tweetHrefValue = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                            encodeURIComponent('"' + this.props.quote + '" ' + this.props.author);
      return(
        <div className="container">
          <div id="quote-box" className="jumbotron">
          <blockquote className="blockquote">
            <h1 className="mb-0" id="text">{this.props.quote}</h1>
            <br/>
            <footer className="blockquote-footer" id="author">Author: {this.props.author}</footer>
            <br/>
            <div className="btn-group" role="group" aria-label="button groups">
              <a target="_blank" href={tweetHrefValue} className="btn btn-outline-primary" id="tweet-quote">
                <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
              </a>
              <button onClick={this.renderNewQuote} className="btn btn-outline-primary" id="new-quote">
                <i className="fa fa-refresh fa-2x" aria-hidden="true"></i>
              </button>
            </div>
          </blockquote>
          </div>
        </div>
      );
    } else {
      return(
        <div className="container">
          <div id="quote-box" className="jumbotron">
            <h6 className="mb-1">Loading...</h6>
          </div>
        </div>
      );
    }
  }
}

export default MainContainer;
