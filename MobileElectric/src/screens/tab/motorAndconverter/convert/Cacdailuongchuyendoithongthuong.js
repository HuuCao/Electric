import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import dataChuyenDoiDaiLuong from '../../../../core/dataFake/dataChuyenDoiDaiLuong';
import {useSelector} from 'react-redux';

const arrowRight = require('../../../../assets/icons/arrowRight-black.png');
export default function Cacdailuongchuyendoithongthuong({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
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
          source={require('../../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{LG.cacDaiLuongChuyenDoiThongThuong}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <View style={styles.viewBig}>
        {dataChuyenDoiDaiLuong.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.btnItem}
              onPress={e => {
                navigation.navigate(item.naviga);
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
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  txtBack: {
    color: '#F26F21',
    fontSize: '17@ms',
    marginLeft: '4%',
    lineHeight: '20@ms',
    fontWeight: '700',
  },
  btnBack: {
    paddingHorizontal: '3%',
    height: '40@ms',
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
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
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  iconItem: {
    height: '40@ms',
    width: '40@ms',
  },
  iconArrow: {
    width: '15@ms',
    height: '15@ms',
  },
  arrowRight: {
    height: '20@ms',
    width: '20@ms',
  },
  iconSearch: {
    marginHorizontal: '12@ms',
    height: '17@ms',
    width: '17@ms',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtName: {
    color: '#282D39',
    fontSize: '15@ms',
    width: '80%',
    lineHeight: '25@ms',
    fontWeight: '500',
  },
});
