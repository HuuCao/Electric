import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import dataDongco from '../../../core/dataFake/dataDongcoChuyendoi';
import dataChuyendoi from '../../../core/dataFake/dataDongcoChuyendoi2';
import {useSelector} from 'react-redux';

const arrowRight = require('../../../assets/icons/arrowRight-black.png');
export default function MotorAndConverter({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const [isListDataDongco, setIsListDataDongco] = useState(dataDongco);
  const [isListDataChuyendoi, setIsListDataChuyendoi] = useState(dataChuyendoi);
  const [searchInput, setSearchInput] = useState('');

  const onRenderList = function (e) {
    let removeUnicode = str => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|\s/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    };
    const A = dataDongco.filter(i =>
      removeUnicode(i.name).includes(removeUnicode(e)),
    );
    setIsListDataDongco(A);

    const B = dataChuyendoi.filter(i =>
      removeUnicode(i.name).includes(removeUnicode(e)),
    );
    setIsListDataChuyendoi(B);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.viewBig}
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
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitleItem}>{LG.dongCo}</Text>
        </View>
        {isListDataDongco.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.btnItem}
              onPress={e => {
                navigation.navigate(item.naviga);
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
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitleItem}>{LG.chuyenDoi}</Text>
        </View>
        {isListDataChuyendoi.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.btnItem}
              onPress={e => {
                navigation.navigate(item.naviga);
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
    </SafeAreaView>
  );
}
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  txtTitleBtn: {
    color: '#282D39',
    fontSize: '15@ms',
    marginLeft: '5%',
    fontWeight: '500',
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
    width: '80%',
    alignItems: 'center',
  },
  viewTitle: {
    marginLeft: '-14@ms',
    justifyContent: 'center',
    marginTop: '5%',
    height: '35@ms',
  },
  txtTitleItem: {
    color: '#F26F21',
    fontSize: '17@ms',
    marginLeft: '5%',
    fontWeight: '500',
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
});
