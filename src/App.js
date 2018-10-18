import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.sass';

import {Header} from "./Components/Header";
import {Cryptocurrencies} from './Pages/Cryptocurrencies/Cryptocurrencies';
import {Footer} from "./Components/Footer";
import {AllCoins} from './Pages/AllCoins/AllCoins';
import {OHLCV} from "./Pages/HistoricalOHLCV/OHLCV";
import {TopExchanges} from "./Pages/TopExchanges/TopExchanges";
import {News} from "./Pages/News/News";
import {ForOFor} from './Pages/404';

class App extends React.Component {
    render() {
        return(
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={() => {return <Cryptocurrencies />}} />
                        <Route path="/cryptocurrencies" component={() => {return <Cryptocurrencies />}} />
                        <Route path="/ohlcv" component={() => {return <OHLCV />}} />
                        <Route path="/topexchanges" component={() => {return <TopExchanges/>}} />
                        <Route path="/news" component={() => {return <News/>}} />
                        <Route path="/coins" component={() => {return <AllCoins />}} />
                        <Route component={ForOFor} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    };
};

export default App;
