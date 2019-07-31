// import React from 'react';
// import CmpButton from '../components/Button';
// import renderer from 'react-test-renderer';
// import {render, fireEvent} from '@testing-library/react'

// test('Button snapshot', ()=>{
//     const component = renderer.create(
//         <CmpButton variant={'primary'} text={'Switch'}/>
//     );
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
// });

// // test('Button set variant and text', ()=>{
// //     const {container} = render(<CmpButton variant={'primary'} text={'Switch'}/>);
// //     const button = container.firstChild;
// //     expect(button.className).toEqual('btn btn-primary');
// //     expect(button.textContent).toEqual('Switch');
// // });

// // test('Button is Clicked', ()=>{
// //     const handleClick = jest.fn();
// //     const {container} = render(<CmpButton clickCallback={handleClick}/>);
// //     const button = container.firstChild;

// //     fireEvent.click(button);
// //     expect(handleClick).toHaveBeenCalledTimes(1);
// // });
