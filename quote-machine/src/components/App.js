import React, { Component } from 'react';
import '../bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import Navbar from './Navbar';
import MainContainer from './MainContainer';

const ROOT_URL="https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
class App extends Component {
  state = {
    list: [],
    quote: '',
    author: ''
  }
  handleNewQuote = () => {
      this.generateRandomQuote();
  }

  generateRandomQuote = () => {
    if(this.state.list.length > 0) {
      let randomVar = Math.floor(Math.random() * this.state.list.length);
      let quote = this.state.list[randomVar]["quote"];
      let author = this.state.list[randomVar]["author"];
      this.setState({
        quote: quote,
        author: author
      });
    }

  }
  getQuotes = async () => {
    const api_call = await fetch(`${ROOT_URL}`);
    const data = await api_call.json();
    if(data) {
      this.setState({list: data.quotes});
      this.generateRandomQuote();
    }
  }
  componentDidMount() {
    this.getQuotes();
  }
  render() {
    return (
      <div className="App">
        <Navbar />
        <MainContainer quote={this.state.quote}
                       author={this.state.author}
                       generateQuote={this.generateRandomQuote}/>
      </div>
    );
  }
}

export default App;
