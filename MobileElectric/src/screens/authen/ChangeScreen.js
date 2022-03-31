import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import noPass from '../../assets/icons/noPass.png';
import viewPass from '../../assets/icons/viewPass.png';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export default function ChangeScreen({navigation, route}) {
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const [Password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const isAlpha = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
  const LG = useSelector(state => state.languageReducer.data);

  const onChangPass = function () {
    if (isAlpha.test(Password) === true || isAlpha.test(rePassword) === true) {
      if (Password === rePassword) {
        setIsLoad(true);
        CallApi('post', backend.changePass, {
          email: route.params.email,
          password: Password,
        })
          .then(response => {
            setTimeout(() => {
              setIsLoad(false);
            }, 500);
            console.log(response.data);

            if (response.data.success === true) {
              setTimeout(() => {
                setIsShow(!isShow);
                Toast.show({
                  text1: LG.thietLapMatKhauThanhCong,
                  visibilityTime: 2000,
                  autoHide: true,
                });
              }, 700);
            } else {
              Toast.show({
                type: 'error',
                text1: LG.thietLapMatKhauThatBai,
                visibilityTime: 2000,
                autoHide: true,
              });
            }
          })
          .catch(e => {
            setIsLoad(false);
            Toast.show({
              type: 'error',
              text1: LG.loiVuiLongThuLaiSau,
              visibilityTime: 2000,
              autoHide: true,
            });
          });
      } else {
        Toast.show({
          type: 'error',
          text1: LG.xacThucKhongTrungKhop,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: LG.matKhauKhongDuDoBaoMat,
        text2: LG.tren8KiTu,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  //Login
  const onLogin = async function () {
    CallApi('post', backend.login, {
      email: route.params.email,
      password: Password,
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
          AddUseName(route.params.email);
          AddPassword(Password);
          AddToken(response.data.accessToken);
          AddInfoUser(response.data.idUser.toString());
          navigation.replace('Dashboard');
        }
      })
      .catch(e => {
        setIsLoad(false);
        Toast.show({
          type: 'error',
          text1: LG.loiHeThong,
          visibilityTime: 2000,
          autoHide: true,
        });
      });
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.viewHeader}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={e => {
                navigation.goBack();
              }}>
              <Image
                resizeMode={'contain'}
                source={require('../../assets/icons/arrowLeft-2.png')}
                style={styles.iconBack}
              />
            </TouchableOpacity>
            <Text style={styles.txtTitleHeader}>{LG.dangLaiMatKhau}</Text>
            <View style={styles.btnBack} />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              onChangeText={text => setPassword(text)}
              value={Password}
              secureTextEntry={hiddenPass}
              style={styles.txtInput}
              autoCapitalize="sentences"
              placeholder={LG.matKhauMoi}
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
          <View style={styles.viewInput}>
            <TextInput
              onChangeText={text => setRePassword(text)}
              value={rePassword}
              secureTextEntry={hiddenRePass}
              style={styles.txtInput}
              autoCapitalize="sentences"
              placeholder={LG.xacNhan}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity
              onPress={e => {
                setHiddenRePass(!hiddenRePass);
              }}>
              <Image
                source={hiddenRePass === false ? noPass : viewPass}
                resizeMode={'contain'}
                style={styles.iconViewPass}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.viewBtnLogin}
            onPress={e => {
              onChangPass();
              Keyboard.dismiss();
            }}>
            <Text style={styles.txtApply}>{LG.xacNhan}</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="none" transparent={true} visible={isShow}>
          <View style={styles.centeredView}>
            <View style={styles.viewPopup}>
              <View style={styles.viewContaiPopup}>
                <Text style={styles.txtPopup}>{LG.xacNhanDangNhap + ' !'}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnOk}
                onPress={e => {
                  setIsShow(!isShow);
                  setTimeout(() => {
                    onLogin();
                    setIsLoad(true);
                  }, 200);
                }}>
                <Text style={styles.txtOk}>{LG.xacNhan}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal animationType="none" transparent={true} visible={isLoad}>
          <View style={styles.viewReload}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F26F21',
  },
  txtTitleHeader: {
    fontSize: '30@ms',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  viewContainer: {
    marginTop: '10%',
  },
  viewInput: {
    marginTop: '2%',
    width: '90%',
    marginBottom: '15@ms',
    height: '46@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
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
  txtTitleInput: {
    width: '33%',
    paddingLeft: '10@ms',
    fontSize: '14@ms',
    color: '#A9A9A9',
  },
  iconViewPass: {
    marginRight: '20@ms',
    height: '20@ms',
    width: '20@ms',
  },
  viewBtnLogin: {
    marginVertical: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '46@ms',
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
  txtApply: {
    color: '#000000',
    fontWeight: '600',
    fontSize: '16@ms',
  },
  viewHeader: {
    paddingHorizontal: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  btnBack: {
    height: '40@ms',
    width: '40@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBack: {
    width: '20@ms',
    height: '20@ms',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPopup: {
    width: '80%',
    height: '150@ms',
    backgroundColor: '#FFFFFF',
    borderRadius: '20@ms',
  },
  viewContaiPopup: {
    height: '110@ms',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  btnOk: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#F26F21',
    width: '100%',
    height: '40@ms',
    borderBottomLeftRadius: '20@ms',
    borderBottomRightRadius: '20@ms',
  },
  txtPopup: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtOk: {
    fontSize: '15@ms',
    color: '#FFFFFF',
  },

  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
