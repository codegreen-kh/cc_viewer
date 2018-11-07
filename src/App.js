import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.sass';

import {Header} from "./Components/Header";
import CryptocurrenciesPage from './Pages/Cryptocurrencies/CryptocurrenciesPage';
import {Footer} from "./Components/Footer";
import {AllCoins} from './Pages/AllCoins/AllCoins';
import {OHLCV} from "./Pages/HistoricalOHLCV/OHLCV";
import {TopExchangesPage} from "./Pages/TopExchanges/TopExchangesPage";
import {NewsPage} from "./Pages/News/NewsPage";
import {ForOFor} from './Pages/404';
import { connect } from 'react-redux';
import { optionsListAction } from './Actions/DataListActions';
import { allCoinsAction } from "./Actions/DataListActions";

class CryptoApp extends React.Component {

    getData = () => {
        fetch('https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD')
            .then((res) => res.json())
            .then((data) => {
                this.props.allCoinsAction(data.Data);
                return (data.Data);
            })
            .then((data) => data.map((item) => {return {name: item.CoinInfo.Name, fullName: item.CoinInfo.FullName}}))
            .then((data) => data.map((item) => <option value={item.name} key={item.name}>{item.fullName}</option>))
            .then((data) => this.props.optionsListAction(data));
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
                        <Route exact path="/" component={() => {return <CryptocurrenciesPage/>}} />
                        <Route path="/cryptocurrencies" component={() => {return <CryptocurrenciesPage/>}} />
                        <Route path="/ohlcv" component={() => {return <OHLCV list={this.props.optionsList}/>}} />
                        <Route path="/topexchanges" component={() => {return <TopExchangesPage list={this.props.optionsList}/>}} />
                        <Route path="/news" component={() => {return <NewsPage/>}} />
                        <Route path="/coins" component={() => {return <AllCoins data={this.props.data}/>}} />
                        <Route component={ForOFor} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    };
};

const mapStateToProps = state => ({
    data: state.getDataReducer.data,
    optionsList: state.getDataReducer.optionsList
});

const mapDispatchToProps = {
    optionsListAction,
    allCoinsAction
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CryptoApp);

export default App;
