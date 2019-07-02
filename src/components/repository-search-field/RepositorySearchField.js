import React, { Component } from 'react';
import { Card, Input } from 'element-react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import './RepositorySearchField.css';
import { userNameChange, repositoryNameChange } from '../../actions';

const mapStateToProps = store => ({
    userName: store.userNameState.value,
    repositoryName: store.repositoryNameState.value
})
const mapDispatchToProps = dispatch =>
    bindActionCreators({ userNameChange, repositoryNameChange }, dispatch);

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

class RepositorySearchField extends Component {

    constructor() {
        super();
        this.state = {
            userName: '',
            repositoryName: '',
        }
    }

    userNameOnChangeHandler = event => {
        this.setState({
            userName: event
        })
    }

    repositoryNameOnChangeHandler = event => {
        this.setState({
            repositoryName: event
        })
    }

    render() {
        const {
            userNameChange,
            repositoryNameChange,
        } = this.props;

        const { userName,
            repositoryName } = this.state;
        return (
            <Card className="box-card">
                <Input placeholder="Type a username or organization" type="text" name="username-field" className="input-field username-field" title="Github username or organization" value={userName} onChange={this.userNameOnChangeHandler} onBlur={() => userNameChange(userName)} />
                <Input placeholder="Repository" type="text" name="repositoryname-field" className="input-field repositoryname-field" title="Repository" value={repositoryName} onChange={this.repositoryNameOnChangeHandler} onBlur={() => repositoryNameChange(repositoryName)} />
            </Card>
        );
    }

}


export default enhance(RepositorySearchField);