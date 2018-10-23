import React from 'react';

export const CurrenciesPrice = ({data}) => {
    console.log (data);
    return(
        <div className="currenciesPrice">
            <span>{data}</span>
        </div>
    );
};