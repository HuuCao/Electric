/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Calculation from '../tab/calculation/Calculation';
import MotorAndConverter from '../tab/motorAndconverter/MotorAndConverter';
import Recipe from '../tab/recipe/Recipe';
import Resources from '../tab/resources/Resources';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Drawer from 'react-native-drawer';
import FirstAid from './firstAid/FirstAid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dataDrawerEN, dataDrawerVN} from '../../core/dataFake/dataDrawer';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import {useSelector} from 'react-redux';

const iconSoCuu = require('../../assets/icons/iconTraCuu.png');
const iconBackSoCuu = require('../../assets/icons/iconBackTraCuu.png');
const Tab = createMaterialTopTabNavigator();
function Dashboard({navigation}) {
  const [isFirstAid, setIsFirstAid] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const LG = useSelector(state => state.languageReducer.data);

  const onCloseDrawer = function () {
    _drawer.close();
  };

  const onOpenDrawer = function () {
    _drawer.open();
  };

  const drawerStyles = {
    drawer: {shadowColor: '#000000', shadowOpacity: 0, shadowRadius: 0},
    main: {paddingLeft: 3},
  };

  const onProfile = async function () {
    const tokenEET = await AsyncStorage.getItem('tokenEET');
    const usernameEET = await AsyncStorage.getItem('usernameEET');
    setIsLoad(true);
    if (tokenEET !== null && usernameEET !== null) {
      setIsLoad(false);
      CallApi('get', backend.user, '', tokenEET)
        .then(response => {
          setIsLoad(false);
          navigation.navigate('ProfileScreen', {
            data: response.data.data,
          });
        })
        .catch(e => {
          setIsLoad(false);
          if (e.Error === 'timeout') {
            Toast.show({
              type: 'error',
              text1: LG.vuiLongKiemTraKetNoi,
              visibilityTime: 2000,
              autoHide: true,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: LG.loiVuiLongThuLaiSau,
              visibilityTime: 2000,
              autoHide: true,
            });
          }
          console.log(e.Error);
        });
    } else {
      setTimeout(() => {
        setIsLoad(false);
        navigation.navigate('ProfileScreen');
      }, 1000);
    }
  };

  const onLogOut = function () {
    AddInfoUser('');
    AddPassword('');
    AddUseName('');
    setTimeout(() => {
      setIsLoad(false);
      navigation.replace('LoginScreen');
    }, 1000);
  };

  const AddInfoUser = async object => {
    try {
      await AsyncStorage.setItem('infoUserEET', JSON.stringify(object));
    } catch (e) {}
  };

  const AddPassword = async value => {
    try {
      await AsyncStorage.setItem('passwordEET', value);
    } catch (e) {}
  };

  const AddUseName = async value => {
    try {
      await AsyncStorage.setItem('usernameEET', value);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <Drawer
        type="overlay"
        tapToClose={true}
        openDrawerOffset={0.3}
        panCloseMask={0.2}
        closedDrawerOffset={0}
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2},
        })}
        ref={ref => (_drawer = ref)}
        content={
          <View style={styles.viewDrawer}>
            <TouchableOpacity
              style={styles.btnHeaderDrawer}
              onPress={e => {
                onCloseDrawer();
              }}>
              <Image
                resizeMode={'contain'}
                style={styles.iconOpenDrawer}
                source={require('../../assets/icons/drawer.png')}
              />
            </TouchableOpacity>
            <Image
              resizeMode={'contain'}
              style={styles.iconLogo}
              source={require('../../assets/icons/logo.png')}
            />
            <View style={styles.viewListBtn}>
              {LG.type === 'EngLish' &&
                dataDrawerEN.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.btnItemDrawer}
                      onPress={e => {
                        navigation.navigate(item.name);
                        onCloseDrawer();
                      }}>
                      <Image
                        resizeMode={'contain'}
                        style={styles.iconDrawer}
                        source={item.icon}
                      />
                      <Text style={styles.txtDrawer}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              {LG.type === 'VietNam' &&
                dataDrawerVN.map(item => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.btnItemDrawer}
                      onPress={e => {
                        navigation.navigate(item.name);
                        onCloseDrawer();
                      }}>
                      <Image
                        resizeMode={'contain'}
                        style={styles.iconDrawer}
                        source={item.icon}
                      />
                      <Text style={styles.txtDrawer}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                })}
              <TouchableOpacity
                style={styles.btnItemDrawer}
                onPress={e => {
                  onLogOut();
                  setIsLoad(true);
                }}>
                <Image
                  resizeMode={'contain'}
                  style={styles.iconDrawer}
                  source={require('../../assets/icons/iconLogout.png')}
                />
                <Text style={styles.txtDrawer}>{LG.logOut}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={e => {
              onOpenDrawer();
            }}>
            <Text style={styles.iconDra}>|||</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewContainer1}
            onPress={e => {
              onProfile();
            }}>
            <View style={styles.borderAvtar}>
              <Image
                resizeMode={'contain'}
                style={styles.avatar}
                source={require('../../assets/icons/avatar.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        {isFirstAid === true ? (
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#F26F21',
              tabBarIndicatorStyle: {
                backgroundColor: '#F26F21',
              },
              tabBarStyle: {backgroundColor: '#FFFFFF'},
            }}>
            <Tab.Screen
              name="Calculation"
              component={Calculation}
              options={{
                tabBarLabel: ({focused}) => (
                  <Text
                    style={[
                      styles.txtTitle,
                      {
                        color: focused === true ? '#F26F21' : 'black',
                        fontWeight: focused === true ? 'bold' : '500',
                      },
                    ]}>
                    {LG.tabCongCuTinhToan}
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="MotorAndConverter"
              component={MotorAndConverter}
              options={{
                tabBarLabel: ({focused}) => (
                  <Text
                    style={[
                      styles.txtTitle,
                      {
                        color: focused === true ? '#F26F21' : 'black',
                        fontWeight: focused === true ? 'bold' : '500',
                      },
                    ]}>
                    {LG.tabDongCoChuyenDoi}
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Resources"
              component={Resources}
              options={{
                tabBarLabel: ({focused}) => (
                  <Text
                    style={[
                      styles.txtTitle,
                      {
                        color: focused === true ? '#F26F21' : 'black',
                        fontWeight: focused === true ? 'bold' : '500',
                      },
                    ]}>
                    {LG.tabChiaSe}
                  </Text>
                ),
              }}
            />
            <Tab.Screen
              name="Recipe"
              component={Recipe}
              options={{
                tabBarLabel: ({focused}) => (
                  <Text
                    style={[
                      styles.txtTitle,
                      {
                        color: focused === true ? '#F26F21' : 'black',
                        fontWeight: focused === true ? 'bold' : '500',
                      },
                    ]}>
                    {LG.tabCongThuc}
                  </Text>
                ),
              }}
            />
          </Tab.Navigator>
        ) : (
          <FirstAid navigation={navigation} type={LG.type} />
        )}
        <TouchableOpacity
          style={styles.btnFab}
          onPress={e => {
            setIsFirstAid(!isFirstAid);
          }}>
          <Image
            resizeMode={'contain'}
            style={styles.iconTraCuu}
            source={isFirstAid === true ? iconSoCuu : iconBackSoCuu}
          />
        </TouchableOpacity>
      </Drawer>
      <Modal animationType="none" transparent={true} visible={isLoad}>
        <View style={styles.viewReload}>
          <ActivityIndicator size="large" color="#FF9900" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = ScaledSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  btnFab: {
    height: '60@ms',
    width: '60@ms',
    borderRadius: '30@ms',
    backgroundColor: '#FFFFFF',
    borderColor: '#F26F21',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 99,
  },
  iconTraCuu: {
    height: '60@ms',
    width: '60@ms',
  },
  fab: {
    // fontSize: '20@ms',
    borderWidth: 1,
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    borderColor: '#F26F21',
    backgroundColor: '#FFE4B5',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: '13@ms',
    paddingHorizontal: '5@ms',
  },
  container: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDrawer: {
    height: '100%',
    backgroundColor: '#F26F21',
    borderBottomRightRadius: '15@ms',
    borderTopRightRadius: '15@ms',
  },
  btnHeaderDrawer: {
    margin: '3%',
    width: '20%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOpenDrawer: {
    height: '35@ms',
    width: '35@ms',
  },
  iconLogo: {
    width: '60@ms',
    height: '60@ms',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  viewListBtn: {
    alignSelf: 'center',
    width: '80%',
  },
  iconDrawer: {
    height: '24@ms',
    width: '24@ms',
    marginRight: '10@ms',
  },
  txtDrawer: {
    fontSize: '15@ms',
    color: '#FFFFFF',
  },
  btnItemDrawer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '42@ms',
  },
  avatar: {
    height: '30@ms',
    width: '30@ms',
    borderRadius: '30@ms',
  },
  iconDra: {
    fontSize: 25,
    color: '#000000',
  },
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderAvtar: {
    height: '38@ms',
    width: '38@ms',
    borderRadius: '19@ms',
    borderColor: '#000077',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
