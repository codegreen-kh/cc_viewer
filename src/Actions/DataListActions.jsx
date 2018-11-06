export const GET_OTPIONS_LIST = 'GET_OTPIONS_LIST';
export const GET_ALL_COINS_LIST = 'GET_ALL_COINS_LIST';

export const optionsListAction = data => ({
    type: GET_OTPIONS_LIST,
    payload: data
});

export const allCoinsAction = data => ({
    type: GET_ALL_COINS_LIST,
    payload: data
})