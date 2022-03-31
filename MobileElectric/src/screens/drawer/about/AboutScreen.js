import React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

export default function AboutScreen({navigation}) {
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
        <Text style={styles.txtBack}>{LG.about}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Image
          source={require('../../../assets/icons/logoAbout.png')}
          resizeMode={'contain'}
          style={styles.logo}
        />
        <View style={styles.viewRow}>
          <Text style={styles.txtRight2}>
            {
              'VNK– Công ty Cổ phần Xây lắp và bảo dưỡng cơ điện – thành lập vào năm 2008, hoạt động chuyên ngành Cơ Điện Lạnh (M&E), đã được các Chủ đầu tư là các công ty đa quốc gia cũng như các công ty trong nước đánh giá cao qua các công trình dân dụng và công nghiệp.'
            }
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.txtLeft}>{'Trụ sở chính: '}</Text>
          <View style={styles.listAddress}>
            <Text style={styles.txtRight1}>
              {
                'Số 8 Lô 2, Ngõ 217, Đường La Thành, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội'
              }
            </Text>
            <Text style={styles.txtRight1}>
              {'Số 38 Đường số 3, Phường 26, Quận Bình Thạnh, TP.Hồ Chí Minh'}
            </Text>
          </View>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.txtLeft}>{'Chi nhánh: '}</Text>
          <Text style={styles.txtRight}>{'Tân Bình - TP HCM'}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.txtLeft}>{'Thời gian làm việc: '}</Text>
          <View style={styles.listAddress}>
            <Text style={styles.txtLink}>{'Mon - Sat: 9:00 - 18:00'}</Text>
          </View>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.txtLeft}>{'Hotline: '}</Text>
          <View style={styles.listAddress}>
            <Text style={styles.txtLink}>{'(+84) 24 3552 7727'}</Text>
            <Text style={styles.txtLink}>{'(+84) 4 3772 7057'}</Text>
          </View>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.txtLeft}>{'Email: '}</Text>
          <Text style={styles.txtLink}>{'info@vnk.com.vn'}</Text>
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
  txtFAQ: {
    marginVertical: '20@ms',
    fontSize: '45@ms',
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  itemFAQ: {
    backgroundColor: '#FFFFFF',
  },
  txtItemFAQ: {
    color: '#F26F21',
    fontSize: '16@ms',
  },
  viewInFAQ: {
    backgroundColor: 'rgba(242, 111, 33, 0.12)',
  },
  iconItem: {
    position: 'absolute',
    right: '15@ms',
  },
  logoSafe: {
    marginVertical: '30@ms',
    alignSelf: 'center',
    height: '78@ms',
    width: '98@ms',
  },
  txtNameCompany: {
    color: '#3F407B',
    fontSize: '20@ms',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txtLeft: {
    width: '30%',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtRight: {
    width: '70%',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtRight1: {
    marginBottom: '20@ms',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtRight2: {
    textAlign: 'left',
    marginBottom: '20@ms',
    fontSize: '14@ms',
    color: '#000000',
  },
  txtLink: {
    width: '70%',
    fontSize: '14@ms',
    color: '#000000',
  },
  viewRow: {
    marginTop: '20@ms',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  contact: {
    marginTop: '10@ms',
    alignSelf: 'center',
    width: '90%',
    height: '200@ms',
  },
  listAddress: {
    width: '70%',
    flexDirection: 'column',
  },
  logo: {
    alignSelf: 'center',
    marginVertical: '20@ms',
    width: '100@ms',
    height: '100@ms',
  },
});
