import React, { useCallback, useEffect, useState } from 'react';

// React navigation stack
import RootStack from './navigators/RootStack';

// SplashScreen
import * as SplashScreen from 'expo-splash-screen';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/CredentialsContext';

// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
// import { AppLoading } from 'expo';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState('');

  // let [fontsLoaded] = useFonts({
  //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  //   'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  //   'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  // });
  // const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync({
        //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        //   'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        //   'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        // });

        // let [fontsLoaded] = useFonts({
        //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        //   'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        //   'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        // });
        // await checkLoginCredentials();

        AsyncStorage.getItem('mulherMiguelenseCredentials')
          .then((result) => {
            if (result !== null) {
              setStoredCredentials(JSON.parse(result));
            } else {
              setStoredCredentials(null);
            }
          })
          .catch((error) => console.log(error));
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => checkLoginCredentials());
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // if (!appIsReady) {
  if (!appIsReady) {
    return null;
  }

  // const checkLoginCredentials = async () => {
  //   AsyncStorage.getItem('mulherMiguelenseCredentials')
  //     .then((result) => {
  //       if (result !== null) {
  //         setStoredCredentials(JSON.parse(result));
  //       } else {
  //         setStoredCredentials(null);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // };

  // if (!appIsReady && !fontsLoaded) {
  //   return <SplashScreen startAsync={checkLoginCredentials} onFinish={() => setAppReady(true)} onError={console.warn} />;
  // }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
