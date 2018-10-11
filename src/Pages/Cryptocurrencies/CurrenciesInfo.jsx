import React from 'react';

export const CurrenciesInfo = ({price}) => {
    return(
        <div className="currenciesInfo">
            <p className="currenciesInfo__price">Price: {price}</p>
        </div>
    );
};