import './App.scss';
import React, { useReducer, useContext, useRef, useEffect, useState, useCallback, useMemo} from 'react';
import CmpInputText from './components/InputText';
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import {CurrencyContext} from '../src/context/CurrencyContext';
import {actions, reducer, initialState} from './reducers/CurrencyReducer';
import CurrencyService from './services/CurrencyService';
import {Chart} from 'chart.js';
const colStyle = {
  padding:5
};
const abbrs = CurrencyService.getAbbr();

function filterAbbrList(keyword){
  let tempList = [];
  if(keyword === ''){
    tempList = abbrs.slice();
  }
  else{
    keyword = keyword.toUpperCase();
    for(let i = 0; i < abbrs.length; i++){
      if(abbrs[i].indexOf(keyword) !== -1){
        tempList.push(abbrs[i]);
      }
    }
  }
  return tempList;
}

function isCurrencyValid(currency){
  if(currency && currency.length > 0){
    return abbrs.indexOf(currency.toUpperCase()) !== -1?true:false;  
  }
  else{
    return false;
  } 
}

function getResult(num, currency, operation){
  let result  = 0;
  if(num != ''){
    num = parseFloat(num);
    const isLess0 = (currency.rates[1].value<0);
    const rate = currency.rates[1].value == 1? currency.rates[0].value : currency.rates[1].value;
    if(operation === 0){
      result = isLess0? (num / rate) : (num * rate);
    }
    else{
      result = isLess0? (num * rate) : (num / rate);
    }
  }

  return result % 1 != 0? result.toFixed(2) : result;
}

function setCurrency(from, to, dispatch){
  if(isCurrencyValid(from) && isCurrencyValid(to)){
    if(from == to){
      dispatch({type:actions.SET_CURRENCY, data:{
        base: 'from',
        date: '',
        rates:{
          [from]:1,
          [to+'2']:1,
        }
      }});
    }
    else{
      CurrencyService.getRates(from, to).then((response)=>{
        if(response.data.error){
          dispatch({type:actions.SET_CURRENCY, data:null});
        }
        else{
          dispatch({type:actions.SET_CURRENCY, data:response.data});    
        }
      }).catch((error)=>{
        dispatch({type:actions.SET_CURRENCY, data:null});
      });
    }
  }
  else{
    dispatch({type:actions.SET_CURRENCY, data:null});
  }
}

export const CurrencyList = ({actionType, actionType2}) => {
  const { currencyState, dispatch } = useContext(CurrencyContext);
  const listRef = useRef(null);
  //function must start with use if using hooks
  function useClickOutside(ref) {
    function handleClickOutside(event) {
      if (ref.current && 
        !ref.current.contains(event.target) && 
        event.target.placeholder !== 'Currency') {
        dispatch({type:actionType2, data:null});
      }
      else if(ref.current && ref.current.contains(event.target)){
        dispatch({type:actionType, data:event.target.innerText});
        dispatch({type:actionType2, data:null});
        setCurrency(currencyState.isFromCurrency?event.target.innerText:currencyState.fromCurrency, currencyState.isToCurrency?event.target.innerText:currencyState.toCurrency, dispatch);
      }
    }
    useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  }

  useClickOutside(listRef);
  const abbrrList = filterAbbrList(currencyState.isFromCurrency?currencyState.fromCurrency:currencyState.toCurrency);  
  return <div className="list-container" ref={listRef}>
  <ListGroup defaultActiveKey="#link1">
      {
        abbrrList.map((item, index)=>{
          return <ListGroup.Item key={index}>{item}</ListGroup.Item>
        })
      }
  </ListGroup>
  </div>
  }

export const FromCurrency = () => {
  const { currencyState, dispatch } = useContext(CurrencyContext);
  const handler = useCallback((value) => {
    dispatch({type:actions.SET_FROM_CURRENCY, data:value});
    setCurrency(value, currencyState.toCurrency, dispatch);
  });
  const focusHandler = (value) => {
    dispatch({type:actions.SET_IS_FROM_CURRENCY, data:value});
  }
  return <CmpInputText value={currencyState.fromCurrency} placeholder={'Currency'} handler={handler} focusHandler={focusHandler}/>
}

export function ToCurrency(){
  const { currencyState, dispatch } = useContext(CurrencyContext);
  const handler = useCallback((value) => {
    dispatch({type:actions.SET_TO_CURRENCY, data:value});
    setCurrency(currencyState.fromCurrency, value, dispatch);
  });
  const focusHandler = (value) => {
    dispatch({type:actions.SET_IS_TO_CURRENCY, data:value});
  }
  return <CmpInputText value={currencyState.toCurrency} placeholder={'Currency'} handler={handler} focusHandler={focusHandler}/>
}

export function FromNumber(){
  const { currencyState, dispatch } = useContext(CurrencyContext);
  const [disable, setDisable] = useState(true);
  const handler = useCallback((value) => {
    if(/^[0-9.]*$/.test(value)){
      dispatch({type:actions.SET_FROM_NUMBER, data:value});  
      if((isCurrencyValid(currencyState.fromCurrency) && isCurrencyValid(currencyState.toCurrency))){
        dispatch({type:actions.SET_TO_NUMBER, data:getResult(value, currencyState.currency, 0)});
      }
    }
  });
  useEffect(()=>{
    setDisable(!(isCurrencyValid(currencyState.fromCurrency) && isCurrencyValid(currencyState.toCurrency)));
  }, [currencyState.fromCurrency, currencyState.toCurrency, currencyState.fromNumber, currencyState.toNumber]);
  return <CmpInputText value={currencyState.fromNumber} placeholder={0} handler={handler} disable={disable}/>
}

