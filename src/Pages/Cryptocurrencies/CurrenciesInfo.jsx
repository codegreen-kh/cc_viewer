import React from 'react';
import './CurrenciesInfo.sass'

export const CurrenciesInfo = ({data}) => {
    return(
        <div className="currenciesInfo">
            <p>USD: {data.USD}</p>
            <p>EUR: {data.EUR}</p>
        </div>
    );
};