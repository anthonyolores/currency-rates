import React, {useCallback, useState} from 'react';
import {ListGroup} from 'react-bootstrap';


const CmpAbbrList = ({initCurrency, callbackCurrency}) => {
    const [currency, setCurrency] = useState(initCurrency);
    const handleCurrency = (data) => {
        setCurrency(data);
        callbackCurrency(data);
    };
    return (<div className="list-container">
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item onClick={(e) => handleCurrency(1)}>
            Link 1
            </ListGroup.Item>
            <ListGroup.Item onClick={(e) => handleCurrency(2)}>
            Link 2
            </ListGroup.Item>
            <ListGroup.Item onClick={(e) => handleCurrency(3)}>
            This one is a button
            </ListGroup.Item>
    </ListGroup>
    </div>);
}
 
export default CmpAbbrList;