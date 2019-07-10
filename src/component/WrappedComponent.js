import React, { Component } from 'react';
import logo from '../image/logo.svg';
import HOC from './hoc'
class WrappedComponent extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {this.props.message}
          {this.refs.wrapper}
        </header>
      </div>
    );
  }
}
WrappedComponent.doTest=function(){
  console.log("do test")
}

export default HOC(WrappedComponent);