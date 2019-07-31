import axios from 'axios';
import moment from 'moment';
const domain = 'https://api.exchangeratesapi.io/';
const CurrencyService = {
    getRates:(curr1, curr2)=>{
        try{
            let promise = axios.get((domain + 'latest?base='+ curr1.toUpperCase() +'&symbols='+ curr1.toUpperCase() + ',' + curr2.toUpperCase()), {validateStatus: false});
            return promise;
        }
        catch(e){
            return null;
        }
    },
    getHistory:(curr1, curr2)=>{
        try{
            const dateTo = moment().format('YYYY-MM-DD');
            const dateFrom = moment().subtract(30,'d').format('YYYY-MM-DD');
            let promise = axios.get((domain + 'history?start_at=' + dateFrom + '&end_at=' + dateTo +  '&base='+ curr1.toUpperCase() +'&symbols='+ curr1.toUpperCase() + ',' + curr2.toUpperCase()), {validateStatus: false});
            return promise;
        }
        catch(e){
            return null;
        } 
    },
    getAbbr: () => [
        'USD',
        'JPY',
        'BGN',
        'CZK',
        'DKK',
        'GBP',
        'HUF',
        'PLN',
        'RON',
        'SEK',
        'CHF',
        'ISK',
        'NOK',
        'HRK',
        'RUB',
        'TRY',
        'AUD',
        'BRL',
        'CAD',
        'CNY',
        'HKD',
        'IDR',
        'ILS',
        'INR',
        'KRW',
        'MXN',
        'MYR',
        'NZD',
        'PHP',
        'SGD',
        'THB',
        'ZAR'
    ]
};

export default CurrencyService;