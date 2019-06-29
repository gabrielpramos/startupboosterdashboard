import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

const app = shallow(<App />);

it('renders without crashing', () => {
    expect(app).toMatchSnapshot();
});
