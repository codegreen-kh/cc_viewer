import {GET_COIN_NAME, coinNameAction} from "./DataListActions";

describe('get coin name action', ()=> {
    test('should get coin name from cryptoSelector', () => {
        const coin = "BTC";
        const expectedAction = {
            type: GET_COIN_NAME,
            payload: coin
        };
        expect(coinNameAction(coin)).toEqual(expectedAction);
    });
});