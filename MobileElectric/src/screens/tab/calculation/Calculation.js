import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {dataCTEN, dataCTVN} from '../../../core/dataFake/dataCongcutinhtoan';
import NetInfo from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';

const arrowRight = require('../../../assets/icons/arrowRight-black.png');
const iconKey = require('../../../assets/icons/iconKey.png');
export default function Calculation({navigation}) {
  const scrollViewRef = useRef();
  const LG = useSelector(state => state.languageReducer.data);
  const [isListData, setIsListData] = useState(dataCTVN);
  const [searchInput, setSearchInput] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [checkInter, setCheckInter] = useState(null);
  // const [dataItem, setDataItem] = useState(isListData);

  useEffect(() => {
    onCheckData();
  }, []);

  const onCheckData = function () {
    if (LG.type === 'EngLish') {
      setIsListData(dataCTEN);
    } else if (LG.type === 'VietNam') {
      setIsListData(dataCTVN);
    }
  };

  const onRenderList = function (e) {
    if (LG.type === 'EngLish') {
      // setIsListData(dataCTEN);
      let removeUnicode = str => {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]|\s/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D');
      };
      const A = dataCTEN.filter(i =>
        removeUnicode(i.name).includes(removeUnicode(e)),
      );
      setIsListData(A);
    } else if (LG.type === 'VietNam') {
      // setIsListData(dataCTVN);
      let removeUnicode = str => {
        return str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]|\s/g, '')
          .replace(/đ/g, 'd')
          .replace(/Đ/g, 'D');
      };
      const A = dataCTVN.filter(i =>
        removeUnicode(i.name).includes(removeUnicode(e)),
      );
      setIsListData(A);
    }
  };

  //Kiểm tra kết nối
  // NetInfo.fetch().then(state => {
  //   console.log('Loại kết nối: ', state.type);
  //   setCheckInter(state.isConnected);
  //   console.log('Có kết nối: ', state.isConnected);
  // });

  // const onCheckInter = function (naviga, pro) {
  //   if (pro === true) {
  //     if (checkInter === true) {
  //       console.log('có kết nối internet');
  //       NetInfo.fetch().then(state => {
  //         // console.log('Loại kết nối: ', state.type);
  //         // setCheckInter(state.isConnected);
  //         // console.log('Có kết nối: ', state.isConnected);
  //         if (state.isConnected === true) {
  //           navigation.navigate(naviga);
  //         } else {
  //           setShowPopup(!showPopup);
  //         }
  //       });
  //     } else {
  //       setShowPopup(!showPopup);
  //       console.log('không kết nối internet');
  //     }
  //   } else {
  //     navigation.navigate(naviga);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.viewBig}
        ref={scrollViewRef}
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
            autoCapitalize="sentences"
            placeholderTextColor="#A9A9A9"
          />
        </View>
        {isListData.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.btnItem}
              onPress={e => {
                // onCheckInter(item.naviga, item.pro);
                navigation.navigate(item.naviga);
              }}>
              <View style={styles.btn}>
                <Image
                  resizeMode={'contain'}
                  style={styles.iconItem}
                  source={item.icon}
                />
                <View style={styles.viewNameKey}>
                  <Text style={styles.txtName}>{item.name}</Text>
                  {item.pro === true && (
                    <Image
                      resizeMode={'contain'}
                      style={styles.iconKey}
                      source={iconKey}
                    />
                  )}
                </View>
              </View>
              <Image
                resizeMode={'contain'}
                style={styles.iconArrow}
                source={arrowRight}
              />
            </TouchableOpacity>
          );
        })}
        <View style={styles.viewBottom} />
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={showPopup}>
        <View style={styles.centeredView}>
          <View style={styles.viewPopup}>
            <View style={styles.viewContaiPopup}>
              <Text style={styles.txtPopup}>
                {LG.vuiLongKiemTraKetNoi + ' !'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnOk}
              onPress={e => {
                setShowPopup(!showPopup);
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
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewBottom: {
    marginBottom: '10%',
    height: '15%',
  },
  viewNameKey: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtName: {
    color: '#282D39',
    fontSize: '15@ms',

    lineHeight: '25@ms',
    fontWeight: '500',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  viewBig: {
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
  iconKey: {
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
});
