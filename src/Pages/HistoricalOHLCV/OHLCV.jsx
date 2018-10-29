import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";
import './OHCLV.sass';

export class OHLCV extends React.Component {
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

    getFullData = (coinName) => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinName}&tsyms=USD,EUR`;
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then((data) => this.coinsData.push(data))
            .then(() => this.setState({coinsData: this.coinsData}))
    }

    getDataFromCurrencySelector = (dataFromChild) => {
        this.setState({currArr: dataFromChild});
    };

    getDataFromCryptoSelector = (dataFromChild) => {
        this.setState({coins: dataFromChild});
        this.coinsData = [];
        dataFromChild.map((item) => {return this.getFullData(item)});
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