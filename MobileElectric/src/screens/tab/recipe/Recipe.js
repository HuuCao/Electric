import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import dataCT from '../../../core/dataFake/dataCT';
import {ScaledSheet} from 'react-native-size-matters';

const arrowRight = require('../../../assets/icons/arrowRight-black.png');
export default function Recipe({navigation}) {
  const [isListData, setIsListData] = useState(dataCT);
  const [searchInput, setSearchInput] = useState('');

  const onRenderList = function (e) {
    let removeUnicode = str => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|\s/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    };
    const A = dataCT.filter(i =>
      removeUnicode(i.name).includes(removeUnicode(e)),
    );
    setIsListData(A);
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
                navigation.navigate('Content', {
                  data: item,
                });
              }}>
              <View style={styles.btn}>
                <Image
                  resizeMode={'contain'}
                  style={styles.iconItem}
                  source={item.icon}
                />
                <Text style={styles.txtName}>{item.name}</Text>
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
  txtName: {
    color: '#282D39',
    fontSize: '15@ms',
    width: '80%',
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
});
