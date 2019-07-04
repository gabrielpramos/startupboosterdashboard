import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import MergeGraphCard from './MergeGraphCard';
import ChartSettings from '../../utils/ChartSettings';

import { Provider } from 'react-redux';
import { Store } from '../../store';


const mergegraphcard = shallow(<Provider store={Store}><MergeGraphCard /></Provider>);

it('renders without crashing', () => {
    expect(mergegraphcard).toMatchSnapshot();
});

it('loads chart without crashing', () => {
    expect(mergegraphcard).toMatchSnapshot();
});