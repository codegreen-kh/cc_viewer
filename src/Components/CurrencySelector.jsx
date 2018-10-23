import React from 'react';
import ReactDOM from 'react-dom';
import './CurrencySelector.sass'

export class CurrencySelector extends React.Component {
    constructor() {
        super();
        this.state = {
            coinName: "BTC"
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
            this.setState({coins: this.coins});
        }
        this.sendStateDataToParent();
        this.renderCoin();
    };

    renderCoin = () => {
        this.coinsToRender.push(this.state.coinName);
        const arr = this.coinsToRender.map((item) => {
            return (<span id={item} key={item} className="currencySelector__coin">{item}<button id={item + "_delete"} onClick={this.deleteCoin} className="currencySelector__coin-delete">X</button></span>);
        });
        ReactDOM.render(arr, document.getElementById('currencySelector__addedCoins'));
    };

    deleteCoin = (e) => {
        const target = e.target.id;
        const val = document.getElementById(target).parentElement.id;
        this.coinsToRender.forEach((item,i) => {
            if (item === val) {
                this.coinsToRender.splice(i,1);
                this.coins.splice(i,1);
                this.setState({coinName: ""});
            }
        });
    };

    sendStateDataToParent = () => {
        this.props.callbackFromParent(this.coins);
    };

    render() {
        return(
            <div className="currencySelector">
                <select name="currencySelector__select" onChange={this.handleSelectChange} className="currencySelector__select">{this.props.optionsList}</select>
                <button onClick={this.addCoin} className="currencySelector__addCoin">add</button>
                <div className="currencySelector__addedCoins" id="currencySelector__addedCoins">
                </div>
            </div>
        );
    };
};