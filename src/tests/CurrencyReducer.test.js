import {actions, reducer, initialState} from '../reducers/CurrencyReducer';

test('it updates from currency', () => {
    const newState = reducer(initialState, { type: actions.SET_FROM_CURRENCY, data:'from currency changed'});
    expect(newState.fromCurrency).toBe('from currency changed');
});

test('it updates to currency', () => {
    const newState = reducer(initialState, { type: actions.SET_TO_CURRENCY, data:'to currency changed'});
    expect(newState.toCurrency).toBe('to currency changed');
});

test('it updates from number', () => {
    const newState = reducer(initialState, { type: actions.SET_FROM_NUMBER, data:'from number changed'});
    expect(newState.fromNumber).toBe('from number changed');
});

test('it updates to number', () => {
    const newState = reducer(initialState, { type: actions.SET_TO_NUMBER, data:'to number changed'});
    expect(newState.toNumber).toBe('to number changed');
});

