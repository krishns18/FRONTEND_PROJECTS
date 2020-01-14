import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return(

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <h1 className="navbar-brand mx-auto d-block text-center order-0 order-md-1 w-25"
            id="title">QUOTE OF THE DAY</h1>
      </nav>
    );
  }
}

export default Navbar;
