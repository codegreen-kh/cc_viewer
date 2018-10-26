import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";
import {CryptoCounter} from "./CryptoCounter";
import {CurrencyViewer} from "./CurrencyViewer";
import './CryptocurrenciesPage.sass'

export class CryptocurrenciesPage extends React.Component{
    constructor() {
        super();
        this.state = {
            coinsPrice: [],
            coins: [],
            currencies: ["USD", "EUR"],
            currArr: [],
            counterData: []
        };
        this.coinsPrice = [];
        this.z = [];
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
        this.setState({coins: dataFromChild});
        this.coinsPrice = [];
        dataFromChild.map((item) => {return this.getCryptoPrice(item)});
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
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                </div>
                <div className="cryptocurrencies__info">
                    <div className="counter">
                        {this.state.coins.map((item) => < CryptoCounter crypto={item} key={item} dataFromCryptoCounter={this.getDataFromCryptoCounter} />)}
                    </div>
                    <div className="viewer">
                        {this.state.coins.map((item) => this.state.currArr.map((i) => < CurrencyViewer count={this.state.counterData} prices={this.state.coinsPrice} key={i} name={item} currency={i}/>))}
                    </div>
                </div>
            </div>
        );
    };
};