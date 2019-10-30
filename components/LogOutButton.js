import React from 'react';
import {StyleSheet, View, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

const LogOutButton = (props) => {
  return (
    <View style={styles.btn}>
      <Button
       onPress={props.logout}
        icon={
          <Icon
            type='font-awesome'
            name="sign-out"
            size={23}
            color={Colors.primary}
            containerStyle={{ marginRight: 10 }}
          />
        }
        title='LOG OUT'
        />
    </View>
  )
}

var styles = StyleSheet.create({
  btn:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height/8 )
  }
});
export default LogOutButton;
