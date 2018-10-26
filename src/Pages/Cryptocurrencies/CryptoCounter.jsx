import React from 'react';
import './CryptoCounter.sass';

export class CryptoCounter extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '1'
        }
        this.value = '1';
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.value = e.target.value;
        this.dataFromCryptoCounter();
    }

    dataFromCryptoCounter = () => {
        this.props.dataFromCryptoCounter({name: this.props.crypto, value: this.value});
    };

    render() {
        return(
            <div className="cryptoCounter">
                <span className="cryptoCounter__name">{this.props.crypto}</span>
                <input className="cryptoCounter__count" type="number" min="1" value={this.state.value} onChange={this.handleInputChange} />
            </div>
        );
    };
};