/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import {useSelector} from 'react-redux';

export default function OtpScreen({navigation, route}) {
  const LG = useSelector(state => state.languageReducer.data);
  let textInput = useRef(null);
  const lengthInput = 6;
  const [internalVal, setInternalVal] = useState('');
  internalVal.length === 6;
  const [isLoad, setIsLoad] = useState(false);

  const onChangeText = val => {
    setInternalVal(val);
  };

  const onVetifyOTP = function () {
    if (internalVal.length === 6) {
      CallApi('post', backend.verifyotp, {
        email: route.params.email,
        code: internalVal,
      })
        .then(response => {
          setIsLoad(false);
          console.log(response.data);
          if (response.data.success === true) {
            navigation.navigate('ChangeScreen', {
              email: route.params.email,
            });
          } else {
            Toast.show({
              type: 'error',
              text1: LG.maOTPKhongChinhXac + ' !',
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        })
        .catch(e => {
          setIsLoad(false);
          Toast.show({
            type: 'error',
            text1: LG.loiHeThong + ' !',
            visibilityTime: 2000,
            autoHide: true,
          });
        });
      setInternalVal('');
    } else {
      Toast.show({
        type: 'error',
        text1: LG.vuiLongDienMaOTP,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  const onReOTP = function () {
    CallApi('post', backend.forgotPass, {
      email: route.params.email,
    })
      .then(response => {
        setIsLoad(false);
        Toast.show({
          text1: LG.guiLaiOTPThanhCong,
          visibilityTime: 2000,
          autoHide: true,
        });
      })
      .catch(e => {
        setIsLoad(false);
        Toast.show({
          type: 'error',
          text1: LG.loiHeThong + ' !',
          visibilityTime: 2000,
          autoHide: true,
        });
      });
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
            <Text style={styles.txtTitleHeader}>{LG.xacThucMaOTP}</Text>
            <View style={styles.btnBack} />
          </View>
          <TextInput
            textContentType="oneTimeCode"
            autoFocus={true}
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={styles.txtInputOTP}
            value={internalVal}
            maxLength={lengthInput}
            keyboardType="numeric"
          />
          <View style={styles.viewInput}>
            <View style={styles.viewOTP}>
              <Text style={styles.txtOTP}> {'OTP'}</Text>
            </View>
            <View style={styles.containerInput}>
              {Array(lengthInput)
                .fill()
                .map((data, index) => (
                  <View
                    key={index}
                    style={[
                      styles.cellView,
                      {
                        borderBottomColor:
                          index === internalVal.length ? '#C9CFDF' : '#F55B46',
                      },
                    ]}>
                    <Text
                      style={styles.cellText}
                      onPress={() => textInput.focus()}>
                      {internalVal && internalVal.length > 0
                        ? internalVal[index]
                        : ''}
                    </Text>
                  </View>
                ))}
            </View>
          </View>
          <Text style={styles.txtHeader}>
            {'*' + LG.chungToiGuiChoBanMotEmail}
          </Text>
          <View style={styles.viewResend}>
            <Text style={styles.txtHeader1}>{LG.chuaNhanDuocOTP}</Text>
            <Text
              style={styles.txtHeader2}
              onPress={e => {
                onReOTP();
                setIsLoad(true);
              }}>
              {' ' + LG.guiLai}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewBtnLogin}
            onPress={e => {
              onVetifyOTP();
              setIsLoad(true);
            }}>
            <Text style={styles.txtApply}>{LG.xacNhan}</Text>
          </TouchableOpacity>
        </View>
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
  txtInputOTP: {
    width: 0,
    height: 0,
  },
  containerInput: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  cellView: {
    borderColor: '#ACACAC',
    borderBottomWidth: 2,
    textAlign: 'center',
    height: '40@ms',
    paddingTop: '8@ms',
    width: '25@ms',
    margin: '5@ms',
  },
  cellText: {
    textAlign: 'center',
    fontSize: '18@ms',
    height: '100%',
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
  txtHeader: {
    lineHeight: '20@ms',
    fontSize: '14@ms',
    color: '#444444',
    alignSelf: 'center',
    width: '90%',
  },
  txtApply: {
    color: '#000000',
    fontWeight: '600',
    fontSize: '16@ms',
  },
  viewResend: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '10@ms',
  },
  txtHeader1: {
    lineHeight: '20@ms',
    fontSize: '14@ms',
    color: '#222222',
  },
  txtHeader2: {
    lineHeight: '20@ms',
    fontSize: '14@ms',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: '30@ms',
    marginBottom: '15@ms',
  },
  viewOTP: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '27%',
  },
  txtOTP: {
    fontSize: '14@ms',
    color: '#555555',
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
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
