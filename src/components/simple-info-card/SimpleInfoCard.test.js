import React from 'react';
import { shallow, mount } from 'enzyme';
import SimpleInfoCard from './SimpleInfoCard';
import RepositorySearchField from '../repository-search-field/RepositorySearchField';
import { Provider } from 'react-redux';
import { Store } from '../../store';

it('renders withou crashing', () => {
    const wrapper = shallow(<Provider store={Store}><SimpleInfoCard /> </Provider>);
    expect(wrapper).toMatchSnapshot();
});


it('fills the card content', () => {

    const simpleInfoCard = mount(
        <Provider store={Store}>
            <SimpleInfoCard />
        </Provider>);

    const instance = simpleInfoCard.instance();
    const propsAttEvent = jest.spyOn(instance, 'attCard');

    const repositorySearchField = mount(
        <Provider store={Store}>
            <RepositorySearchField />
        </Provider>);


    propsAttEvent.reset();

    let userNameField = repositorySearchField.find('.username-field').last().find('div > input');
    userNameField.simulate('focus');
    userNameField.simulate('change', { target: { value: 'pereirowsk' } });
    userNameField.simulate('blur');

    let repositoryNameField = repositorySearchField.find('.repositoryname-field').last().find('div > input')
    repositoryNameField.simulate('focus');
    repositoryNameField.simulate('change', { target: { value: 'Sentinela' } });
    repositoryNameField.simulate('blur');

    expect(propsAttEvent).toHaveBeenCalled();
});