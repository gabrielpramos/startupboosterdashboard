import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import MergeGraphCard from './MergeGraphCard';
import ChartSettings from '../../utils/ChartSettings';


const mergegraphcard = shallow(<MergeGraphCard />);

it('renders without crashing', () => {
    expect(mergegraphcard).toMatchSnapshot();
});

it('loads chart without crashing', () => {
    console.log(mergegraphcard.find('canvas').debug());
    expect(mergegraphcard).toMatchSnapshot();
});