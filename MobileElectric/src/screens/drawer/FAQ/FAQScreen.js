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
import {ExpandableListView} from 'react-native-expandable-listview';
import dataFAQ from '../../../core/dataFake/dataFAQ';

export default function FAQScreen({navigation}) {
  const handleItemClick = function ({index}) {
    console.log(index);
  };

  const handleInnerItemClick = function ({innerIndex, item, itemIndex}) {
    console.log(innerIndex);
  };

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
        <Text style={styles.txtBack}>{'FAQ'}</Text>
      </TouchableOpacity>
      <View style={styles.hr} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.txtFAQ}>{'FAQ'}</Text>
        <ExpandableListView
          data={dataFAQ}
          renderInnerItemSeparator={true}
          renderItemSeparator={true}
          itemContainerStyle={styles.itemFAQ}
          itemLabelStyle={styles.txtItemFAQ}
          customChevron={require('../../../assets/icons/arrowRight.png')}
          innerItemContainerStyle={styles.viewInFAQ}
          itemImageIndicatorStyle={styles.iconItem}
          onInnerItemClick={handleInnerItemClick}
          onItemClick={handleItemClick}
        />
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
});
