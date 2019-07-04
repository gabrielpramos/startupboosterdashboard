import React from 'react';
import { shallow, mount } from 'enzyme';
import BarChart from './BarChart';
import { Provider } from 'react-redux';
import { Store } from '../../store';

const barchart = shallow(<Provider store={Store}><BarChart /></Provider>);

it('renders without crashing', () => {
    expect(barchart).toMatchSnapshot();
});

it('loads the barchart', () => {
    const barchartWrapper = mount(<Provider store={Store}><BarChart /></Provider>);
    expect(barchartWrapper).toMatchSnapshot();
});