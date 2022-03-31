import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ScaledSheet} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

export default function NoteScreen({navigation}) {
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
        <Text style={styles.txtBack}>{LG.chuY}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        style={styles.viewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.viewTitle}>
          <Text style={styles.txtTitle}>{LG.luuY}</Text>
        </View>
        <View style={styles.viewListTxt}>
          <Text style={styles.txtContent}>{LG.soCuu1}</Text>
          <Text style={styles.txtContent}>{LG.soCuu2}</Text>
          <Text style={styles.txtContent}>{LG.soCuu3}</Text>
          <Text style={styles.txtContent}>{LG.soCuu4}</Text>
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
  viewContainer: {
    flex: 1,
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
  txtTitle: {
    fontSize: '15@ms',
    color: '#000000',
    fontWeight: 'bold',
  },
  viewListTxt: {
    paddingLeft: '15@ms',
    width: '90%',
    alignSelf: 'center',
  },
  txtContent: {
    lineHeight: '22@ms',
    marginTop: '5@ms',
    fontSize: '14@ms',
    color: '#000000',
  },
});
