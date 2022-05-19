import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {RadioButton } from 'react-native-paper';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';

import { useFormik } from 'formik';

import { useFonts } from 'expo-font';


const CourseSchedule = ({ navigation }) => {
  const formik = useFormik({
    initialValues: { slot: '' },
    onSubmit: (values) => {
      console.log(values.slot);
    },
  });

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

     
      {/* Footer */}
      <View style={{ flex: 1, paddingHorizontal: SIZES.padding }}>
      <RadioButton.Group 
      onValueChange={formik.handleChange('slot')} 
      value={formik.values.slot}>
          <View>
            <Text>15/07 a 25/07 - 5 vagas</Text>
            <RadioButton value="1"></RadioButton>
          </View>
          <View>
            <Text>26/07 a 06/08 - 15 vagas</Text>
            <RadioButton value="2"></RadioButton>
          </View>
          <View>
            <Text>07/08 a 17/08 - 45 vagas</Text>
            <RadioButton value="3"></RadioButton>
          </View>
        </RadioButton.Group>
        <TouchableOpacity
          onPress={
            formik.handleSubmit
          }
        >
          <LinearGradient
            style={[{ height: 70, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }]}
            colors={['#46aeff', '#5884ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Inscrever-me</Text>
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

export default CourseSchedule;
