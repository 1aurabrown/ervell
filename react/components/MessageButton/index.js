import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import createUserMessageChannelMutation from 'react/components/MessageButton/mutations/createUserMessageChannel';

class MessageButton extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createUserMessageChannel: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const { id, createUserMessageChannel } = this.props;

    this.setState({ mode: 'working' });

    return createUserMessageChannel({
      variables: { id },
    })
      .then(({ data: { create_user_message_channel: { channel: { href } } } }) => {
        this.setState({ mode: 'redirecting' });

        window.location.href = href;
      })
      .catch(() => {
        this.setState({ mode: 'error' });
      });
  }

  render() {
    const { mode } = this.state;
    const {
      id: _id,
      createUserMessageChannel: _createUserMessageChannel,
      ...rest
    } = this.props;

    return (
      <span onClick={this.handleClick} role="button" tabIndex={0} {...rest}>
        {{
          resting: 'Message',
          working: 'Wait...',
          redirecting: 'Redirecting...',
          error: 'Error',
        }[mode]}
      </span>
    );
  }
}

export default graphql(createUserMessageChannelMutation, {
  name: 'createUserMessageChannel',
})(MessageButton);
