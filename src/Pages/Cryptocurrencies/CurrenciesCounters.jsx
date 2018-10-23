import React from 'react';

export const CurrenciesCounters = ({coins}) => {
    return (coins.map((item) => {return(
        <span key={item + "couner"} id={item + "couner"}>{item}: <input type="number"/></span>
    )}));
}