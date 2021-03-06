import gql from 'graphql-tag';

export default gql`
  mutation createAuthenticatedServiceMutation($token: String!, $secret: String!, $uid: String! $avatar_url: String) {
    create_authenticated_service(input: { token: $token, secret: $secret, uid: $uid, avatar_url: $avatar_url }) {
      authenticated_service {
        id
        provider
        uid
      }
    }
  }
`;
