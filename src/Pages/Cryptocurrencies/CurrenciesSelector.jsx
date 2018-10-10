import React from 'react';
import $ from "jquery";

const getList = (obj) => Object.keys(obj).map((key) => <option value={key} key={key}>{key}</option>);

export const CurrenciesSelector = ({crypto}) => {
    const getPrice = (obj) => {
        const value = $('.currencySelector__currencies').val();
        const res = obj[value];
        console.log (res);
    };

    return(
        <div className="currencySelector">
            <select name="currencies" className="currencySelector__currencies">
                {getList(crypto)};
            </select>
            <input type="number" className="currencySelector__count" placeholder="count"/>
            <button onClick={() => {getPrice(crypto)}}>info</button>
            <div className="currenciesInfo">
                <p className="currenciesInfo__price">Price:</p>
            </div>
        </div>
    );
};