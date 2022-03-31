import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import dataChiase from '../../../core/dataFake/dataChiase';
import Toast from 'react-native-toast-message';
import CallApi from '../../../core/utils/utils';
import backend from '../../../core/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const arrowRight = require('../../../assets/icons/arrowRight-black.png');
export default function Resources({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [isListData, setIsListData] = useState(dataChiase);
  const [searchInput, setSearchInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const onRenderList = function (e) {
    let removeUnicode = str => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|\s/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    };
    const A = dataChiase.filter(i =>
      removeUnicode(i.name).includes(removeUnicode(e)),
    );
    setIsListData(A);
  };

  const onGetDataItem = async function (e, title) {
    const tokenEET = await AsyncStorage.getItem('tokenEET');
    const usernameEET = await AsyncStorage.getItem('usernameEET');
    setIsLoad(true);
    if (tokenEET !== null && usernameEET !== null) {
      CallApi('get', backend.blog + e, '', tokenEET)
        .then(response => {
          setIsLoad(false);
          navigation.navigate('BlogScreen', {
            data: response.data.data,
            title: title,
          });
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
      setTimeout(() => {
        setIsLoad(false);
        setTimeout(() => {
          setIsLoad(false);
          setShowPopup(!showPopup);
        }, 300);
      }, 500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.viewScroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.viewSearch}>
          <Image
            resizeMode={'contain'}
            style={styles.iconSearch}
            source={require('../../../assets/icons/search.png')}
          />
          <TextInput
            onChangeText={text => (onRenderList(text), setSearchInput(text))}
            value={searchInput}
            style={styles.txtInput}
            keyboardType="email-address"
            autoCapitalize="sentences"
            placeholderTextColor="#A9A9A9"
          />
        </View>
        {isListData.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.btnItem}
              onPress={e => {
                onGetDataItem(item.id, item.name);
              }}>
              <View style={styles.viewNameImg}>
                <Image
                  resizeMode={'contain'}
                  style={styles.iconItem}
                  source={item.icon}
                />
                <Text style={styles.txtTitleBtn}>{item.name}</Text>
              </View>
              <Image
                resizeMode={'contain'}
                style={styles.iconArrow}
                source={arrowRight}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={showPopup}>
        <View style={styles.centeredView}>
          <View style={styles.viewPopup}>
            <View style={styles.viewContaiPopup}>
              <Text style={styles.txtPopup}>{LG.uuDaiDatNhap + ' !'}</Text>
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
    </SafeAreaView>
  );
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtTitleBtn: {
    color: '#282D39',
    fontSize: '15@ms',
    marginLeft: '5%',
    fontWeight: '500',
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  txtTitle: {
    color: '#282D39',
    fontSize: '15@ms',
    marginLeft: '5%',
    fontWeight: '500',
  },
  viewScroll: {
    alignSelf: 'center',
    width: '90%',
    height: '95%',
    marginVertical: '4%',
    paddingHorizontal: '5%',
    borderRadius: '20@ms',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  iconItem: {
    height: '40@ms',
    width: '40@ms',
  },
  iconArrow: {
    width: '15@ms',
    height: '15@ms',
  },
  viewNameImg: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowRight: {
    height: '20@ms',
    width: '20@ms',
  },
  viewSearch: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    borderRadius: '20@ms',
    marginTop: '5%',
    height: '37@ms',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    marginHorizontal: '12@ms',
    height: '17@ms',
    width: '17@ms',
  },
  txtInput: {
    color: '#000000',
    width: '100%',
    fontSize: '14@ms',
    height: '35@ms',
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
  viewReload: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
