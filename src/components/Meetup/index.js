import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  File,
  Body,
  Title,
  Row,
  Info,
  SubscribeButton,
  UnsubscribeButton,
} from './styles';

export default function Meetup({ data, handleSubscribe, handleUnsubscribe }) {
  return (
    <Container>
      <File
        source={{
          uri: data.file.url,
        }}
      />
      <Body>
        <Title>{data.title}</Title>
        <Row>
          <Icon name="event" color="#999" />
          <Info>{data.formattedDate}</Info>
        </Row>
        <Row>
          <Icon name="location-on" size={12} color="#999" />
          <Info>{data.location}</Info>
        </Row>
        <Row>
          <Icon name="person" size={12} color="#999" />
          <Info>Powered by {data.user.name}</Info>
        </Row>

        {handleSubscribe && !data.past && (
          <SubscribeButton onPress={handleSubscribe}>Subscribe</SubscribeButton>
        )}

        {handleUnsubscribe && (
          <UnsubscribeButton onPress={handleUnsubscribe}>
            Unsubscribe
          </UnsubscribeButton>
        )}
      </Body>
    </Container>
  );
}
