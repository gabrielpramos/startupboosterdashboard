import React from 'react';
import { render, mount } from 'enzyme';
import HomePage from './HomePage';

const homepage = render(<HomePage />);

it('renders without crashing', () => {
    expect(homepage).toMatchSnapshot();
});

it("loads the component's containers", () => {
    const wrapper = mount(<HomePage />);
    expect(wrapper.find('div').hasClass('component-container')).toEqual(true);
});
