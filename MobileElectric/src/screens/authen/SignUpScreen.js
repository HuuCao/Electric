import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';

const noPass = require('../../assets/icons/noPass.png');
const viewPass = require('../../assets/icons/viewPass.png');
export default function SignUpScreen({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [hiddenPass, setHiddenPass] = useState(true);
  const [hiddenRePass, setHiddenRePass] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  // Input
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePassword] = useState('');

  const checkPhone = /^[0-9]{10}$/;
  const isAlpha = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
  const regexMail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  const onSignUp = function () {
    if (phone.length !== 0 && name.length !== 0) {
      if (isAlpha.test(rePass) === true || isAlpha.test(password) === true) {
        if (rePass === password) {
          if (regexMail.test(email) === true) {
            if (checkPhone.test(phone) === true) {
              CallApi('post', backend.logup, {
                name: name,
                email: email,
                tel: phone,
                password: rePass,
              })
                .then(response => {
                  setIsLoad(false);
                  console.log(response.data);
                  if (response.data.success === true) {
                    setTimeout(() => {
                      setIsShow(!isShow);
                    }, 500);
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: response.data.mess,
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
                text1: LG.soDienThoaiKhongDung,
                visibilityTime: 2000,
                autoHide: true,
              });
            }
          } else {
            Toast.show({
              type: 'error',
              text1: LG.gmailKhongDung,
              visibilityTime: 2000,
              autoHide: true,
            });
          }
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
    } else {
      Toast.show({
        type: 'error',
        text1: LG.vuiLongDienDayDuThongTin + ' !',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const onLogin = async function () {
    CallApi('post', backend.login, {
      email: email,
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
          AddUseName(email);
          AddPassword(password);
          AddToken(response.data.accessToken);
          AddInfoUser(response.data.idUser.toString());
          navigation.replace('Dashboard');
        }
      })
      .catch(e => {
        setIsLoad(false);
        Toast.show({
          type: 'error',
          text1: LG.loiVuiLongThuLaiSau + ' !',
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
        <KeyboardAwareScrollView extraHeight={120} enableOnAndroid>
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
              <Text style={styles.txtTitleHeader}>{LG.dangKy}</Text>
              <View style={styles.btnBack} />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                autoFocus={true}
                onChangeText={text => setName(text)}
                value={name}
                placeholder={LG.ten}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => setPhone(text)}
                value={phone}
                placeholder={LG.soDienThoai}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder={'Email'}
                onChangeText={text => setMail(text)}
                value={email}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.viewInput}>
              <TextInput
                placeholder={LG.matKhau}
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={hiddenPass}
                style={styles.input}
                placeholderTextColor="#A9A9A9"
                autoCapitalize="sentences"
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
                placeholder={LG.xacNhan}
                onChangeText={text => setRePassword(text)}
                value={rePass}
                secureTextEntry={hiddenRePass}
                style={styles.input}
                placeholderTextColor="#B1B1B1"
                autoCapitalize="sentences"
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
                onSignUp();
                setIsLoad(true);
                Keyboard.dismiss();
              }}>
              <Text style={styles.txtApply}>{LG.xacNhan}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
        <Modal animationType="none" transparent={true} visible={isLoad}>
          <View style={styles.viewReload}>
            <ActivityIndicator size="large" color="#FF9900" />
          </View>
        </Modal>
        <Modal animationType="none" transparent={true} visible={isShow}>
          <View style={styles.centeredView}>
            <View style={styles.viewPopup}>
              <View style={styles.viewContaiPopup}>
                <Text style={styles.txtPopup}>{LG.dangKiThanhCong}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnOk}
                onPress={e => {
                  setIsShow(!isShow);
                  onLogin();
                }}>
                <Text style={styles.txtOk}>{LG.xacNhan}</Text>
              </TouchableOpacity>
            </View>
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
  viewContainer: {
    marginTop: '10%',
  },
  txtTitleHeader: {
    height: '40@ms',
    fontSize: '30@ms',
    color: '#FFFFFF',
    fontWeight: '700',
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  txtInput: {
    color: '#FFFFFF',
    paddingLeft: '10@ms',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
  },
  form: {
    width: '90%',
    minHeight: '30%',
    borderRadius: '20@ms',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  title: {
    fontSize: '25@ms',
    color: '#F55B46',
    fontWeight: 'bold',
    marginVertical: '7%',
    marginBottom: '20%',
  },
  input: {
    color: '#000000',
    paddingLeft: '15@ms',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
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
});
