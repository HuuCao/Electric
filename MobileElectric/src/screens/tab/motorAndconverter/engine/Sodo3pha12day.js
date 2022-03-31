/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import data3pha12 from '../../../../core/dataFake/DongCo/3pha12dau';
import {useSelector} from 'react-redux';

export default function Sodo3pha6day({navigation}) {
  const LG = useSelector(state => state.languageReducer.data);
  const Item = ({item}) => (
    <View style={styles.viewItems}>
      <Text style={styles.txtName}> {item.name} </Text>
      <Text style={styles.txtTitle}> {item.title} </Text>
      {item.images.map(itemImg => (
        <View style={styles.viewImg}>
          <Image
            resizeMode={'contain'}
            style={{
              height: 300,
              width: Dimensions.get('window').width,
            }}
            source={itemImg.image}
          />
        </View>
      ))}
    </View>
  );

  const renderItem = ({item}) => <Item item={item} />;

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
        <Text style={styles.txtBack}>{LG.soDo3Pha12}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data3pha12}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    alignItems: 'center',
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
  txtName: {
    color: '#F26F21',
    fontSize: '20@ms',
    marginVertical: '10@ms',
  },
  txtTitle: {
    color: '#2567F9',
    fontSize: '18@ms',
  },
  viewImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
