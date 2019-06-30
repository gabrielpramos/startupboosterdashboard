import React from 'react';
import { shallow, mount } from 'enzyme';
import RepositorySearchField from './RepositorySearchField';
import { Provider } from 'react-redux';
import { Store } from '../../store';

const repositorySearchField = mount(
    <Provider store={Store}>
        <RepositorySearchField />
    </Provider>);

it('renders without crashing', () => {
    const wrapper = shallow(<Provider store={Store}><RepositorySearchField /></Provider >);
    expect(wrapper).toMatchSnapshot();
});

it("changes the component's user name attribute when username input changes", () => {
    let userNameField = repositorySearchField.find('.username-field').last().find('div > input');
    userNameField.simulate('focus');
    userNameField.simulate('change', { target: { value: 'pereirowsk' } });
    userNameField.simulate('blur');

    expect(repositorySearchField.prop('store').getState().userNameState.userName).toEqual('pereirowsk');
});

it("changes the component's repository attribute when repositoryname input changes", () => {
    let repositoryNameField = repositorySearchField.find('.repositoryname-field').last().find('div > input')
    repositoryNameField.simulate('focus');
    repositoryNameField.simulate('change', { target: { value: 'Sentinela' } });
    repositoryNameField.simulate('blur');

    expect(repositorySearchField.prop('store').getState().repositoryNameState.repositoryName).toEqual('Sentinela');
}); 