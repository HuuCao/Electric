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
import dataLopcachdiencuadongco from '../../../../core/dataFake/dataLopcachdiencuadongco';
import {useSelector} from 'react-redux';

export default function LuaChonCap({navigation}) {
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
        <Text style={styles.txtBack}>{LG.lopCachDienCuaDongCo}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        keyboardDismissMode={'on-drag'}
        style={styles.viewScrollBig}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {dataLopcachdiencuadongco.map(item => {
          return (
            <View style={styles.viewItems}>
              <View style={styles.viewLeft}>
                <Text style={styles.txtLeft}> {item.left}</Text>
              </View>
              <View style={styles.viewRight}>
                <Text style={styles.txtRight}> {item.right}</Text>
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
  viewItems: {
    marginTop: '25@ms',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLeft: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLeft: {
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#3366FF',
  },
  viewRight: {
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtRight: {
    textAlign: 'center',
    fontSize: '16@ms',
    color: '#222222',
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
  viewScrollBig: {
    height: '100%',
    width: '100%',
  },
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
});
