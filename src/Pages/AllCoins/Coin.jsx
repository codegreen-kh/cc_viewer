import React from 'react';
import './Coin.sass'

export const Coin = ({data}) => {

    const cryptocompare = 'https://www.cryptocompare.com';

    const url = cryptocompare + data.Url;
    const fullName = data.FullName;
    const imageUrl = cryptocompare + data.ImageUrl;

    return(
        <div className="coin">
            <a href={url}>
                <img className="coin__img" src={imageUrl} alt={fullName}/>
            </a>
            <h4>{fullName}</h4>
        </div>
    );
};