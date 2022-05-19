import React from 'react';

//colors
import { Colors } from './../components/styles';
const { primary, tertiary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Home from './../screens/Home';
import CourseDetail from './../screens/CourseDetail';
import CourseSchedule from './../screens/CourseSchedule';
// import PanicViolenceAlert from './../screens/PanicViolenceAlert';

const Stack = createStackNavigator();

// credentials context
import { CredentialsContext } from './../components/CredentialsContext';

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20,
              },
            }}
          >
            {storedCredentials ? (
              <>
                <Stack.Screen
                  options={{
                    headerTintColor: primary,
                  }}
                  name="Welcome"
                  component={Welcome}
                />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CourseDetail" component={CourseDetail} />
                <Stack.Screen name="CourseSchedule" component={CourseSchedule} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CourseDetail" component={CourseDetail} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
