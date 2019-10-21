import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

export const EmptyText = styled.Text`
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
  font-size: 14px;
`;
