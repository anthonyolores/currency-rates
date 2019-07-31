import mockAxios from 'jest-mock-axios';
import CurrencyService from '../services/CurrencyService';

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it('UppercaseProxy should get data from the server and convert it to UPPERCASE', () => {
 
    let catchFn = jest.fn(),
        thenFn = jest.fn();
 
    // using the component, which should make a server response
    let clientMessage = 'client is saying hello!';
    let curr1 = 'USD';
    let curr2 = 'GBP';
 
    CurrencyService.getRates(curr1, curr2)
        .then(thenFn)
        .catch(catchFn);
 
    // a) the correct method was used (post)
    // b) went to the correct web service URL ('/web-service-url/')
    // c) if the payload was correct ('client is saying hello!')
    expect(mockAxios.get).toHaveBeenCalledWith('https://api.exchangeratesapi.io/latest?symbols='+ curr1 + ',' + curr2);
 
    // simulating a server response
    let responseObj = {data:{"rates":{"USD":1.1216,"GBP":0.89853},"base":"EUR","date":"2019-07-18"}};
    mockAxios.mockResponse(responseObj);
 
    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith({"rates":{"USD":1.1216,"GBP":0.89853},"base":"EUR","date":"2019-07-18"});
 
    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
});