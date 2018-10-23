import React from 'react';
import './CurrenciesInfo.sass'

export class CurrenciesInfo extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            name: "USD"
        };
    };

    getData = () => {
        const data = this.props.info;
        const newData = Object.keys(data[0]).filter((item) => item !== "coinName");
        this.createList(newData);
    };

    createList = (data) => {
        const list = data.map((item) => <option value={item} key={item}>{item}</option>);
        this.setState({data: list});
    };

    handleSelectChange(e) {
        this.setState({name: e.target.value});
    };

    sendData = () => {
        this.props.callbackFromParent(this.state.name);
    };

    render() {
        return(
            <div className="currenciesInfo">
                <select name="currenciesInfo__select" onChange={this.handleSelectChange.bind(this)} className="currenciesInfo__select">{this.state.data}</select>
                <button className="currenciesInfo__getCoin" onClick={this.getData}>get</button>
                <button className="currenciesInfo__addCoin" onClick={this.sendData}>send</button>
                <div className="currenciesInfo__addedCoins">
                </div>
            </div>
        );
    }
}