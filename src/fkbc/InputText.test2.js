// import React from 'react';
// import CmpInputText from '../components/InputText';
// import renderer from 'react-test-renderer';
// import {render, fireEvent} from '@testing-library/react'

// test('InputText snapshot', ()=>{
//     const component = renderer.create(
//         <CmpInputText value={''} placeholder={'0'} />
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

// test('InputText value=hello and placeholder=0 ', ()=>{
//     const {container} = render(<CmpInputText value={'hello'} placeholder={'0'} />);
//     const inputText = container.firstChild;
//     expect(inputText.value).toEqual('hello');
//     expect(inputText.placeholder).toEqual('0');
// });


// test('InputText event handle called ', ()=>{
//     const {container} = render(<CmpInputText value={'hello'} placeholder={'0'} setValue={(a)=>a}/>);
//     const inputText = container.firstChild;

//    fireEvent.change(inputText, {target: {value: 'bye'}})
//    expect(inputText.value).toEqual('bye');
// });