import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick, omit } from 'underscore';

import { space } from 'styled-system';

import compactObject from 'react/util/compactObject';

import Box from 'react/components/UI/Box';
import TextInput from 'react/components/UI/Inputs/components/TextInput';
import ErrorMessage from 'react/components/UI/Inputs/components/ErrorMessage';

const SPACE_MARGIN_PROPS_KEYS = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my'];

// TODO: Needs to be configured to accept a tag
// so that other input types can have errors
export default class Input extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    ...space.propTypes,
  }

  static defaultProps = {
    errorMessage: null,
    hasError: false,
  }

  constructor(props) {
    super(props);

    const { errorMessage, hasError } = props;

    this.state = {
      mode: (hasError || errorMessage) ? 'error' : 'resting',
    };
  }

  componentWillReceiveProps({ hasError, errorMessage }) {
    this.setState({
      mode: (hasError || errorMessage) ? 'error' : 'resting',
    });
  }

  render() {
    const { mode } = this.state;
    const { errorMessage } = this.props;

    // Allow the outerbox to have configurable margins
    const boxProps = compactObject(pick(this.props, ...SPACE_MARGIN_PROPS_KEYS));

    // While the input can still have configurable padding
    const inputProps = omit(this.props, ...SPACE_MARGIN_PROPS_KEYS);

    return (
      <Box {...boxProps}>
        <TextInput
          {...inputProps}
          hasError={mode === 'error'}
        />

        {mode === 'error' &&
          <ErrorMessage textAlign="left">
            {errorMessage}
          </ErrorMessage>
        }
      </Box>
    );
  }
}
