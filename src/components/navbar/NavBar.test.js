import React from 'react'
import { shallow, render } from 'enzyme';
import NavBar from './NavBar';

const navbar = shallow(<NavBar />);

it('renders without crashing', () => {
    expect(navbar).toMatchSnapshot();
});

it('reloads the HomePage when .home-button clicked', ()=>{
    const wrapper = render(<NavBar />);
    wrapper.find('.home-button').simulate('click');
    expect(wrapper).toMatchSnapshot();
});