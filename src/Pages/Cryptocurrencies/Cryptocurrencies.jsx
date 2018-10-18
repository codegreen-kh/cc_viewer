import React from 'react';
import {CurrencySelector} from "./CurrencySelector";
import $ from "jquery";
import './Cryptocurrencies.sass'
import {CurrenciesInfo} from "./CurrenciesInfo";

export class Cryptocurrencies extends React.Component{
    constructor() {
        super();
        this.state = {
            response: {},
            filteredData: [],
            list: [],
            coinName: "",
            coinPrice: {}
        };
    }

    getData() {
        $.ajax({
            method: "get",
            url: "https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD",
            dataType: "json"
        })
            .done((data) => {
                this.setState({response: data});
                this.filterData();
                this.createOptionsList();
            });
    };

    getCurrencyInfo = () => {
        const coinName = this.state.coinName;
        const str = `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=USD,EUR`;

        $.ajax({
            method: "get",
            url: str,
            dataType: "json"
        })
            .done((data) => {
                this.setState({coinPrice: data});
            });
    };

    filterData = () => {
        const data = this.state.response.Data;
        const res = data !== undefined ? data.map((item) => {return({name: item.CoinInfo.Name, fullName: item.CoinInfo.FullName})}) : data;
        this.setState({filteredData: res});
    };

    createOptionsList = () => {
        const data = this.state.filteredData;
        const res = data.map((item) => <option value={item.name} key={item.name}>{item.fullName}</option>);
        this.setState({list: res});
    }

    componentDidMount() {
        this.getData();
    }

    getStateFromChild = (dataFromChild) => {
        this.setState({coinName: dataFromChild});
        this.getCurrencyInfo();
    };

    render() {
        return (
            <div className="cryptocurrencies">
                < CurrencySelector data={this.state.list} callbackFromParent={this.getStateFromChild}/>
                < CurrenciesInfo data={this.state.coinPrice}/>
            </div>
        );
    };
};