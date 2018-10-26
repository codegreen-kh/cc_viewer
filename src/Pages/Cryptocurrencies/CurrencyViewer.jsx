import React from 'react';
import './CurrencyViewer.sass';

export const CurrencyViewer = ({prices, name, currency, count}) => {
    const thisCount = count.filter((item) => item.name === name);

    const n = thisCount.map((item) => item.name);
    const v = thisCount.map((item) => item.value);

    const price = prices.filter((item) => item.coinName === name);
    const curr = price.map((item) => item[currency]);
    const res = name === n[0] ? Math.round((curr * v[0]) * 100) / 100 : curr;

    return(
        <div className="currencyViewer">
            <span>{`${currency}: ${res}`}</span>
        </div>
    );
};