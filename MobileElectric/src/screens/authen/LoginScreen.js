import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Keyboard,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {onAppleButtonPress} from '../../auth/root';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {onGoogleButtonPress} from '../../auth/root';
import jwt_decode from 'jwt-decode';
import {ScaledSheet} from 'react-native-size-matters';
import noPass from '../../assets/icons/noPass.png';
import viewPass from '../../assets/icons/viewPass.png';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

export default function LoginScreen({navigation}) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPass, setHiddenPass] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const LG = useSelector(state => state.languageReducer.data);

  useEffect(() => {}, []);
  console.log(LG.type);
  const onLogin = async function () {
    if (userName !== '' && password !== '') {
      setIsLoad(true);
      CallApi('post', backend.login, {
        email: userName,
        password: password,
      })
        .then(response => {
          setIsLoad(false);
          console.log(response.data);
          if (response.data.success === false) {
            Toast.show({
              type: 'error',
              text1: response.data.mess,
              visibilityTime: 2000,
              autoHide: true,
            });
          } else {
            AddUseName(userName);
            AddPassword(password);
            AddToken(response.data.accessToken);
            AddInfoUser(response.data.idUser.toString());
            navigation.replace('Dashboard');
            Toast.show({
              text1: LG.dangNhapOnline,
              visibilityTime: 3000,
              autoHide: true,
            });
          }
        })
        .catch(e => {
          setIsLoad(false);
          console.log(e);
          Toast.show({
            type: 'error',
            text1: LG.loiHeThong + ' !',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
    } else {
      Toast.show({
        type: 'error',
        text1: LG.taiKhoanHoaMatKhauKhongChinhXac,
        visibilityTime: 2000,
        autoHide: true,
      });
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

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('==> Login cancelled');
        } else {
          console.log(
            '==> Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('==> Login fail with error: ' + error);
      },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
          <View style={styles.viewContainer}>
            <Image
              resizeMode={'contain'}
              source={require('../../assets/images/logo.png')}
              style={styles.imgLogo}
            />
            <View style={styles.viewInput}>
              <TextInput
                placeholder={'Email'}
                onChangeText={text => setUsername(text)}
                value={userName}
                style={styles.txtInput}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                placeholder={LG.matKhau}
                style={styles.txtInput}
                secureTextEntry={hiddenPass}
                autoCapitalize="none"
                placeholderTextColor="#A9A9A9"
              />
              <TouchableOpacity
                onPress={e => {
                  setHiddenPass(!hiddenPass);
                }}>
                <Image
                  source={hiddenPass === false ? noPass : viewPass}
                  resizeMode={'contain'}
                  style={styles.iconViewPass}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={styles.txtForgot}
              onPress={e => {
                navigation.navigate('ForgotScreen');
              }}>
              {LG.quenMatKhau}
            </Text>
            <TouchableOpacity
              style={styles.viewBtnLogin}
              onPress={e => {
                onLogin();
                Keyboard.dismiss();
              }}>
              <Text style={styles.txtLogin}>{LG.dangNhap}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.viewBtnLogin}
              onPress={e => {
                // setIsLoad(true);
                // onLogin();
                // Keyboard.dismiss();
                navigation.replace('Dashboard');
                Toast.show({
                  text1: LG.dangNhapOffline,
                  visibilityTime: 3000,
                  autoHide: true,
                });
              }}>
              <Text style={styles.txtLogin}>{LG.dangNhapNhanh}</Text>
            </TouchableOpacity>
            {/* <View style={styles.viewBtnMXH}>
              {Platform.OS === 'ios' && (
                <AppleButton
                  buttonStyle={AppleButton.Style.WHITE}
                  buttonType={AppleButton.Type.SIGN_IN}
                  style={{
                    width: 55,
                    height: 55,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 6,
                  }}
                  onPress={async () => {
                    var token = await onAppleButtonPress();

                    var user = jwt_decode(token.identityToken);
                    console.log(user.email);
                    if (user.email !== undefined) {
                      // onLoginSocial(user.email, 'Chưa cập nhập', 'viesoftware');
                    } else {
                      alert('Lỗi hệ thống. Vui Lòng Thử Lại');
                    }
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => loginWithFacebook()}
                style={styles.viewBtnLoginFB}>
                <Image
                  source={require('../../assets/icons/fb.png')}
                  resizeMode={'contain'}
                  style={styles.iconFb}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewBtnLoginGG}
                onPress={async () => {
                  onGoogleButtonPress()
                    .then(response => {
                      console.log(response.user);
                      if (response.user != undefined) {
                      } else {
                        alert('Có Lỗi Xảy Ra, Vui Lòng Thử Lại');
                      }
                    })
                    .catch(e => {
                      console.log(e);
                      alert('Có Lỗi Xảy Ra, Vui Lòng Thử Lại');
                    });
                }}>
                <Image
                  source={require('../../assets/icons/gg.png')}
                  resizeMode={'contain'}
                  style={styles.iconFb}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.viewBottom}>
          <View style={styles.viewLogup}>
            <Text style={styles.txtNotAccount}>{LG.chuaCoTaiKhoan + ' '}</Text>
            <Text
              style={styles.txtLogup}
              onPress={e => {
                navigation.navigate('SignUpScreen');
              }}>
              {LG.dangKy}
            </Text>
          </View>
        </View>
        <Modal animationType="none" transparent={true} visible={isLoad}>
          <View style={styles.viewReload}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F26F21',
  },
  viewContainer: {
    height: '94%',
    alignItems: 'center',
  },
  viewBottom: {
    height: '6%',
  },
  viewInput: {
    marginTop: '3%',
    width: '90%',
    marginBottom: '15@ms',
    height: '45@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    backgroundColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  txtInput: {
    color: '#000000',
    paddingLeft: '15@ms',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
  },
  iconViewPass: {
    marginRight: '15@ms',
    height: '20@ms',
    width: '20@ms',
  },
  viewBtnLogin: {
    marginVertical: '2%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '40@ms',
    borderRadius: '30@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  imgLogo: {
    marginTop: '17%',
    marginBottom: '5%',
    height: '110@ms',
    width: '110@ms',
  },
  viewLogup: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  txtNotAccount: {
    fontSize: '12@ms',
    color: '#FFFFFF',
  },
  txtLogup: {
    color: '#FFFFFF',
    fontSize: '12@ms',
    fontWeight: '700',
  },
  txtForgot: {
    marginBottom: '15@ms',
    width: '90%',
    textAlign: 'right',
    color: '#FFFFFF',
    fontSize: '13@ms',
  },
  viewBtnLoginFast: {
    marginTop: '10@ms',
    borderRadius: '5@ms',
    height: '35@ms',
    width: '60%',
    borderWidth: 1,
    borderColor: '#8BEBEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtnLoginApple: {
    marginTop: '10@ms',
    borderRadius: '5@ms',
    height: '35@ms',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  txtLoginFast: {
    color: '#fff',
    fontSize: '14@ms',
  },
  txtLoginApple: {
    color: '#000000',
    fontSize: '14@ms',
  },
  txtLogin: {
    color: '#F26F21',
    fontWeight: '600',
    fontSize: '16@ms',
  },
  viewBtnLoginFB: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '55@ms',
    height: '55@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  btnLoginFB: {
    flexDirection: 'row',
    width: '100@%',
    height: '34@ms',
    borderRadius: '5@ms',
    backgroundColor: '#0066FF',
  },
  viewBtnLoginGG: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '55@ms',
    height: '55@ms',
    borderRadius: '10@ms',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  imgLogin: {
    flex: 1,
    justifyContent: 'center',
  },
  viewHeader: {
    height: '28%',
  },
  iconFb: {
    height: '20@ms',
    width: '20@ms',
  },
  viewBtnMXH: {
    marginTop: '20@ms',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
