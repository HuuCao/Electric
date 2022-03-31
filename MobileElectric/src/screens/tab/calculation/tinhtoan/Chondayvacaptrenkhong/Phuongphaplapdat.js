/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {
  Phuongphaplapdat as dataPhuongphaplapdat,
  PhuongphaplapdatEn as dataPhuongphaplapdatEn,
} from '../../../../../core/dataFake/Phuongphaplapdat';

export default function Phuongphaplapdat({navigation}) {
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
          source={require('../../../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{LG.phuongPhapLapDat}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        keyboardDismissMode={'on-drag'}
        style={styles.viewScrollBig}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {LG.type === 'VietNam' &&
          dataPhuongphaplapdat.map(item => {
            return (
              <View
                style={[
                  styles.viewBorder,
                  {borderWidth: item.border === true ? 2 : 0},
                ]}>
                <View style={styles.viewLeft}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.img}
                    source={item.icon}
                  />
                </View>
                <View style={styles.viewRight}>
                  <Text style={styles.txtTitle}>{item.name}</Text>
                </View>
              </View>
            );
          })}

        {LG.type === 'EngLish' &&
          dataPhuongphaplapdatEn.map(item => {
            return (
              <View
                style={[
                  styles.viewBorder,
                  {borderWidth: item.border === true ? 2 : 0},
                ]}>
                <View style={styles.viewLeft}>
                  <Image
                    resizeMode={'contain'}
                    style={styles.img}
                    source={item.icon}
                  />
                </View>
                <View style={styles.viewRight}>
                  <Text style={styles.txtTitle}>{item.name}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewKeyboard: {
    height: '100%',
    width: '100%',
  },
  viewScrollBig: {
    height: '100%',
    width: '100%',
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
  viewScroll: {
    height: '100%',
    alignItems: 'center',
    width: '100%',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  viewBorder: {
    alignSelf: 'center',
    width: '90%',
    minHeight: '130@ms',
    borderRadius: '20@ms',
    borderColor: '#F26F21',
    flexDirection: 'row',
    marginTop: '15@ms',
  },
  viewRight: {
    width: '55%',
    justifyContent: 'center',
    paddingRight: '10@ms',
  },
  viewLeft: {
    width: '43%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2%',
  },
  img: {
    width: '140@ms',
    height: '140@ms',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  txtTitle: {
    fontSize: '14@ms',
    color: '#444444',
  },
});
