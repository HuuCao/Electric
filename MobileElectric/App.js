/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import {THEME} from './src/utils/theme';
import SplashScreen from 'react-native-splash-screen';
import {Routers} from './src/routers/index';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import RootStore from './src/redux/stores/RootStore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import configureStore from './src/store/index';

const Stack = createStackNavigator();
const store = configureStore();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    SplashScreen.hide();
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerTintColor: THEME.firstColor,
              // headerStyle: {
              //   backgroundColor: THEME.headerColor,
              // },
              headerBackTitleVisible: false,
              animationEnabled: Platform.OS == 'android' ? false : true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            {Routers.map(router => {
              return (
                <Stack.Screen
                  key={router.key}
                  name={router.name}
                  component={router.component}
                  options={({navigation, route}) => ({
                    ...router.options,
                    headerBackTitleVisible: false,
                    headerRight: () => {
                      return (
                        <TouchableOpacity
                          onPress={() => navigation.navigate('ProfileScreen')}
                          style={{
                            width: 30,
                            height: 30,
                            backgroundColor: 'white',
                            borderRadius: 15,
                            marginRight: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: !router.showIconRight ? 'none' : null,
                          }}>
                          <FontAwesome name="user" color={'black'} size={20} />
                        </TouchableOpacity>
                      );
                    },
                  })}
                />
              );
            })}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
