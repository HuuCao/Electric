import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import {ScaledSheet} from 'react-native-size-matters';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, color: '#000000'}}>|||</Text>
      <TouchableOpacity
        style={styles.viewContainer}
        onPress={e => {
          console.log('abc');
        }}>
        <Image
          style={{marginRight: 20}}
          source={require('../../assets/icons/search.png')}
        />
        <Avatar.Icon size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
