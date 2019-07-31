
export const initialState = {
    currency: null,
    fromNumber: 0,
    fromCurrency: '',
    toNumber:0,
    toCurrency:'',
    isFromCurrency: false,
    isToCurrency: false
  };

export const actions = {
    SET_CURRENCY: 'SET_CURRENCY',
    SET_FROM_NUMBER: 'SET_FROM_NUMBER',
    SET_FROM_CURRENCY: 'SET_FROM_CURRENCY',
    SET_TO_NUMBER: 'SET_TO_NUMBER',
    SET_TO_CURRENCY: 'SET_TO_CURRENCY',
    SET_IS_FROM_CURRENCY: 'SET_IS_FROM_CURRENCY',
    SET_IS_TO_CURRENCY: 'SET_IS_TO_CURRENCY'
  };
  
export const reducer = (state, action) => {
  console.log(action.type + '---' + action.data);
    switch(action.type){
      case actions.SET_CURRENCY: {
        if(action.data && action.data.rates != null){
          const listRates = Object.keys(action.data.rates);
          action.data.rates = [
            {value: action.data.rates[listRates[0]], currency: listRates[0]},
            {value: action.data.rates[listRates[1]], currency: listRates[1]}
          ]
        }
        return {
          ...state,
          currency: action.data
        }
      }
      case actions.SET_FROM_NUMBER: {
        return {
          ...state,
          fromNumber: action.data
        }     
      }
      case actions.SET_FROM_CURRENCY: {
        return {
          ...state,
          fromCurrency: action.data
        }      
      }
      case actions.SET_TO_NUMBER: {
        return {
          ...state,
          toNumber: action.data
        }      
      }
      case actions.SET_TO_CURRENCY: {
        return {
          ...state,
          toCurrency: action.data
        }      
      }
      case actions.SET_IS_FROM_CURRENCY: {
        return {
          ...state,
          isFromCurrency: action.data==null?false:action.data,
          isToCurrency: action.data==null?false:!action.data
        }      
      }
      case actions.SET_IS_TO_CURRENCY: {
        return {
          ...state,
          isFromCurrency: action.data==null?false:!action.data,
          isToCurrency: action.data==null?false:action.data
        }      
      }
      default:{
        return initialState;
      }
    }
  };