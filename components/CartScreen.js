import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Divider, Image, Button, Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { Overlay } from 'react-native-elements';
import * as cartActions from '../store/actions/cart';

const CartScreen = (props) => {
  const item = props.navigation.getParam('item');
  const [visible, setIsVisible] = useState(false)
  const dispatch = useDispatch();

  const productAdded = () => {
    setIsVisible(true)
    // setTimeout(() => (
    props.navigation.goBack()
    // ), 1500);
    dispatch(cartActions.addToCart(item));
  }

  return (
    <ScrollView >
      <Overlay isVisible={visible}
        height={50}
        borderRadius={10}>
        <Text style={styles.overLay}>Product Added</Text>
      </Overlay>

      <View style={styles.containerTitle}>
        <View >
          <Text style={styles.title} >{item.title}</Text>
        </View>
        <View style={styles.img}>
          <Image source={{ uri: item.imageUrl }}
            PlaceholderContent={<ActivityIndicator />}/>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description} >{item.description}</Text>
        </View>
        <View >
          <Divider style={styles.divider} />
          <Text style={styles.price} >Price ${item.price}</Text>
        </View>
        <View style={styles.addToCart}>
          <Button title='Add to Card'
            type="outline"
            onPress={productAdded}
            icon={<Icon
              name="cart-arrow-down"
              type='font-awesome'
              size={23}
              iconStyle={{ margin: 10 }}
              color={Colors.primary}
            />}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  overLay: { alignSelf: 'center', fontSize: 20 },
  containerTitle: { maxHeight: '100%', margin: 8, },
  title: { fontSize: 23, alignSelf: 'center' },
  img: { maxHeight: 500 },
  descriptionContainer: { marginTop: -80, },
  description: { fontSize: 16 },
  divider: { marginTop: 5, marginBottom: 5 },
  price: { fontSize: 16 },
  addToCart: { marginTop: 10 }
});

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Add Product',
  }
};
export default CartScreen;
