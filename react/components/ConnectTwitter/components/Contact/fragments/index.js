import gql from 'graphql-tag';

import avatarFragment from 'react/components/UserAvatar/fragments/userAvatar';

export default gql`
  fragment Contact on UserInterface {
    ... on User {
      id
    }
    name
    ...UserAvatar
  }
  ${avatarFragment}
`;
