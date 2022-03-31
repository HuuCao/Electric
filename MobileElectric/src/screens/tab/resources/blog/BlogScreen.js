import React from 'react';
import {Text, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';

const BlogScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.txtBack}>{route.params.title}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        style={styles.viewItem}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Image
          source={{
            uri: route.params.data.image,
          }}
          resizeMode={'contain'}
          style={styles.imgNews}
        />
        <Text numberOfLines={2} style={styles.txtTitle}>
          {route.params.data.title}
        </Text>
        <Text numberOfLines={4} style={styles.txtNote}>
          {route.params.data.content}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BlogScreen;

const styles = ScaledSheet.create({
  container: {
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
  viewItem: {
    paddingHorizontal: '16@ms',
    marginTop: '17@ms',
    minHeight: '270@ms',
    width: '100%',
  },
  imgNews: {
    height: '191@ms',
    width: '100%',
  },
  txtTitle: {
    marginVertical: '15@ms',
    color: '#000000',
    fontSize: '20@ms',
  },
  txtNote: {
    paddingRight: '10@ms',
    color: '#000000',
    fontSize: '12@ms',
  },
});
