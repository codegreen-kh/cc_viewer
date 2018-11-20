import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {CurrencySelector} from "../../Components/CurrencySelector";
import {TimeIntervalSelector} from "./TimeIntervalSelector";
import {ChartOHLCV} from "./ChartOHLCV";
import {VolumeChartOHLCV} from "./VolumeChartOHLCV";
import './OHCLV.sass';

export class OHLCV extends React.Component {
    constructor() {
        super();
        this.state = {
            coinsData: [],
            currencies: ["USD", "EUR"],
            currArr: [],
            coinsArr: [],
            period: "histoday"
        };
        this.data = [];
    };

    getFullData = (coinsArr, currArr) => {
        const period = this.state.period;
        if (coinsArr.length > 0 && currArr.length > 0) {
            coinsArr.forEach((coin) => {
                currArr.forEach((curr) => {
                    const url = `https://min-api.cryptocompare.com/data/${period}?fsym=${coin}&tsym=${curr}&limit=9`;
                    fetch(url, this.reqInfo)
                        .then((res) => res.json())
                        .then((data) => {
                            data.crypto = coin;
                            data.currency = curr;
                            data.period = period;
                            this.data.push(data);
                            this.setState({coinsData: this.data}, () => this.forceUpdate());
                        });
                });
            });
        };
    };

    getDataFromCurrencySelector = (dataFromChild) => {
        this.data = [];
        this.setState({currArr: dataFromChild}, () => this.getFullData(this.state.coinsArr, this.state.currArr));
    };

    getDataFromCryptoSelector = (dataFromChild) => {
        this.data = [];
        this.setState({coinsArr: dataFromChild}, () => this.getFullData(this.state.coinsArr, this.state.currArr));
    };

    getDataFromTimeIntervalSelector = (dataFromChild) => {
        this.data = [];
        this.setState({period: dataFromChild}, () => this.getFullData(this.state.coinsArr, this.state.currArr));
    };

    render() {
        return(
            <div className="ohlcv">
                <div className="cryptocurrencies__selectors">
                    < TimeIntervalSelector dataFromTimeIntervalSelecror={this.getDataFromTimeIntervalSelector} period={this.state.period}/>
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                    < ChartOHLCV data={this.state.coinsData}/>
                    < VolumeChartOHLCV data={this.state.coinsData}/>
                </div>
            </div>
        );
    };
};