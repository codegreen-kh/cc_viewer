import React from 'react';
import {CryptoSelector} from "../../Components/CryptoSelector";
import {TopExchangesVolumeInfo} from "./TopExchangesVolumeInfo";
import './TopExchangesPage.sass'

export class TopExchangesPage extends React.Component {
    constructor() {
        super();
        this.state = {
            coinsData: [],
            counterData: [],
            coins: []
        };
        this.coinsData = [];
    };

    getData = (coinName) => {
        console.log (coinName);
        const url = `https://min-api.cryptocompare.com/data/top/volumes?tsym=${coinName}&limit=4`;
        fetch(url, this.reqInfo)
            .then((res) => res.json())
            .then(((data) => {
                data.coinName = coinName;
                return data;
            }))
            .then((data) => this.coinsData.push(data))
            .then(() => this.setState({coinsData: this.coinsData}));
    };

    getDataFromCryptoSelector = (dataFromChild) => {
        if (dataFromChild.length === 0) {
            this.setState({coinsData: []});
        } else {
            this.coinsData = [];
            this.setState({coins: dataFromChild}, () => this.state.coins.map((item) => {return this.getData(item)}));
        }
    };

    render() {
        return(
            <div className="topExchanges">
                <div className="cryptocurrencies__selectors">
                    < CryptoSelector optionsList={this.props.list} dataFromCryptoSelector={this.getDataFromCryptoSelector} />
                </div>
                <div className="topExchanges__info">
                    <p>
                        Get top coins by volume for the to currency. It returns volume24hto and total supply (where available). The number of coins you get is the minimum of the limit you set and the total number of coins available.
                    </p>
                </div>
                <div className="topExchanges__results">
                    {this.state.coinsData.map((item) => < TopExchangesVolumeInfo data={item} key={item.coinName}/>)}
                </div>
            </div>
        );
    };
};