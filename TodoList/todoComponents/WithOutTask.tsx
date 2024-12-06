import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WithOutTask = () => {
  return (
    <View style={styles.mainView}>
      <Image
        source={require('../todoAssets/todo-list.png')}
        style={styles.todoImage}
      />
      <Text style={styles.mainText} >Start Adding Your Task</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    height: hp('100%'),
    width: wp('90%'),
  },
  todoImage: {
    width: wp('70%'),
    height: hp('40%'),
  },
  mainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('4%'),
  },
});

export default WithOutTask;