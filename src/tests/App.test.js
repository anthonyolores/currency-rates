import CmpButton from '../components/Button';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react'

import {CurrencyContext} from '../context/CurrencyContext';
import React, { useReducer} from 'react';
import {actions, reducer, initialState} from '../reducers/CurrencyReducer';
import {FromCurrency} from '../App';

test('From currency snapshot', ()=>{
    const currencyState = initialState;
    const component = renderer.create(
        <CurrencyContext.Provider value={{currencyState}}>
             <FromCurrency />
        </CurrencyContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
