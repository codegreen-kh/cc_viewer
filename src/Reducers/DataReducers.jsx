import {GET_OTPIONS_LIST, GET_SELECTED_CRYPTO} from '../Actions/DataListActions';
import { GET_ALL_COINS_LIST } from '../Actions/DataListActions';
import { GET_COIN_NAME } from "../Actions/DataListActions";
import { GET_CRYPTO_TO_RENDER } from "../Actions/DataListActions";

const initialState = {
    optionsList: [],
    data: [],
    coinName: "BTC",
    cryptoToRender: [],
    selectedCrypto: []
};

export function getDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_OTPIONS_LIST:
            return {
                ...state,
                optionsList: action.payload,
            };
        case GET_ALL_COINS_LIST:
            return {
                ...state,
                data: action.payload,
            };
        case GET_COIN_NAME:
            return {
                ...state,
                coinName: action.payload,
            };
        case GET_CRYPTO_TO_RENDER:
            return {
                ...state,
                cryptoToRender: action.payload,
            };
        case GET_SELECTED_CRYPTO:
            console.log (action.payload);
            return {
                ...state,
                selectedCrypto: action.payload,
            };
        default:
            return state;
    }
}