import React,{useEffect} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Button } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';

const CartDetailsScreen = (props) => {

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const data = [];

  for (const [itemId, item] of Object.entries(cart.items)) {
    data.push({
      id: itemId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      sum: item.sum
    })
  }

  const renderItem = ({ item }) => (
    <View style={styles.padding}>
      <View style={styles.container}>
        <View>
          <Text style={styles.font}>Item {item.title}</Text>
          <Text style={styles.font}>Price ${item.price}</Text>
          <Text style={styles.font}>Quantity {item.quantity}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          dispatch(cartActions.deleteFromCart(item))
        }}>
          <View >
            <Icon
              name='trash'
              type='font-awesome'
              color={Colors.error}
              size={33}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView >
      <View>
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={renderItem}
        />
        {data.length == 0 ?
          <View >
            <Text style={styles.center}>Empty Cart</Text>
          </View>
          : null}
        {data.length > 0 ? <>
          <View style={styles.margin}>
            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.font}>Total quantity:{cart.quantity}</Text>
                <Text style={styles.font}>Total price:{cart.totalAmount.toFixed(2)}</Text>
              </View>
              <View>
                <Button title='Order Now'
                  onPress={() => {
                    props.navigation.navigate('Orders');
                    dispatch(
                      orderActions.addOrder(true));
                  }} />
              </View>
            </View>
          </View>
        </> : null}
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between', flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 18,
  },
  center: {
    alignSelf: 'center',
    fontSize: 18,
    marginTop: (Dimensions.get('window').height / 2.7)
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'space-between', flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 18,
    borderColor: Colors.accent
  },
  font: {
    fontSize: 18
  },
  margin: {
    margin: 10
  },
  padding: {
    padding: 10
  }
});

CartDetailsScreen.navigationOptions = {
  headerTitle: 'Your Cart'
}

export default CartDetailsScreen;
