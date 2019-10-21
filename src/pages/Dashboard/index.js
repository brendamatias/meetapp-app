import React, { useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { format, subDays, addDays, isBefore, startOfDay } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { getError } from '~/utils/errorHandler';

import Background from '~/components/Background';
import Loading from '~/components/Loading';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {
  Container,
  DateSelect,
  DateButton,
  DateText,
  List,
  Empty,
  EmptyText,
} from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const [meetups, setMeetups] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const [hasMore, setHasMore] = useState(true);

  const notPast = useMemo(
    () => isBefore(startOfDay(new Date()), subDays(date, 1)),
    [date]
  );

  useEffect(() => {
    setMeetups([]);
    setPage(1);
  }, [date]);

  useEffect(() => {
    async function loadMeetups() {
      setLoading(true);

      const response = await api.get('meetups', {
        params: { date, page },
      });

      setMeetups(response.data);

      setHasMore(response.data.length >= 10);
      setLoading(false);
      setRefreshing(false);

      setLoading(false);
    }

    loadMeetups();
  }, [date, page, refreshCount]);

  async function handleRefresh() {
    setRefreshing(true);
    setMeetups([]);
    setRefreshCount(refreshCount + 1);
  }

  async function handleSubscribe(id) {
    try {
      const response = await api.post(`subscriptions/${id}`);

      Alert.alert(
        'Success',
        `Congratulations! Subscribed into ${response.data.title}!`
      );
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
        <DateSelect>
          <DateButton onPress={() => notPast && setDate(subDays(date, 1))}>
            <Icon
              style={{ opacity: notPast ? 1 : 0.3 }}
              name="chevron-left"
              size={25}
              color="#F94D6A"
            />
          </DateButton>
          <DateText>{format(date, "dd ' de ' MMMM'", { locale: pt })}</DateText>
          <DateButton onPress={() => setDate(addDays(date, 1))} allow>
            <Icon name="chevron-right" size={25} color="#F94D6A" />
          </DateButton>
        </DateSelect>

        {loading && <Loading />}

        {meetups.length ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                handleSubscribe={() => handleSubscribe(item.id)}
              />
            )}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            onEndReached={() => hasMore && setPage(page + 1)}
            onEndReachedThreshold={0.2}
          />
        ) : (
          <Empty>
            <Icon
              name="event-busy"
              size={40}
              color="rgba(255, 255, 255, 0.4)"
            />
            <EmptyText>There are no meetups for this date yet.</EmptyText>
          </Empty>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
