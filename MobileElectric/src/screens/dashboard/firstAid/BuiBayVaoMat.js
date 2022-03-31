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
import {useSelector} from 'react-redux';

export default function BuiBayVaoMatScreen({navigation, route}) {
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
          source={require('../../../assets/icons/arrowleft.png')}
        />
        <Text style={styles.txtBack}>{route.params.data.title}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        style={styles.viewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{LG.buiBayVaoMat}</Text>
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.txtContent}>{LG.dongTac1}</Text>
          <Text style={styles.txtGhiChu}>{LG.buiBayVaoMat1}</Text>
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.txtContent}>{LG.dongTac2}</Text>
          <Text style={styles.txtGhiChu}>{LG.buiBayVaoMat3}</Text>
          <Image
            resizeMode={'contain'}
            style={[
              styles.imgItem,
              {
                width: Dimensions.get('window').width,
              },
            ]}
            source={require('../../../assets/imgSoCuu/imgBuiBayVaoMat/buiBayVaoMat1.png')}
          />
        </View>
        <View style={styles.viewItem}>
          <Text style={styles.txtContent}>{LG.dongTac3}</Text>
          <Text style={styles.txtGhiChu}>{LG.buiBayVaoMat4}</Text>
          <Image
            resizeMode={'contain'}
            style={[
              styles.imgItem,
              {
                width: Dimensions.get('window').width,
              },
            ]}
            source={require('../../../assets/imgSoCuu/imgBuiBayVaoMat/buiBayVaoMat2.png')}
          />
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
    minHeight: '38@ms',
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
    lineHeight: '20@ms',
    fontSize: '15@ms',
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtDanger: {
    marginTop: '15@ms',
    lineHeight: '20@ms',
    fontSize: '18@ms',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtPhone: {
    marginTop: '10@ms',
    lineHeight: '20@ms',
    fontSize: '18@ms',
    color: '#3366CC',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtLoading: {
    fontSize: '16@ms',
    color: '#000000',
    textAlign: 'center',
    marginBottom: '30@ms',
  },
});
