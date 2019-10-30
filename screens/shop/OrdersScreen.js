import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { Button } from 'react-native-elements'
import { Icon, Header } from 'react-native-elements'
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Moment from 'moment';

const OrdersScreen = props => {
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false)

  let cartData = [];
  for (const [itemId, item] of Object.entries(cartState.items)) {
    cartData.push({
      id: itemId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      sum: item.sum
    });
  }
  useSelector(state => state.order).orderAdded ? cartData : cartData = []

  const renderItem = ({ item }) => {
    return (
      <>
        {item.title ?
          <View style={styles.upperContainer}>
            <View>
              <Text style={styles.font}>Item: {item.title}</Text>
              <Text style={styles.font}>Price: {item.price}</Text>
              <Text style={styles.font}>Quantity: {item.quantity}</Text>
            </View>
          </View> : null}
      </>
    )
  }

  const orderHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        orderActions.placeOrder(cartData,
          cartState.totalAmount)
      );
      setIsOrdered(true);
    } catch (error) {
      props.navigation.navigate('Auth');
      flashMessage('Please Login First', Colors.textLight, Colors.primaryDark)
      setIsLoading(false);
      return;
    }
    dispatch(cartActions.clearCart());
    dispatch(orderActions.addOrder(false))
    setIsLoading(false);

     setTimeout(() => (
      props.navigation.navigate('Main')
     ), 1000);

  };

  return (
    <ScrollView >
      <>
        {!isOrdered && cartData.length == 0 ? null :
          <View style={styles.list}>
            <FlatList
              keyExtractor={item => item.id}
              data={cartData}
              renderItem={renderItem}
            />
          </View>
        }
        <View >
          {cartData.length == 0 ? null :
            <View style={styles.bottomContainer}>
              <View style={{}}>
                <Text style={styles.font}>Date: {Moment(new Date()).format('YYYY-MM-DD')}</Text>
                <Text style={styles.font}>Total {cartState.totalAmount.toFixed(2)}</Text>
              </View>
              <View style={{}}>
                {isLoading ? <ActivityIndicator /> :
                  <Button title='Place Order' onPress={orderHandler} />}
              </View>
            </View>}
        </View>

        {!isOrdered && cartData.length == 0 ?
          <View style={styles.center}>
            <Text style={styles.message}>No orders yet</Text>
          </View> : null}
        {!isOrdered || cartData.length > 0 ? null : 
          <View style={styles.center}>
            <Text style={styles.message}>Thank you for your order!</Text>
          </View>
        }
      </>
    </ScrollView>
  );
};

OrdersScreen.navigationOptions = navData => {
  title = {
    text:
      'Your Order',
    style: {
      color: Colors.textLight,
      fontSize: 20
    }
  }
  return {
    header: (
      <Header backgroundColor={Colors.primary}
        leftComponent={
          <Icon
            name='home'
            color={Colors.textLight}
            size={23}
            onPress={() => {
              navData.navigation.navigate('Main');
            }}
          />}
        centerComponent={title}
      />)
  }
};

var styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    padding: 5,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }, container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  font: {
    fontSize: 18
  },
  message: {
    alignSelf: 'center',
    fontSize: 18
  },
  center: {
    marginTop: (Dimensions.get('window').height / 2.7)
  },
  upperContainer: {
    margin: 5,
    padding: 10, shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 18,
    borderColor: Colors.accent
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'space-between', flexDirection: 'row',
    margin: 10,
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
  }
});

export default OrdersScreen;
