import React, { Component } from 'react';
import '../bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import Navbar from './Navbar';
import MainContainer from './MainContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
