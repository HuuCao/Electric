//import react-native

import React from 'react';
import {Text, View, Modal, ActivityIndicator} from 'react-native';

//import response-layout

import {ScaledSheet} from 'react-native-size-matters';

//import theme

import {THEME} from '../../utils/theme';

const Loading = ({isLoading}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={isLoading}>
        <View style={styles.body}>
          <ActivityIndicator size="small" color={THEME.secondColor} />
        </View>
      </Modal>
    </View>
  );
};

export default Loading;

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
