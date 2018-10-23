import React from 'react';
import {CurrencySelector} from "../../Components/CurrencySelector";
import './Cryptocurrencies.sass'

export class Cryptocurrencies extends React.Component{
    constructor() {
        super();
        this.reqInfo = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        };
        this.state = {
            optionsList: [],
            currencies: [],
            coinsInfo: {}
        };
        this.coinsInfoArr = [];
    };

    getData = () => {
        fetch('https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD', this.reqInfo)
            .then((res) => res.json())
            .then((data) => data.Data)
            .then((data) => data.map((item) => {return {name: item.CoinInfo.Name, fullName: item.CoinInfo.FullName}}))
            .then((data) => {
                this.setState({currencies: data});
                return data;
            })
            .then((data) => data.map((item) => <option value={item.name} key={item.name}>{item.fullName}</option>))
            .then((data) => this.setState({optionsList: data}));
    };

    getCryptoPrice = (coinName) => {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=USD,EUR`;
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then((data) => {
                data.coinName = coinName;
                return data;
            })
            .then((data) => this.coinsInfoArr.push(data))
            .then(() => this.setState({coinsInfo: this.coinsInfoArr}));
    };

    getStateDataFromChild = (dataFromChild) => {
        this.coinsInfoArr = [];
        dataFromChild.map((item) => {return this.getCryptoPrice(item)});
    };

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="cryptocurrencies">
                < CurrencySelector optionsList={this.state.optionsList} coinsInfo={this.state.coinsInfo} currencies={this.state.currencies} callbackFromParent={this.getStateDataFromChild}/>
            </div>
        );
    };
};