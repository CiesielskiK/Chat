import React, {Component} from 'react';
import PropTypes from 'prop-types';
import io from "socket.io-client";
import styles from './UserForm.css';

const socket = io('/');


class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      duplicate: false
    };
  }
  componentWillMount() {
    socket.emit('getUsers');
  }
  componentDidMount() {
    socket.on('update', ({users}) => this.users = users);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.state.name;
    socket.emit('getUsers');
    const isUserName = this.users.filter(user => (user.name === this.state.name)).length;
    if (isUserName === 0) {
      this.props.onUserSubmit(name)
    } else {
      this.setState({duplicate: true})
    }
  }
  handleChange = (e) => {
    this.setState({
      name: e.target.value,
      duplicate: false
    });
  }
  render() {
    const { duplicate } = this.state;
    return (
      <form className={styles.UserForm} onSubmit={this.handleSubmit}>
        <input
          className={styles.UserInput}
          placeholder='Enter your nickname to start chatting'
          onChange={this.handleChange}
          value={this.state.name}
        />
      {duplicate &&<p className={styles.NameExist}>This<br/> name<br/> already <br/> exists!</p> }
      </form>
    );
  }
}

UserForm.propTypes = {
  onUserSubmit: PropTypes.func,
  users: PropTypes.array
}.isRequired;

export default UserForm;
