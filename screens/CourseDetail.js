import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../components/styles';

import { useFonts } from 'expo-font';

const IconLabel = ({ icon, label }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
    </View>
  );
};

const CourseDetail = ({ navigation }) => {
  const [loaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  // Render

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ flex: 2 }}>
        <Image
          source={images.skiVillaBanner}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '80%',
          }}
        />
      </View>

      {/* Body */}
      <View style={{ flex: 3 }}>
        {/* Icons */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            paddingHorizontal: SIZES.padding * 3,
            justifyContent: 'space-between',
          }}
        >
          <IconLabel icon={icons.villa} label="200 Horas" />

          <IconLabel icon={icons.parking} label="50 Modulos" />
        </View>

        {/* About */}
        <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.h2 }}>About</Text>
          <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
            No Curso de Qualificação Profissional Confeiteiro você vai estudar sobre a fabricação de doces por meio do
            preparo de massas, coberturas e recheios. Também vai conhecer regras de armazenamento, higiene e manuseio de
            matéria-prima e ingredientes e a operar máquinas e equipamentos.
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={{ flex: 0.5, paddingHorizontal: SIZES.padding }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CourseSchedule');
          }}
        >
          <LinearGradient
            style={[{ height: 70, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }]}
            colors={['#46aeff', '#5884ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Fazer a Inscrição</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default CourseDetail;
