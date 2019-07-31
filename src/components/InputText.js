import React from 'react';
const CmpInputText = ({placeholder, value, handler, focusHandler, disable}) => {
    //console.log('rendered input text');
    const handleChange = e => {
        handler(e.target.value);
    };
    const handleFocus = () => {
        if(focusHandler)
            focusHandler(true)
    };
    return (
        <input 
            type='text' 
            value={value} 
            onChange={handleChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            disabled={disable}
        />
    );
}
 
export default CmpInputText;