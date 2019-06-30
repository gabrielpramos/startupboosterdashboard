import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

const homepage = shallow(<HomePage />);

it('renders without crashing', () => {
    expect(homepage).toMatchSnapshot();
});

it("loads the component's containers", () => {
    expect(homepage.find('.component-container')).toHaveLength(1);
});
