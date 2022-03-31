/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backend from '../core/backend';
import CallApi from '../core/utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import * as language from '../constant/lang';
import dataEN from '../core/dataFake/Language/EN';
import dataVN from '../core/dataFake/Language/VN';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const loadingEET = require('../assets/images/loading.png');
const LoadingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    onCheckLanguage();

    //Kiểm tra kết nối
    NetInfo.fetch().then(state => {
      console.log('Loại kết nối: ', state.type);
      console.log('Có kết nối: ', state.isConnected);
      if (state.isConnected) {
        //Có kết nối mạng
        onCheckLogin();
        console.log('Chế độ onl');
      } else {
        console.log('Chế độ offline');
        setTimeout(() => {
          navigation.replace('Dashboard');
          Toast.show({
            text1: 'Bạn đang dùng chế độ đăng nhập offline',
            visibilityTime: 3000,
            autoHide: true,
          });
        }, 2000);
      }
    });
  }, []);

  const onCheckLanguage = async function () {
    const LangSafe = await AsyncStorage.getItem('langEET');
    const KeySafe = await AsyncStorage.getItem('keyEET');
    if (LangSafe === null || KeySafe === null) {
      dispatch({
        type: language.VN,
        data: dataVN,
      });
      console.log('chưa có ngôn ngữ');
    } else if (LangSafe !== null && KeySafe === 'VN') {
      dispatch({
        type: language.VN,
        data: dataVN,
      });
      console.log('Tiếng việt');
    } else if (LangSafe !== null && KeySafe === 'EN') {
      dispatch({
        type: language.EN,
        data: dataEN,
      });
      console.log('Tiếng anh');
    } else {
      dispatch({
        type: language.VN,
        data: dataVN,
      });
      console.log('Chưa xác định');
    }
  };

  const onCheckLogin = async function () {
    const userName = await AsyncStorage.getItem('usernameEET');
    const passWord = await AsyncStorage.getItem('passwordEET');

    if (userName !== null || passWord !== null) {
      //Đăng nhập user
      console.log('đăng nhập user');
      CallApi('post', backend.login, {
        email: userName,
        password: passWord,
      })
        .then(response => {
          if (response.data.success === false) {
            navigation.replace('LoginScreen');
          } else {
            AddToken(response.data.accessToken);
            AddInfoUser(response.data.idUser.toString());
            setTimeout(() => {
              navigation.replace('Dashboard');
              Toast.show({
                text1: 'Bạn đang dùng chế độ đăng nhập online',
                visibilityTime: 3000,
                autoHide: true,
              });
            }, 2000);
          }
        })
        .catch(e => {
          navigation.replace('Dashboard');
          Toast.show({
            text1: 'Bạn đang dùng chế độ đăng nhập offline',
            visibilityTime: 3000,
            autoHide: true,
          });
        });
    } else {
      //Đăng nhập offLine
      console.log('đăng nhập nhanh');
      setTimeout(() => {
        navigation.replace('Dashboard');
        Toast.show({
          text1: 'Bạn đang dùng chế độ đăng nhập offline',
          visibilityTime: 3000,
          autoHide: true,
        });
      }, 2000);
    }
  };

  const AddInfoUser = async value => {
    try {
      await AsyncStorage.setItem('infoUserEET', value);
    } catch (e) {}
  };

  const AddToken = async value => {
    try {
      await AsyncStorage.setItem('tokenEET', value);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground
          source={loadingEET}
          resizeMode="cover"
          style={styles.image}>
          <ActivityIndicator
            style={styles.anima}
            size="large"
            color="#FF9900"
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
  },
  anima: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '20%',
  },
});
