import React from 'react'
import { shallow, render } from 'enzyme';
import NavBar from './NavBar';

const navbar = shallow(<NavBar />);

it('renders without crashing', () => {
    expect(navbar).toMatchSnapshot();
});

it('reloads the HomePage when .home-button clicked', () => {
    const homeButtonWrapper = navbar.find('.home-button');
    homeButtonWrapper.simulate('click');
    expect(navbar).toMatchSnapshot();
});