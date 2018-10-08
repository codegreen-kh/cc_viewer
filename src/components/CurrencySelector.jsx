import React from 'react';
import $ from 'jquery';

const cList = (obj) => Object.keys(obj).map((key) => <option value={key} key={key}>{key}</option>);

function showInfo(obj) {
    const elem = $('.cc__info');
    const count = $('.currencySelector__count').val() === "" ? 1 : $('.currencySelector__count').val();
    $(elem).find('p').remove();
    const value = $('.currencySelector__currencies').val();
    const res = Object.keys(obj).filter((key) => key === value ? key : '');
    const price = obj[res.toString()].price;
    const info = obj[res.toString()].info;
    return (
        elem.append(`<p>price: ${price * count}</p>`),
        elem.append(`<p>info: ${info}</p>`)
    );
}

export const CurrencySelector = ({crypto}) => {
    return(
        <div className="currencySelector">
            <select name="currencies" className="currencySelector__currencies">
                {cList(crypto)};
            </select>
            <input type="number" className="currencySelector__count" placeholder="count"/>
            <button onClick={()=>{showInfo(crypto)}}>info</button>
            <div className="cc__info"></div>
        </div>
    );
};