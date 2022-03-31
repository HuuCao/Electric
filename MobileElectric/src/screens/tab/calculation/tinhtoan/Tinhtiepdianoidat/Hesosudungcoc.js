import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

export default function Hesosudungcoc({navigation}) {
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
      <Text style={styles.txtHeader}>{LG.heSoSuDungCocVaHeSoSuDungThanh}</Text>
      <View style={styles.viewScrollBig}>
        <Image
          resizeMode={'contain'}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: '100%',
            width: Dimensions.get('window').width + 20,
          }}
          source={require('../../../../../assets/imagesCT/hesosudungcoc.png')}
        />
      </View>
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
    height: '80%',
    width: '100%',
    justifyContent: 'flex-start',
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
  hr: {
    alignSelf: 'center',
    height: 1,
    width: '90%',
    backgroundColor: '#F26F21',
  },
  arrowLeft: {
    height: '15@ms',
    width: '15@ms',
  },
  txtHeader: {
    color: '#282D39',
    fontSize: '15@ms',
    paddingTop: '20@ms',
    paddingLeft: '20@ms',
  },
});
