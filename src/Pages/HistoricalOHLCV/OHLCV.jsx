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
            period: "histoday",
            labels: [],
            priceDatasets: [],
            volumeDatasets: [],
            compareDatasets: [],
            compareLabels: []
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
                            this.setState({coinsData: this.data}, () => {
                                this.dataForPriceChart();
                                this.dataForVolumeChart();
                            });
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

    dataForPriceChart() {
        const data = this.state.coinsData.map((item) => [{data: item.Data}, {crypto: item.crypto}, {currency: item.currency}, {period: item.period}]);
        const nonFilteredlabels = data[0][0].data.map((item) => item.time);
        const labels = nonFilteredlabels.map((item) => {
            const fullDate = new Date(item * 1000);
            const date = fullDate.toLocaleDateString("en-US");
            const time = fullDate.toLocaleTimeString("en-US");
            return (`${date} ${time}`);
        });
        const datasets = data.map((item) => {
            const [crypto] = item.filter((i) => i.crypto);
            const [currency] = item.filter((i) => i.currency);
            const prices = item[0].data.map((i) => i.open);
            return ({label: `${crypto.crypto} - ${currency.currency}`, data: prices});
        });
        this.setState({labels: labels, priceDatasets: datasets}, () => this.forceUpdate());
    };

    dataForVolumeChart() {
        const data = this.state.coinsData.map((item) => [{data: item.Data}, {crypto: item.crypto}, {currency: item.currency}, {period: item.period}]);
        const datasets = data.map((item) => {
            const [crypto] = item.filter((i) => i.crypto);
            const [currency] = item.filter((i) => i.currency);
            const prices = item[0].data.map((i) => i.volumefrom);
            return ({label: `${crypto.crypto} - ${currency.currency}`, data: prices});
        });
        this.setState({volumeDatasets: datasets});
    };

    render() {
        return(
            <div className="ohlcv">
                <div className="cryptocurrencies__selectors">
                    < TimeIntervalSelector dataFromTimeIntervalSelecror={this.getDataFromTimeIntervalSelector} period={this.state.period}/>
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                    < CurrencySelector currencies={this.state.currencies} dataFromCurrencySelector={this.getDataFromCurrencySelector} />
                    < ChartOHLCV labels={this.state.labels} datasets={this.state.priceDatasets}/>
                    < VolumeChartOHLCV labels={this.state.labels} datasets={this.state.volumeDatasets}/>
                </div>
            </div>
        );
    };
};