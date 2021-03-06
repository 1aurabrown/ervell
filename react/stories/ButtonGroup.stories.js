import React from 'react';
import { storiesOf } from '@storybook/react';

import GenericButton from 'react/components/UI/GenericButton';
import ButtonGroup from 'react/components/UI/ButtonGroup';

storiesOf('ButtonGroup', module)
  .add('default', () => (
    <ButtonGroup>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('default - two options', () => (
    <ButtonGroup>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
    </ButtonGroup>
  ))
  .add('default - small buttons', () => (
    <ButtonGroup f={1}>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('default - colors', () => (
    <ButtonGroup color="state.alert">
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('stretch', () => (
    <ButtonGroup stretch>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ))
  .add('stretch - small buttons', () => (
    <ButtonGroup f={1} stretch>
      <GenericButton>Option 1</GenericButton>
      <GenericButton>Option 2</GenericButton>
      <GenericButton>Option 3</GenericButton>
      <GenericButton>Option 4</GenericButton>
    </ButtonGroup>
  ));
