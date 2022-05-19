import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary, red } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// Google Signin
// import * as Google from 'expo-google-app-auth';

import * as Google from 'expo-auth-session/providers/google';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: `827228531495-v65tkdotorf17ib8sf0o7pk824p9qone.apps.googleusercontent.com`,
    androidClientId: `827228531495-a4ibp8iheckl0eecjd3gjg1omkpmn1ei.apps.googleusercontent.com`,
    expoClientId: `827228531495-vnchh17sba47nv5pebr3ok9i7h0hkufq.apps.googleusercontent.com`,
  });

  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://whispering-headland-00232.herokuapp.com/user/signin';
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;

        if (status !== 'SUCCESS') {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data[0] }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
 

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }
  }, [response]);

  // const handleGoogleSignin = () => {
  //   console.log('entrou');
  //   setGoogleSubmitting(true);
  //   // const config = {
  //   //   iosClientId: `782607156495-2de6ecovh62rsu1ec5cduv9li7g33ki3.apps.googleusercontent.com`,
  //   //   androidClientId: `827228531495-a4ibp8iheckl0eecjd3gjg1omkpmn1ei.apps.googleusercontent.com`,
  //   //   scopes: ['profile', 'email'],
  //   // };

  //   const [request, response, promptAsync] = Google.useAuthRequest({
  //     iosClientId: `782607156495-2de6ecovh62rsu1ec5cduv9li7g33ki3.apps.googleusercontent.com`,
  //     androidClientId: `827228531495-a4ibp8iheckl0eecjd3gjg1omkpmn1ei.apps.googleusercontent.com`,
  //     scopes: ['profile', 'email'],
  //   });

  //   //   Google.useAuthRequest(config)
  //   //     .then((result) => {
  //   //       const { type, user } = result;
  //   //       if (type == 'success') {
  //   //         console.log(user);
  //   //         const { email, name, photoUrl } = user;
  //   //         persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
  //   //       } else {
  //   //         handleMessage('Google Signin was cancelled');
  //   //       }
  //   //       setGoogleSubmitting(false);
  //   //     })
  //   //     .catch((error) => {
  //   //       handleMessage('An error occurred. Check your network and try again');
  //   //       console.log(error);
  //   //       setGoogleSubmitting(false);
  //   //     });
  // };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem('mulherMiguelenseCredentials', JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        // setTimeout(() => navigation.navigate('Welcome', credentials), 1000);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage('Persisting login failed');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/onboarding_image.jpg')} />
          <PageTitle>Mulher Miguelense</PageTitle>
          <SubTitle>Login de Conta</SubTitle>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Por favor informe todos os valores');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Endereço de Email"
                  placeholder="joana@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="Senha"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Entrar</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <Line />

                {request && (
                  <StyledButton
                    onPress={() => {
                      promptAsync();
                    }}
                    google={true}
                  >
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>Entrar com o Google</ButtonText>
                  </StyledButton>
                )}
                {!request && (
                  <StyledButton disabled={true} google={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

                <ExtraView>
                  <ExtraText>Ainda nao tem um conta? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Cadastre-se</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
