import React from 'react';
import ReactDOM from 'react-dom';
import './CurrencySelector.sass'

export class CurrencySelector extends React.Component {
    state = {
        coinName: "BTC"
    }
    handleSelectChange = (e) => {
        this.setState({coinName: e.target.value});
    };

    addCurrency = () => {
        const id = `currencySelector__coin_${this.state.coinName}`;
        const elem = (
            <span id={id} key={id} className="currencySelector__coin">{this.state.coinName}<button onClick={this.deleteCurrency} className="currencySelector__coin-close">X</button></span>
        );
        ReactDOM.render(elem, document.getElementById('currencySelector__addedCoins'));
        this.giveStateData();
    };

    deleteCurrency = () => {
        this.setState({coinName: "BTC"});
        ReactDOM.unmountComponentAtNode(document.getElementById("currencySelector__addedCoins"));
    };

    giveStateData = () => {
        this.props.callbackFromParent(this.state.coinName);
    };

    render() {
        return(
            <div className="CurrencySelector">
                <select name="currencySelector" onChange={this.handleSelectChange} className="currencySelector__select">{this.props.data}</select>
                <button onClick={this.addCurrency}>add</button>
                <div className="currencySelector__addedCoins" id="currencySelector__addedCoins">
                </div>
            </div>
        );
    };
};