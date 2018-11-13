import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";

export class TopExchangesPage extends React.Component {
    constructor() {
        super();
        this.state = {
            coinsData: [],
            currencies: ["USD", "EUR"],
            currArr: [],
            counterData: []
        };
        this.coinsData = [];
    };

    getData = (coinName, currency) => {
        const url = `https://min-api.cryptocompare.com/data/top/exchanges?fsym=${coinName}&tsym=${currency[0]}`;
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then((data) => this.coinsData.push(data))
            .then(() => this.setState({coinsData: this.coinsData}, () => console.log (this.state.coinsData)));
    };

    getDataFromCurrencySelector = (dataFromChild) => {
        this.setState({currArr: dataFromChild}, () => console.log (this.state.currArr));
    };

    getDataFromCryptoSelector = (dataFromChild) => {
        this.setState({coins: dataFromChild}, () => this.state.coins.map((item) => {return this.getData(item, this.state.currArr)}));
        this.coinsData = [];
        // dataFromChild.map((item) => {return this.getData(item, this.state.currArr)});
    };

    render() {
        return(
            <div className="ohlcv">
                <div className="cryptocurrencies__selectors">
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                </div>
            </div>
        );
    };
};