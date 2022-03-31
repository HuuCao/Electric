import React, {useState} from 'react';
import {
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {dataSoCuu, dataSoCuuEn} from '../../../core/dataFake/dataSoCuu';
import {useSelector} from 'react-redux';

const arrowRight = require('../../../assets/icons/arrowRight-black.png');
export default function FirstAid({navigation, type}) {
  const [isListData, setIsListData] = useState(
    type === 'VietNam' ? dataSoCuu : dataSoCuuEn,
  );
  // const [isListData, setIsListData] = useState(dataSoCuu);
  const [searchInput, setSearchInput] = useState('');
  const LG = useSelector(state => state.languageReducer.data);

  console.log(type);

  const onRenderList = function (e) {
    let removeUnicode = str => {
      return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]|\s/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
    };
    if (LG.type === 'VietNam') {
      const A = dataSoCuu.filter(i =>
        removeUnicode(i.title).includes(removeUnicode(e)),
      );
      setIsListData(A);
    } else {
      const A = dataSoCuuEn.filter(i =>
        removeUnicode(i.title).includes(removeUnicode(e)),
      );
      setIsListData(A);
    }
  };

  return (
    <View style={styles.container}>
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
      <ScrollView
        style={styles.viewScroll}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.txtTitle}>{LG.huongDanSoCuu}</Text>
        {isListData.map(item => {
          return (
            <TouchableOpacity
              style={styles.btnItem}
              onPress={e => {
                navigation.navigate(item.name, {
                  data: item,
                });
              }}>
              <View style={styles.viewNameImg}>
                <Image
                  resizeMode={'contain'}
                  style={styles.iconItem}
                  source={require('../../../assets/icons/firstAid.png')}
                />
                <Text style={styles.txtTitleBtn}>{item.title}</Text>
              </View>
              <Image
                resizeMode={'contain'}
                style={styles.arrowRight}
                source={arrowRight}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: '20@ms',
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
  },
  viewSearch: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    borderRadius: '20@ms',
    marginTop: '5%',
    height: '37@ms',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconSearch: {
    marginHorizontal: '12@ms',
    height: '17@ms',
    width: '17@ms',
  },
  txtTitle: {
    color: '#F26F21',
    fontSize: '17@ms',
  },
  viewScroll: {
    width: '100%',
    paddingHorizontal: '5%',
    marginVertical: '15@ms',
    alignSelf: 'center',
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  viewNameImg: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  iconItem: {
    height: '40@ms',
    width: '40@ms',
  },
  txtTitleBtn: {
    color: '#282D39',
    fontSize: '15@ms',
    marginLeft: '5%',
    fontWeight: '500',
  },
  arrowRight: {
    height: '15@ms',
    width: '15@ms',
  },
  txtInput: {
    color: '#000000',
    width: '100%',
    fontSize: '14@ms',
    height: '35@ms',
  },
});
