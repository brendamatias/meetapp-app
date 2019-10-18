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

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} alt="Meetapp" />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your full name"
          />
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

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>I already have an account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
