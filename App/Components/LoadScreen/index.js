import React from "react";

import { View, Modal, Dimensions, ActivityIndicator } from "react-native";


const LoadScreen = () => (
  <Modal transparent animated animationType="fade">
    <View
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
        backgroundColor:"#FFFFFF66",
        justifyContent:"center",
      }}
    ><ActivityIndicator size="large" color="#49989F" style={{alignSelf:"center"}}/></View>
  </Modal>
);

export default LoadScreen;
