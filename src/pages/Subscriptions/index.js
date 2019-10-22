import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';

import api from '~/services/api';
import { getError } from '~/utils/errorHandler';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { Container, List, Empty, EmptyText } from './styles';

function Subscriptions({ isFocused }) {
  const [loading, setLoading] = useState(true);

  const [meetups, setMeetups] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('subscriptions');

      setMeetups(response.data);

      setLoading(false);
      setRefreshing(false);

      setLoading(false);
    }

    loadMeetups();
  }, [isFocused, refreshCount]);

  async function handleRefresh() {
    setRefreshing(true);
    setMeetups([]);
    setRefreshCount(refreshCount + 1);
  }

  async function handleUnsubscribe(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      setRefreshCount(refreshCount + 1);

      Alert.alert('Success', `You have been unsubscribed!`);
    } catch (err) {
      Alert.alert(
        'Ops',
        getError(err) || 'Something is wrong... Sorry, try again later.'
      );
    }
  }

  return (
    <Background>
      <Header />

      <Container>
        {loading && <Loading />}

        {meetups.length ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item.meetup}
                handleUnsubscribe={() => handleUnsubscribe(item.meetup.id)}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        ) : (
          <Empty>
            <Icon
              name="event-busy"
              size={40}
              color="rgba(255, 255, 255, 0.4)"
            />
            <EmptyText>You are not subscribed into any meetups yet.</EmptyText>
          </Empty>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
