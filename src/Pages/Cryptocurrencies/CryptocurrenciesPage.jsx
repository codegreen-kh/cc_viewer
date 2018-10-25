import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";
import {CryptoCounter} from "./CryptoCounter";
import './CryptocurrenciesPage.sass'

export class CryptocurrenciesPage extends React.Component{
    constructor() {
        super();
        this.state = {
            coinsPrice: [],
            coins: [],
            currencies: ["USD", "EUR"],
            currArr: [],
            counterData: {}
        };
        this.coinsPrice = [];
    };

    getCryptoPrice = (coinName) => {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=USD,EUR`;
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then((data) => {
                data.coinName = coinName;
                return data;
            })
            .then((data) => this.coinsPrice.push(data))
            .then(() => this.setState({coinsPrice: this.coinsPrice}));
    };

    getDataFromCryptoSelector = (dataFromChild) => {
        console.log (dataFromChild);
        this.setState({coins: dataFromChild});
        this.coinsPrice = [];
        dataFromChild.map((item) => {return this.getCryptoPrice(item)});
        this.dataForView();
    };

    getDataFromCurrencySelector = (dataFromChild) => {
        console.log (dataFromChild);
        this.setState({currArr: dataFromChild});
    };

    getDataFromCryptoCounter = (dataFromChild) => {
        console.log (dataFromChild);
        this.setState({counterData: dataFromChild});
    };

    render() {
        return (
            <div className="cryptocurrencies__page">
                <div className="cryptocurrencies__selectors">
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                </div>
                <div className="cryptocurrencies__info">
                    {this.state.coins.map((item) => < CryptoCounter dataFromCryptoCounter={this.getDataFromCryptoCounter} crypto={item} key={item} />)}
                </div>
            </div>
        );
    };
};