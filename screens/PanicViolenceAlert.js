import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import {
  PanicButtonImage,
  PanicTitle,
  StyledFormArea,
  PanicButton2,
  InnerContainer,
  PanicContainer,
  PanicButtonText,
} from '../components/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const Panic = ({ navigation }) => {

  const handlePanic = () => {
    Linking.openURL('whatsapp://send?text=' + 'Estou com problemas, me ajude!' + '&phone=558291151347&phone=558281896636' );
  };

  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email, photoUrl } = storedCredentials;

  const AvatarImg = photoUrl
    ? {
        uri: photoUrl,
      }
    : require('./../assets/img/expo-bg1.png');

  const clearLogin = () => {
    AsyncStorage.removeItem('mulherMiguelenseCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };


  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>

        <PanicContainer>
          <PanicTitle welcome={true}>Maria da Penha</PanicTitle>

          <StyledFormArea>
            <PanicButton2 onPress={handlePanic}>
              <PanicButtonImage resizeMode="cover" source={require('./../assets/img/siren3.gif')} />
            </PanicButton2>

            {/* <PanicButtonText>Clique no botão de pânico acima para obter ajuda</PanicButtonText> */}

            <PanicButton2 onPress={clearLogin}>
              <PanicButtonText>Voltar</PanicButtonText>
            </PanicButton2>
          </StyledFormArea>
        </PanicContainer>
      </InnerContainer>
    </>
  );
};

export default Panic;
