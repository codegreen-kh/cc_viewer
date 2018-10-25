import React from 'react';
import './CurrencyViewer.sass';

export const CurrencyViewer = ({prices, name, currency, count}) => {
    const price = prices.filter((item) => item.coinName === name);
    const curr = price.map((item) => item[currency]);
    const res = name === count[0] ? Math.round((curr * count[1]) * 100) / 100 : curr;

    return(
        <div className="currencyViewer">
            <span>{`${currency}: ${res}`}</span>
        </div>
    );
};