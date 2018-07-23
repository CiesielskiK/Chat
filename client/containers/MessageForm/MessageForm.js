import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './MessageForm.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const message = {
      from: this.props.name,
      text: this.state.text
    };
    if (message.text.trim() !== "") {
      this.props.onMessageSubmit(message);
    }
    this.setState({text: ''});
  }
  changeHandler = (e) => {
    this.setState({text: e.target.value});
  }
  render() {
    return (
      <form className={styles.MessageForm} onSubmit={this.handleSubmit}>
        <input
          className={styles.MessageInput}
          onChange={this.changeHandler}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

MessageForm.propTypes = {
  name: PropTypes.string,
  onMessageSubmit: PropTypes.func
}.isRequired;

export default MessageForm;
