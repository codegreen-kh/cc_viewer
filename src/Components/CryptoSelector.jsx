import React from 'react';
import './CryptoSelector.sass'
import {coinNameAction, cryptoToRenderAction, selectedCryptoAction} from "../Actions/DataListActions";
import { connect } from 'react-redux';

class CrSelector extends React.Component {
    handleSelectChange = (e) => {
        this.props.coinNameAction(e.target.value);
    };

    addCoin = () => {
        const selectedCrypto = this.props.selectedCrypto;
        if (selectedCrypto.length === 2 || selectedCrypto.includes(this.props.coinName)) {
            return;
        } else {
            selectedCrypto.push(this.props.coinName);
            this.props.selectedCryptoAction(selectedCrypto);
            this.renderCoin(this.props.selectedCrypto);
        }
        this.dataFromCryptoSelector(this.props.selectedCrypto);
    };

    renderCoin = (list) => {
        const data = list.map((item) =>
            <span id={item} key={item} className="cryptoSelector__coin">{item}<button id={item + "_delete"} onClick={() => this.deleteCoin(item)} className="cryptoSelector__coin-delete">X</button></span>
        );
        this.props.cryptoToRenderAction(data);
    };

    deleteCoin = (i) => {
        const list = this.props.selectedCrypto.filter((item) => item !== i);
        this.props.selectedCryptoAction(list);
        this.renderCoin(list);
        this.dataFromCryptoSelector(list);
    };

    dataFromCryptoSelector = (list) => {
        this.props.dataFromCryptoSelector(list);
    };

    render() {
        return(
            <div className="cryptoSelector">
                <div className="cryptoSelector__selector">
                    <select defaultValue={this.props.coinName} name="cryptoSelector__select" onChange={this.handleSelectChange} className="cryptoSelector__select">{this.props.optionsList}</select>
                    <button onClick={this.addCoin} className="cryptoSelector__addCoin">add</button>
                </div>
                <div className="cryptoSelector__addedCoins" id="cryptoSelector__addedCoins">{this.props.cryptoToRender}</div>
            </div>
        );
    };
};

const mapStateToProps = state => ({
    coinName: state.getDataReducer.coinName,
    cryptoToRender: state.getDataReducer.cryptoToRender,
    selectedCrypto: state.getDataReducer.selectedCrypto
});

const mapDispatchToProps = {
    coinNameAction,
    cryptoToRenderAction,
    selectedCryptoAction
};

export const CryptoSelector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CrSelector);