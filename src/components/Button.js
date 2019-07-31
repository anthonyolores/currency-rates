import React from 'react';
import Button from 'react-bootstrap/Button';

const CmpButton = ({variant, text, clickCallback}) => {
    return (
        <Button 
        variant={variant} 
        onClick={clickCallback}>
            {text}
        </Button>
    );
}
 
export default CmpButton;