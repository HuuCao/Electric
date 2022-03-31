import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import {dataNgat1, dataNgat1En} from '../../../../core/dataFake/dataSoCuu';
import {useSelector} from 'react-redux';

export default function NgatItem1Screen({navigation, route}) {
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
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        style={styles.viewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{route.params.data.name}</Text>
        </View>
        {LG.type === 'VietNam' &&
          dataNgat1.map((item, index) => {
            return (
              <View style={styles.viewItem}>
                <Text style={styles.txtContent}>{item.name}</Text>
                <Image
                  resizeMode={'contain'}
                  style={[
                    styles.imgItem,
                    {
                      width: Dimensions.get('window').width,
                    },
                  ]}
                  source={item.img}
                />
              </View>
            );
          })}
        {LG.type === 'EngLish' &&
          dataNgat1En.map((item, index) => {
            return (
              <View style={styles.viewItem}>
                <Text style={styles.txtContent}>{item.name}</Text>
                <Image
                  resizeMode={'contain'}
                  style={[
                    styles.imgItem,
                    {
                      width: Dimensions.get('window').width,
                    },
                  ]}
                  source={item.img}
                />
              </View>
            );
          })}

        <View style={styles.viewItem}>
          <Text style={styles.txtContent}>{LG.ghiChu}</Text>
          <Text style={styles.txtGhiChu}>{LG.ngungThoTimConDap1}</Text>
          <Text style={styles.txtGhiChu}>{LG.ngungThoTimConDap2}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  viewSafe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewScroll: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
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
  viewItem: {
    paddingLeft: '15@ms',
    width: '90%',
    alignSelf: 'center',
  },
  viewContainer: {
    flex: 1,
  },
  imgItem: {
    alignSelf: 'center',
    height: '250@ms',
  },
  viewTitle: {
    margin: '15@ms',
    height: '38@ms',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCFFFF',
    borderRadius: '10@ms',
    borderWidth: 2,
    borderColor: '#6699FF',
  },
  txtContent: {
    lineHeight: '22@ms',
    fontWeight: 'bold',
    marginTop: '15@ms',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtGhiChu: {
    paddingLeft: '15@ms',
    lineHeight: '22@ms',
    marginTop: '5@ms',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtTitle: {
    fontSize: '15@ms',
    color: '#000000',
    fontWeight: 'bold',
  },
});
