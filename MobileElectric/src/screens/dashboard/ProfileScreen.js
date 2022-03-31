import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import CallApi from '../../core/utils/utils';
import backend from '../../core/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

export default function ProfileScreen({navigation, route}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [name, setName] = useState(
    route.params === undefined ? 'Admin Free' : route.params.data.name,
  );
  const [phone, setPhone] = useState(
    route.params === undefined ? '0123456789' : route.params.data.tel,
  );
  const [email, setEmail] = useState(
    route.params === undefined ? 'AdminEET@gmail.com' : route.params.data.email,
  );

  const [showPopup, setShowPopup] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const checkPhone = /^[0-9]{10}$/;
  const regexMail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  const onUpdateProfile = async function () {
    setIsLoad(true);
    const tokenEET = await AsyncStorage.getItem('tokenEET');
    const infoUserEET = await AsyncStorage.getItem('infoUserEET');
    if (phone.length !== 0 && name.length !== 0) {
      if (regexMail.test(email) === true) {
        if (checkPhone.test(phone) === true) {
          setIsLoad(false);
          CallApi(
            'patch',
            backend.updateUser + infoUserEET,
            {
              name: name,
              email: email,
              tel: phone,
            },
            tokenEET,
          )
            .then(response => {
              setIsLoad(false);
              Toast.show({
                text1: LG.capNhapThanhCong,
                visibilityTime: 2000,
                autoHide: true,
              });
            })
            .catch(e => {
              setIsLoad(false);
              console.log(e);
              Toast.show({
                type: 'error',
                text1: LG.loiVuiLongThuLaiSau,
                visibilityTime: 2000,
                autoHide: true,
              });
            });
        } else {
          setIsLoad(false);
          Toast.show({
            type: 'error',
            text1: LG.soDienThoaiKhongDung,
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } else {
        setIsLoad(false);
        Toast.show({
          type: 'error',
          text1: LG.gmailKhongDung,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      setIsLoad(false);
      Toast.show({
        type: 'error',
        text1: LG.vuiLongDienDayDuThongTin,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.viewContainer}>
        <View style={styles.viewHeader}>
          <View style={styles.viewButton}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={e => {
                navigation.goBack();
              }}>
              <Image
                resizeMode={'contain'}
                style={styles.iconBack}
                source={require('../../assets/icons/arrowleft.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSave}
              onPress={e => {
                if (route.params === undefined) {
                  setShowPopup(!showPopup);
                } else {
                  onUpdateProfile();
                }
              }}>
              <Text style={styles.txtSave}> {LG.luu}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewAvatar}>
            <View style={styles.borderAvtar}>
              <Image
                resizeMode={'contain'}
                style={styles.avatar}
                source={require('../../assets/icons/avatar.png')}
              />
            </View>
            <TouchableOpacity style={styles.viewCamera}>
              <Image
                resizeMode={'contain'}
                style={styles.camera}
                source={require('../../assets/icons/camera.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.txtTitle}> {LG.ten}</Text>
          <TextInput
            onChangeText={text => setName(text)}
            value={name}
            style={styles.txtInput}
            placeholderTextColor="#000000"
            autoCapitalize="sentences"
          />
          <View style={styles.hr} />
          <Text style={styles.txtTitle}> {LG.soDienThoai}</Text>
          <TextInput
            onChangeText={text => setPhone(text)}
            value={phone}
            style={styles.txtInput}
            placeholderTextColor="#000000"
            autoCapitalize="sentences"
          />
          <View style={styles.hr} />
          <Text style={styles.txtTitle}> {'Email'}</Text>
          <TextInput
            onChangeText={text => setEmail(text)}
            value={email}
            style={styles.txtInput}
            placeholderTextColor="#000000"
            autoCapitalize="sentences"
          />
          <View style={styles.hr} />
          <TouchableOpacity
            style={styles.viewLinearGradient}
            onPress={e => {
              navigation.navigate('UpdateVs');
            }}>
            <LinearGradient
              style={styles.viewPro}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 0.0}}
              colors={['rgba(232, 87, 25, 0.66)', 'rgba(241, 60, 147, 1)']}>
              <Text style={styles.txtTitlePro}>{'PRO'}</Text>
              <Text style={styles.txtDate}>{'30/12/2021'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Modal animationType="none" transparent={true} visible={showPopup}>
          <View style={styles.centeredView}>
            <View style={styles.viewPopup}>
              <View style={styles.viewContaiPopup}>
                <Text style={styles.txtPopup}>{LG.uuDaiDatNhap}</Text>
              </View>
              <View style={styles.viewBtnBottom}>
                <TouchableOpacity
                  style={styles.btnCancel}
                  onPress={e => {
                    setShowPopup(!showPopup);
                  }}>
                  <Text style={styles.txtCancel}>{LG.huy}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnOk}
                  onPress={e => {
                    setShowPopup(!showPopup);
                    navigation.navigate('LoginScreen');
                  }}>
                  <Text style={styles.txtOk}>{LG.xacNhan}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  viewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewHeader: {
    backgroundColor: '#F26F21',
    height: '30%',
    width: '100%',
  },
  container: {
    backgroundColor: '#FFFFFF',
    height: '70%',
    width: '86%',
    alignSelf: 'center',
    paddingTop: '20@ms',
  },
  viewButton: {
    paddingHorizontal: '15@ms',
    alignItems: 'flex-end',
    height: '28%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtSave: {
    textTransform: 'uppercase',
    fontSize: '15@ms',
    color: '#FF6600',
    fontWeight: 'bold',
  },
  iconBack: {
    height: '20@ms',
    width: '20@ms',
  },
  btnSave: {
    height: '30@ms',
    width: '70@ms',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  btnBack: {
    height: '30@ms',
    width: '70@ms',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  viewAvatar: {
    marginTop: '3%',
    alignItems: 'center',
    width: '110@ms',
    alignSelf: 'center',
  },
  avatar: {
    height: '100@ms',
    width: '100@ms',
    borderRadius: '58@ms',
  },
  borderAvtar: {
    height: '121@ms',
    width: '121@ms',
    borderRadius: '61@ms',
    borderColor: '#FFFFFF',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCamera: {
    backgroundColor: '#FFFFFF',
    width: '28@ms',
    height: '28@ms',
    borderRadius: '14@ms',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  camera: {
    height: '18@ms',
    width: '18@ms',
  },
  hr: {
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginBottom: '10@ms',
  },
  txtInput: {
    color: '#000000',
    fontSize: '17@ms',
    height: '38@ms',
    marginLeft: '5@ms',
  },
  txtTitle: {
    color: '#666666',
    fontSize: '17@ms',
  },
  viewPro: {
    height: '98@ms',
    width: '100%',
    borderRadius: '20@ms',
    justifyContent: 'center',
    paddingLeft: '15%',
  },
  viewLinearGradient: {
    marginTop: '10%',
    height: '100@ms',
    width: '99%',
    borderRadius: '20@ms',
    shadowColor: 'rgba(232, 87, 25, 0.66)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 6,
  },
  txtTitlePro: {
    color: '#FFFFFF',
    fontSize: '20@ms',
    fontWeight: '600',
    marginBottom: '5@ms',
  },
  txtDate: {
    color: '#FFFFFF',
    fontSize: '17@ms',
    fontWeight: '300',
  },
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '50%',
    height: '40@ms',
    borderBottomRightRadius: '20@ms',
  },
  btnCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    backgroundColor: '#DDDDDD',
    width: '50%',
    height: '40@ms',
    borderBottomLeftRadius: '20@ms',
  },
  txtPopup: {
    lineHeight: '25@ms',
    fontSize: '16@ms',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtOk: {
    fontSize: '15@ms',
    color: '#FFFFFF',
  },
  txtCancel: {
    fontSize: '15@ms',
    color: '#000000',
  },
  viewBtnBottom: {
    flexDirection: 'row',
  },
});
