import React from 'react';
import { render, shallow } from 'enzyme';
import HomePage from './HomePage';
const homepage = render(<HomePage />);

it('renders without crashing', () => {
    expect(homepage).toMatchSnapshot();
});
