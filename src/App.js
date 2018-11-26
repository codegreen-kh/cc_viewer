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
import { getAllCoins } from "./Actions/DataListActions";

class CryptoApp extends React.Component {

    componentDidMount() {
        this.props.getAllCoins();
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
    getAllCoins
};

const App = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CryptoApp);

export default App;
