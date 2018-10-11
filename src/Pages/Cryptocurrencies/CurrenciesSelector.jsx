import React from 'react';
import $ from "jquery";

import {CurrenciesInfo} from "./CurrenciesInfo";

const getList = (obj) => Object.keys(obj).map((key) => <option value={key} key={key}>{key}</option>);

export const CurrenciesSelector = ({currencies}) => {
    const getPrice = (obj) => {
        const value = $('.currencySelector__currencies').val();
        const res = obj[value];
        console.log (res);
    };

    return (
        <div className="currencySelector">
            <select name="currencies" className="currencySelector__currencies">
                {getList(currencies)};
            </select>
            <input type="number" className="currencySelector__count" placeholder="count"/>
            <button onClick={() => {getPrice(currencies)}}>info</button>
            <CurrenciesInfo price={0}/>
        </div>
    );
};