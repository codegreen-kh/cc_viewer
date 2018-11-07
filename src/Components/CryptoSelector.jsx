import React from 'react';
import './CryptoSelector.sass'

export class CryptoSelector extends React.Component {
    constructor() {
        super();
        this.state = {
            coinName: "BTC",
            toRender: []
        };
        this.coins = [];
        this.coinsToRender = [];
    };

    handleSelectChange = (e) => {
        this.setState({coinName: e.target.value});
    };

    addCoin = () => {
        const coin = this.state.coinName;
        if (this.coins.length === 2 || this.coins.includes(coin)) {
            return;
        } else {
            this.coins.push(coin);
            this.renderCoin();
        }
        this.dataFromCryptoSelector();
    };

    renderCoin = () => {
        this.coinsToRender = this.coins.map((item) =>
            <span id={item} key={item} className="cryptoSelector__coin">{item}<button id={item + "_delete"} onClick={() => this.deleteCoin(item)} className="cryptoSelector__coin-delete">X</button></span>
        );
        this.setState({toRender: this.coinsToRender});
    };

    deleteCoin = (i) => {
        const list = this.coins.filter((item) => item !== i);
        this.coins = list;
        console.log (this.coins);
        this.renderCoin();
        this.dataFromCryptoSelector();
    };

    dataFromCryptoSelector = () => {
        this.props.dataFromCryptoSelector(this.coins);
    };

    render() {
        return(
            <div className="cryptoSelector">
                <div className="cryptoSelector__selector">
                    <select name="cryptoSelector__select" onChange={this.handleSelectChange} className="cryptoSelector__select">{this.props.optionsList}</select>
                    <button onClick={this.addCoin} className="cryptoSelector__addCoin">add</button>
                </div>
                <div className="cryptoSelector__addedCoins" id="cryptoSelector__addedCoins">{this.state.toRender}</div>
            </div>
        );
    };
};