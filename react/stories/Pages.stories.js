import React from 'react';
import { storiesOf } from '@storybook/react';

import EmptyConnectTwitter from 'react/pages/feed/components/EmptyConnectTwitter';
import NoFollowingMessage from 'react/pages/feed/components/NoFollowingMessage';

storiesOf('Pages', module)
  .add('Empty feed / Connect twitter', () => (
    <EmptyConnectTwitter />
  ))
  .add('Empty feed / No follower message', () => (
    <NoFollowingMessage />
  ));
