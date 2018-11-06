import { GET_OTPIONS_LIST } from '../Actions/DataListActions';
import { GET_ALL_COINS_LIST } from '../Actions/DataListActions';

const initialState = {
    optionsList: [],
    data: []
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
        default:
            return state;
    }
}