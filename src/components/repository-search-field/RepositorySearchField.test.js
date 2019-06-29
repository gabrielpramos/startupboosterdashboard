import React from 'react';
import { shallow } from 'enzyme';
import RepositorySearchField from './RepositorySearchField';

const repositorySearchField = shallow(<RepositorySearchField />);

it('renders without crashing', () => {
    expect(repositorySearchField).toMatchSnapshot();
});

it("changes the component's user name attribute when username input changes", () => {
    let userNameField = repositorySearchField.find('.username-field');

    userNameField.simulate('change', { target: { value: 'pereirowsk' } });
    expect(repositorySearchField.state().userName).toEqual('pereirowsk');
});

it("changes the component's repository attribute when repositoryname input changes", () => {
    let repositoryNameField = repositorySearchField.find('.repositoryname-field');

    repositoryNameField.simulate('change', { target: { value: 'Sentinela' } });
    expect(repositorySearchField.state().repositoryName).toEqual('Sentinela');
});