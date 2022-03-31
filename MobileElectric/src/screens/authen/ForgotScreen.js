import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import {useSelector} from 'react-redux';

export default function ForgotScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const LG = useSelector(state => state.languageReducer.data);

  const onForgotPass = function () {
    CallApi('post', backend.forgotPass, {
      email: email,
    })
      .then(response => {
        setIsLoad(false);
        console.log(response.data);
        if (response.data.status === true) {
          navigation.navigate('OtpScreen', {
            email: email,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: LG.emailKhongChinhXac + ' !',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
        setEmail('');
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
            <Text style={styles.txtTitleHeader}>{LG.quenMatKhau + ' ?'}</Text>
            <View style={styles.btnBack} />
          </View>

          <View style={styles.viewInput}>
            <TextInput
              onChangeText={text => setEmail(text)}
              value={email}
              style={styles.txtInput}
              keyboardType="email-address"
              placeholder={'Email'}
              autoCapitalize="sentences"
              placeholderTextColor="#A9A9A9"
            />
          </View>
          <Text style={styles.txtTitleNote}>
            {'*' + LG.chungToiGuiChoBanMotEmail}
          </Text>
          <TouchableOpacity
            style={styles.viewBtnLogin}
            onPress={e => {
              onForgotPass();
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
  viewContainer: {
    marginTop: '10%',
  },
  txtTitleHeader: {
    fontSize: '30@ms',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  viewInput: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: '15@ms',
    height: '46@ms',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '20@ms',
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
  txtInput: {
    color: '#000000',
    paddingLeft: '15@ms',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
  },
  input: {
    color: '#000000',
    paddingLeft: '17@ms',
    flex: 1,
    fontSize: '14@ms',
    height: '38@ms',
  },
  viewBtnLogin: {
    marginTop: '10%',
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
  txtTitleNote: {
    alignSelf: 'center',
    color: '#444444',
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
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
