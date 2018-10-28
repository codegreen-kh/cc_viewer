import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.sass';

import {Header} from "./Components/Header";
import {CryptocurrenciesPage} from './Pages/Cryptocurrencies/CryptocurrenciesPage';
import {Footer} from "./Components/Footer";
import {AllCoins} from './Pages/AllCoins/AllCoins';
import {OHLCV} from "./Pages/HistoricalOHLCV/OHLCV";
import {TopExchanges} from "./Pages/TopExchanges/TopExchanges";
import {News} from "./Pages/News/News";
import {ForOFor} from './Pages/404';

class App extends React.Component {
    constructor() {
        super();
        this.reqInfo = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this.state = {
            currencies: [],
            optionsList: [],
            data: []
        };
    };

    getData = () => {
        fetch('https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD', this.reqInfo)
            .then((res) => res.json())
            .then((data) => {
                this.setState({data: data.Data});
                return (data.Data);
            })
            .then((data) => data.map((item) => {return {name: item.CoinInfo.Name, fullName: item.CoinInfo.FullName}}))
            .then((data) => {
                this.setState({currencies: data});
                return data;
            })
            .then((data) => data.map((item) => <option value={item.name} key={item.name}>{item.fullName}</option>))
            .then((data) => this.setState({optionsList: data}));
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return(
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path="/" component={() => {return <CryptocurrenciesPage list={this.state.optionsList}/>}} />
                        <Route path="/cryptocurrencies" component={() => {return <CryptocurrenciesPage list={this.state.optionsList}/>}} />
                        <Route path="/ohlcv" component={() => {return <OHLCV />}} />
                        <Route path="/topexchanges" component={() => {return <TopExchanges/>}} />
                        <Route path="/news" component={() => {return <News/>}} />
                        <Route path="/coins" component={() => {return <AllCoins data={this.state.data}/>}} />
                        <Route component={ForOFor} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    };
};

export default App;
