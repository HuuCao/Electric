import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dataEN from '../../../core/dataFake/Language/EN';
import dataVN from '../../../core/dataFake/Language/VN';

const iconCheck = require('../../../assets/icons/check_language.png');
export default function LanguageScreen({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [showPopup, setShowPopup] = useState(false);
  const [isKey, setIsKey] = useState('');
  const [isNN, setIsNN] = useState('');
  const [isStatus, setIsStatus] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (LG.type === 'VietNam') {
      setIsStatus(true);
    } else if (LG.type === 'EngLish') {
      setIsStatus(false);
    } else {
      setIsStatus(true);
    }
  }, []);

  const LangUser = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('langEET', jsonValue);
    } catch (e) {}
  };

  const KeyUser = async value => {
    try {
      await AsyncStorage.setItem('keyEET', value);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.viewSafe}>
      <TouchableOpacity
        onPress={e => {
          navigation.goBack();
        }}
        style={styles.btnBack}>
        <Image
          resizeMode={'contain'}
          style={styles.arrowLeft}
          source={require('../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{LG.ngonNgu}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <View style={styles.viewContainer}>
        <View style={styles.viewListBtn}>
          <TouchableOpacity
            style={styles.btnLanguage}
            onPress={e => {
              setIsStatus(true);
              setIsKey('VN');
              setIsNN(dataVN);
            }}>
            <Text style={styles.txtLanguage}>{'Tiếng Việt'}</Text>
            {isStatus === true && (
              <Image
                resizeMode={'contain'}
                style={styles.iconCheck}
                source={iconCheck}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLanguage}
            onPress={e => {
              setIsKey('EN');
              setIsNN(dataEN);
              setIsStatus(false);
            }}>
            <Text style={styles.txtLanguage}>{'English UK'}</Text>
            {isStatus === false && (
              <Image
                resizeMode={'contain'}
                style={styles.iconCheck}
                source={iconCheck}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnApply}
          onPress={e => {
            setShowPopup(true);
          }}>
          <Text style={styles.txtApply}>{LG.apDung}</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="none" transparent={true} visible={showPopup}>
        <View style={styles.centeredView}>
          <View style={styles.viewPopup}>
            <View style={styles.viewContaiPopup}>
              <Text style={styles.txtPopupTitle}>{LG.chuY}</Text>
              <Text style={styles.txtPopup}>{LG.thayDoiNgonNgu}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnOk}
              onPress={e => {
                LangUser(isNN);
                KeyUser(isKey);
                setShowPopup(false);
                dispatch({
                  type: isKey,
                  data: isNN,
                });
                navigation.navigate('LoginScreen');
              }}>
              <Text style={styles.txtOk}>{LG.dongY}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  btnBack: {
    paddingHorizontal: '3%',
    height: '40@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  txtBack: {
    color: '#F26F21',
    fontSize: '17@ms',
    marginLeft: '4%',
    lineHeight: '20@ms',
    fontWeight: '700',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  viewContainer: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    paddingBottom: '15%',
  },
  btnLanguage: {
    flexDirection: 'row',
    paddingHorizontal: '10@ms',
    marginTop: '20@ms',
    paddingRight: '10%',
    width: '90%',
    height: '45@ms',
    backgroundColor: '#EEEEEE',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '10@ms',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
  },
  btnApply: {
    width: '90%',
    height: '45@ms',
    backgroundColor: '#F26F21',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: '20@ms',
    alignItems: 'center',
  },
  txtLanguage: {
    fontSize: '14@ms',
    color: '#555555',
    fontStyle: 'italic',
  },
  txtApply: {
    fontSize: '16@ms',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconCheck: {
    height: '20@ms',
    width: '20@ms',
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPopup: {
    width: '80%',
    height: '180@ms',
  },
  viewContaiPopup: {
    height: '140@ms',
    width: '100%',
    borderTopLeftRadius: '20@ms',
    borderTopRightRadius: '20@ms',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: '#FFFFFF',
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
  txtPopupTitle: {
    fontSize: '20@ms',
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10@ms',
  },
  txtPopup: {
    fontSize: '14@ms',
    color: '#000000',
    textAlign: 'center',
  },
  txtOk: {
    fontSize: '15@ms',
    color: '#FFFFFF',
  },
});
