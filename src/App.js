import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.sass';

import {Header} from "./Components/Header";
import {CurrenciesSelector} from './Pages/Cryptocurrencies/CurrenciesSelector';
import {Footer} from "./Components/Footer";
import {AllCoins} from './Pages/AllCoins/AllCoins';
import {ForOFor} from './Pages/404';

const crypto = {
    btc: {
        price: 6608.25
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

const App = () => {
    return(
        <BrowserRouter>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={() => {return <CurrenciesSelector crypto={crypto}/>}} />
                    <Route exact path="/cryptocurrencies" component={() => {return <CurrenciesSelector crypto={crypto}/>}} />
                    <Route path="/ohlcv" component={() => {return <CurrenciesSelector crypto={crypto}/>}} />
                    <Route path="/topexchanges" component={() => {return <CurrenciesSelector crypto={crypto}/>}} />
                    <Route path="/news" component={() => {return <CurrenciesSelector crypto={crypto}/>}} />
                    <Route path="/coins" component={() => {return <AllCoins />}} />
                    <Route component={ForOFor} />
                </Switch>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
