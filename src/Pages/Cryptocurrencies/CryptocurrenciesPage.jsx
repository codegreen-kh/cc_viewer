import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";
import {CryptoCounter} from "./CryptoCounter";
import {CurrencyViewer} from "./CurrencyViewer";
import './CryptocurrenciesPage.sass'
import connect from "react-redux/es/connect/connect";

class Cryptocurrencies extends React.Component{
    constructor() {
        super();
        this.state = {
            coinsData: [],
            coins: [],
            currencies: ["USD"],
            currArr: [],
            counterData: []
        };
        this.coinsData = [];
        this.z = [];
    };

    getFullData = (coinName) => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinName}&tsyms=USD,EUR`;
        const currencies = url.split('&tsyms=').pop().split(',');
        this.setState({currencies: currencies});
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then((data) => this.coinsData.push(data))
            .then(() => this.setState({coinsData: this.coinsData}))
    }

    getDataFromCryptoSelector = (dataFromChild) => {
        this.setState({coins: dataFromChild});
        this.coinsData = [];
        dataFromChild.map((item) => {return this.getFullData(item)});
    };

    getDataFromCurrencySelector = (dataFromChild) => {
        this.setState({currArr: dataFromChild});
    };

    getDataFromCryptoCounter = (dataFromChild) => {
        this.z.push(dataFromChild);
        const c = this.z.filter((item) => item.name !== dataFromChild.name);
        c.push(dataFromChild);
        this.z = c;
        this.setState({counterData: this.z});
    };

    render() {
        return (
            <div className="cryptocurrencies__page">
                <div className="cryptocurrencies__selectors">
                    < CryptoSelector optionsList={this.props.optionsList} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                </div>
                <div className="cryptocurrencies__info">
                    <div className="counter">
                        {this.state.coins.map((item) => < CryptoCounter crypto={item} key={item} dataFromCryptoCounter={this.getDataFromCryptoCounter} />)}
                    </div>
                    <div className="viewer">
                        {this.state.coins.map((item) => this.state.currArr.map((i) => < CurrencyViewer count={this.state.counterData} coinsData={this.state.coinsData} key={i} name={item} currency={i}/>))}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    optionsList: state.getDataReducer.optionsList
});

const CryptocurrenciesPage = connect(
    mapStateToProps
)(Cryptocurrencies);

export default CryptocurrenciesPage;