import React, { Component } from 'react';
import './App.css';
import Home from './components/home'
import store from './store/configureStore'

class App extends Component {
  render() {
    return (
        <Home/>     
    );
  }
}


export default App;
