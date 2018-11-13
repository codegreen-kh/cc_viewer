import React from "react";

export const GET_OTPIONS_LIST = 'GET_OTPIONS_LIST';
export const REQUEST_ALL_COINS_LIST = 'REQUEST_ALL_COINS_LIST';
export const RECEIVE_ALL_COINS_LIST = 'RECEIVE_ALL_COINS_LIST';
export const ERROR_ALL_COINS_LIST = 'ERROR_ALL_COINS_LIST';
export const GET_COIN_NAME = 'GET_COIN_NAME';
export const GET_CRYPTO_TO_RENDER = 'GET_CRYPTO_TO_RENDER';
export const GET_SELECTED_CRYPTO = 'GET_SELECTED_CRYPTO';

export const optionsListAction = data => ({
    type: GET_OTPIONS_LIST,
    payload: data
});

export const requestAllCoinsAction = () => ({
    type: REQUEST_ALL_COINS_LIST
});

export const receiveAllCoinsAction = data => ({
    type: RECEIVE_ALL_COINS_LIST,
    payload: data
});

export const errorAllCoinsAction = err => ({
    type: ERROR_ALL_COINS_LIST,
    payload: err
});

export const coinNameAction = data => ({
    type: GET_COIN_NAME,
    payload: data
});

export const cryptoToRenderAction = data => ({
    type: GET_CRYPTO_TO_RENDER,
    payload: data
});

export const selectedCryptoAction = data => ({
    type: GET_SELECTED_CRYPTO,
    payload: data
});

export const getAllCoins = () => {
    requestAllCoinsAction();
    return dispatch => {
        fetch('https://min-api.cryptocompare.com/data/top/totalvol?limit=20&tsym=USD')
            .then((res) => res.json())
            .then((data) => {
                dispatch(receiveAllCoinsAction(data.Data));
                return (data.Data);
            })
            .then((data) => data.map((item) => {return {name: item.CoinInfo.Name, fullName: item.CoinInfo.FullName}}))
            .then((data) => data.map((item) => <option value={item.name} key={item.name}>{item.fullName}</option>))
            .then((data) => dispatch(optionsListAction(data)))
            .catch((err) => dispatch(errorAllCoinsAction(err)));
    };
};