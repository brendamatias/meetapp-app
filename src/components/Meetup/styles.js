import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View.attrs({
  elevation: 2,
})`
  background: #fff;
  margin: 10px 20px;
  border-radius: 4px;
  overflow: hidden;
`;

export const File = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 150px;
  align-content: stretch;
`;

export const Body = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

export const Row = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.Text`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
  color: #999999;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 10px;
`;

export const UnsubscribeButton = styled(Button)`
  margin-top: 10px;
`;
