import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import inviteeQuery from 'react/pages/authentication/AcceptInvitationPage/queries/invitee';

import Icons from 'react/components/UI/Icons';
import CenteringBox from 'react/components/UI/CenteringBox';
import Text from 'react/components/UI/Text';
import RegistrationForm from 'react/components/RegistrationForm';

export default class AcceptInvitationPage extends Component {
  static propTypes = {
    // `invitation_token` is used to locate the invite
    // it is a digest of `raw_invitation_token` and exists on the user record.
    invitation_token: PropTypes.string.isRequired,
    // `raw_invitation_token` is used to accept the invite
    // it is not in the database directly.
    // At the moment this is passed as `invite_token` in the
    // query string of the URL in the invitation email
    raw_invitation_token: PropTypes.string.isRequired,
  }

  render() {
    const { invitation_token, raw_invitation_token } = this.props;

    return (
      <Query query={inviteeQuery} variables={{ invitation_token }}>
        {({ loading, error, data }) => {
          if (loading) return <div />;

          if (error) {
            return (
              <CenteringBox p={7} flexDirection="column">
                <Icons name="ArenaMark" size={7} mb={9} />

                <Text f={5} mb={6}>
                  We cannot find that invitation code.
                </Text>

                <Text f={2} underlineLinks>
                  If you believe this is in error please contact
                  {' '}
                  <a href="mailto:help@are.na">help@are.na</a>
                </Text>
              </CenteringBox>
            );
          }

          return (
            <CenteringBox p={7}>
              <RegistrationForm
                email={data.invitee.email}
                raw_invitation_token={raw_invitation_token}
              />
            </CenteringBox>
          );
        }}
      </Query>
    );
  }
}
