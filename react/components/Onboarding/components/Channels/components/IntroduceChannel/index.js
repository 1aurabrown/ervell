import React from 'react';
import styled from 'styled-components';
import Text from 'react/components/UI/Text';

const IntroduceChannelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 33em;
  padding: 1em 1em 0 1em;
  position: relative;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;
  padding: 2em;
`;

const Section = styled.div`
  align-self: center;
  marging: 1em 0;
`;

const IntroductionText = styled(Text).attrs({
  f: 8
})`
  text-align: center;
`;


class IntroduceChannel extends React.Component {
  constructor(props) {
    super(props);

    this.imageSrc = '/images/onboarding/addblock.gif';

    this.state = {
      imageLoading: true
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  loadImage = () => {
    const image = new Image();

    image.onload = () => {
      this.setState({ imageLoading: false });
    };

    image.src = this.imageSrc;
  };

  render() {
    if (this.state.imageLoading) return <div/>;

    return (
      <IntroduceChannelWrapper>
        <BodyWrapper>
          <Section>
            <IntroductionText>
              Congrats!
            </IntroductionText>
            <IntroductionText>
              You can now add to your channel.
            </IntroductionText>
          </Section>
          <Section>
            <img src={this.imageSrc} draggable="false"/>
          </Section>
          <Section>
            <IntroductionText>
              Use the <b>add block</b> to drop files from your desktop, save links and videos from the web, or add text.
            </IntroductionText>
          </Section>
        </BodyWrapper>
        <button
          className="Button Button--divider"
          onClick={this.props.onClose}
        >
          Done
        </button>
      </IntroduceChannelWrapper>
    );
  }
};

export default IntroduceChannel;