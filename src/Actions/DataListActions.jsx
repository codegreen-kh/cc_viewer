export const GET_OTPIONS_LIST = 'GET_OTPIONS_LIST';
export const GET_ALL_COINS_LIST = 'GET_ALL_COINS_LIST';
export const GET_COIN_NAME = 'GET_COIN_NAME';
export const GET_CRYPTO_TO_RENDER = 'GET_CRYPTO_TO_RENDER';
export const GET_SELECTED_CRYPTO = 'GET_SELECTED_CRYPTO';

export const optionsListAction = data => ({
    type: GET_OTPIONS_LIST,
    payload: data
});

export const allCoinsAction = data => ({
    type: GET_ALL_COINS_LIST,
    payload: data
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