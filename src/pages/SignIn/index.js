import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/M.png';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Image source={logo} alt="Meetapp" />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your e-mail"
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Your secret password"
          />
          <SubmitButton onPress={() => {}}>Login</SubmitButton>
        </Form>
        <SignLink onPress={() => {}}>
          <SignLinkText>Create my account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}