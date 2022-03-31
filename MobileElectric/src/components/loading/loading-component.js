//import react-native

import React from "react"
import { Text, View, Modal, ActivityIndicator } from "react-native"

//import response-layout

import { ScaledSheet } from "react-native-size-matters"

//import theme

import { THEME } from "../../utils/theme"

const Loading = ({ isLoading, children }) => {
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.body}>
          <ActivityIndicator size="small" color={THEME.firstColor} />
        </View>
      ) : (
        children
      )}
    </View>
  )
}

export default Loading

const styles = ScaledSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
