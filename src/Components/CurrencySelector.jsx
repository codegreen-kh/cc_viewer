import React from 'react';
import './CurrencySelector.sass'

export class CurrencySelector extends React.Component {
    constructor() {
        super();
        this.state = {
            currencies: [],
            currenciesList: [],
            coinName: "USD",
            toRender: []
        };
        this.coins = [];
        this.coinsToRender = [];
    };

    createList = (data) => {
        const list = data.map((item) => <option value={item} key={item}>{item}</option>);
        this.setState({currenciesList: list});
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
        this.dataFromCurrencySelector();
    };
    renderCoin = () => {
        this.coinsToRender = this.coins.map((item) => <span id={item} key={item} className="cryptoSelector__coin">{item}<button id={item + "_delete"} onClick={this.deleteCoin} className="cryptoSelector__coin-delete">X</button></span>);
        this.setState({toRender: this.coinsToRender});
    };

    deleteCoin = (e) => {
        const target = e.target.id;
        const coin = document.getElementById(target).parentElement.id;
        const list = this.coins.filter((item) => item !== coin);
        this.setState({coinName: coin});
        this.coins = list;
        this.renderCoin();
        this.dataFromCurrencySelector();
    };

    componentDidMount() {
        this.createList(this.props.currencies);
    }

    dataFromCurrencySelector = () => {
        this.props.dataFromCurrencySelector(this.coins);
    };

    render() {
        return(
            <div className="currencySelector">
                <div className="currencySelector__selector">
                    <select name="currencySelector__select" onChange={this.handleSelectChange} className="currencySelector__select">{this.state.currenciesList}</select>
                    <button className="currencySelector__addCurrency" onClick={this.addCoin}>add</button>
                </div>
                <div className="currencySelector__addedCurrencies">{this.state.toRender}</div>
            </div>
        );
    };
};