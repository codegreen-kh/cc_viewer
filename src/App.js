import React, { Component } from 'react';
import './App.sass';

import {Header} from "./components/Header";
import {CurrencySelector} from './components/CurrencySelector';
import {Footer} from "./components/Footer";



const crypto = {
    btc: {
        price: 6608.25,
        info: 'some info'
    },
    eth: {
        price: 225.77
    },
    xrp: {
        price: 0.45
    },
    bitcash: {
        price: 520.11
    },
    eos: {
        price:5.76
    }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CurrencySelector crypto={crypto}/>
        <Footer />
      </div>
    );
  }
}

export default App;