export function ToNumber(){
  const { currencyState, dispatch } = useContext(CurrencyContext);
  const [disable, setDisable] = useState(true);
  const handler = useCallback((value) => {
    if(/^[0-9.]*$/.test(value)){
      dispatch({type:actions.SET_TO_NUMBER, data:value});
      if((isCurrencyValid(currencyState.fromCurrency) && isCurrencyValid(currencyState.toCurrency))){
        dispatch({type:actions.SET_FROM_NUMBER, data:getResult(value, currencyState.currency, 1)});
      }
    }
  });
  useEffect(()=>{
    setDisable(!(isCurrencyValid(currencyState.fromCurrency) && isCurrencyValid(currencyState.toCurrency))); 
  }, [currencyState.fromCurrency, currencyState.toCurrency, currencyState.fromNumber, currencyState.toNumber]);
  return <CmpInputText value={currencyState.toNumber} placeholder={0} handler={handler} disable={disable}/>
}

function LineChart({color}){

  const { currencyState, dispatch } = useContext(CurrencyContext);
  const [lineChart, setLineChart] = useState(null);
  const [lineData, setLineData] = useState(null);
  const chartRef = useRef(null);

  useEffect(()=>{
    if((isCurrencyValid(currencyState.fromCurrency) && isCurrencyValid(currencyState.toCurrency))){
      CurrencyService.getHistory(currencyState.fromCurrency, currencyState.toCurrency).then((response)=>{
      //CurrencyService.getHistory("NZD", "PHP").then((response)=>{
        const dates = Object.keys(response.data.rates);
        const data = dates.map((item => {
          const currencies = Object.keys(response.data.rates[item]);
          const value = response.data.rates[item][currencies[0]] == 1? response.data.rates[item][currencies[1]] : response.data.rates[item][currencies[0]];
          return {label: item.replace('2019-',''), value: value};
        }));
        data.sort((a, b) => parseInt(a.label.replace('-', '')) - parseInt(b.label.replace('-', '')));
        setLineData(data);
        setLineChart(new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: data.map(d => d.label),
            datasets: [{
              label: 'Exchange Rate History',
              data: data.map(d => d.value),
              fill: 'none',
              backgroundColor: color,
              pointRadius: 4,
              borderColor: color,
              borderWidth: 1,
              lineTension: 0,
              steppedLine:false,
              
            }]
          }
        }));
        console.log(data);
      });
    }

  }, [currencyState.currency]);

  return lineData==null || currencyState.currency == null?''
    :
    <canvas
      ref={chartRef}
      data={lineData}
      title="My amazing data"
      color="#70CAD1"
    />
  
}

function App() {

  const [currencyState, dispatch] = useReducer(reducer, initialState);
  useEffect(()=>{
    if(currencyState.currency != null)
      dispatch({type:actions.SET_FROM_NUMBER, data:getResult(currencyState.toNumber, currencyState.currency, 1)});
  }, [currencyState.currency]);
  return useMemo(()=>{
    console.log(currencyState.fromCurrency + '-----' + currencyState.toCurrency);
    return (
      <CurrencyContext.Provider value={{ currencyState, dispatch }}>
        <div className="App">
          <Container>
            <Row className="justify-content-md-center justify-content-sm-center"> 
              <Col xs={12} sm={10} md={6} style={colStyle} className="header-container">   
                <Row>
                    <Col xs={12} sm={12} md={12} style={colStyle}>
                      <h1>CURRENCY</h1>
                      <p> Rates published by the European Central Bank</p>
                    </Col>
                  </Row>
              </Col>     
            </Row>
            <Row className="justify-content-md-center justify-content-sm-center">
              <Col xs={12} sm={10} md={6} style={colStyle} className="form-container">     
                <Row>
                  <Col xs={12} sm={6} md={6} style={colStyle}>
                    <FromCurrency />
                    {
                      currencyState.isFromCurrency?
                        <CurrencyList actionType={actions.SET_FROM_CURRENCY} actionType2={actions.SET_IS_FROM_CURRENCY}/>
                      :''
                    }           
                  </Col>
                  <Col xs={12} sm={6} md={6} style={colStyle}>
                    <FromNumber/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6} md={6} style={colStyle}>
                    <ToCurrency />
                    {
                      currencyState.isToCurrency?
                        <CurrencyList actionType={actions.SET_TO_CURRENCY} actionType2={actions.SET_IS_TO_CURRENCY}/>
                      :''
                    }           
                  </Col>
                  <Col xs={12} sm={6} md={6} style={colStyle}>
                    <ToNumber/>
                  </Col>
                </Row>
                <Row>
                  <LineChart color="#6D00BF"/>
                </Row>
              </Col>
            </Row>
        </Container>
        </div>
      </CurrencyContext.Provider>
    );
  }, [currencyState, dispatch]);

}

export default App;
