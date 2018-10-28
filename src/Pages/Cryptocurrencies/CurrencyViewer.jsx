import React from 'react';
import Dropdown from 'react-dropdown';
import './CurrencyViewer.sass';

export const CurrencyViewer = ({coinsData, name, currency, count}) => {

    // price //
    const raw = coinsData.map((item) => item.RAW);
    const crypto = raw.filter((item) => item[name]);
    const allCurrencies = crypto.map((item) => item[name]);
    const thisCurrency = allCurrencies.map((item) => item[currency]);
    const price = thisCurrency.map((item) => item["PRICE"]);
    const thisCount = count.filter((item) => item.name === name);
    const n = thisCount.map((item) => item.name);
    const v = thisCount.map((item) => item.value);
    const res = name === n[0] ? Math.round((price * v[0]) * 100) / 100 : price;
    // price END//

    // info //
    const display = coinsData.map((item) => item.DISPLAY);
    const cryptoD = display.filter((item) => item[name]);
    const allCurrenciesD = cryptoD.map((item) => item[name]);
    const thisCurrencyD = allCurrenciesD.map((item) => item[currency]);
    const options = thisCurrencyD.map((item) => Object.keys(item).map((key) => <p key={key}>{key}: {item[key]}</p>));
    // info END//

    return(
        <div className="currencyViewer">
            <div className="currencyViewer__dropdown">
                <Dropdown className="currencyViewer__dropdownItem" options={options} value={`${currency}: ${res}`} placeholder="Select an option" />
            </div>
        </div>
    );
};