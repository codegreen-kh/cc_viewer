import React from 'react';
import {Coin} from "./Coin";
import './AllCoins.sass';

export class AllCoins extends React.Component{
    constructor() {
        super();
        this.state = {
            toRender: [],
            newData: []
        };
        this.allowed = ['Id', 'FullName', 'ImageUrl', 'Url'];
    };

    filterData = () => {
        const filteredData = this.props.data.map((item) => Object.keys(item.CoinInfo).filter((key) => this.allowed.includes(key)).reduce((obj, key) => {
            obj[key] = item.CoinInfo[key].toLowerCase();
            return obj;
        }, {}));
        this.setState({newData: filteredData});

        //url//

        const url_string = window.location.href;
        const url = new URL(url_string);
        const id = url.searchParams.get("id");
        const result = id ? filteredData.filter((item) => item.Id === id) : filteredData;

        //url end//

        this.renderData(result);
    };

    renderData = (filtered) => {
        const currentState = window.history.state;
        if (filtered.length > 1) {
            window.history.replaceState(currentState, 'coins', '/coins');
            const res = filtered.map((item) => <Coin data={item} key={item.FullName}/>);
            this.setState({toRender: res});
        } else {
            const res = filtered.map((item) => {
                window.history.replaceState(currentState, 'coins', `/coins?id=${item.Id}`);
                return(
                    <Coin data={item} key={item.FullName}/>
                );
            });
            this.setState({toRender: res});
        }
    };

    handleInputChange = (e) => {
        const inputValue = e.target.value.toLowerCase();
        const stripedVal = inputValue.replace(/<(?:.|\n)*?>/gm, '');
        const filtered = this.state.newData.filter((item) => item.FullName === stripedVal);
        if (filtered.length === 0) {
            this.renderData(this.state.newData);
        } else {
            this.renderData(filtered);
        }
    };

    componentDidMount() {
        this.filterData();
    }

    render() {
        return(
            <div className="allCoins">
                <div>
                    <p>
                        Returns all the coins that CryptoCompare has added to the website. This is not the full list of coins we have in the system, it is just the list of coins we have done some research on.
                    </p>
                </div>
                <div className="allCoins__input">
                    <label htmlFor="">enter coin name here<input type="text" onChange={this.handleInputChange}/></label>
                </div>
                <div className="allCoins__coins">{this.state.toRender}</div>
            </div>
        );
    };
};