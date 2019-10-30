import React, { useEffect } from 'react';
import Colors from '../../constants/Colors';
import Products from '../../data/dummy-data';
import { Text, View, FlatList, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { Icon, Header } from 'react-native-elements'
import ProductItem from '../../components/ProductItem';
import { useSelector } from 'react-redux';
import loggedIn from '../autoLogin';

const MainScreen = (props) => {
  // try auto login if token still valid
  loggedIn();

  const items = useSelector(state => state.cart);
  useEffect(() => {
    props.navigation.setParams({ count: items.quantity });
  }, [items])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Cart', { item: item })
        }} >
          <ProductItem
            title={item.title}
            imageUrl={item.imageUrl}
            price={item.price}
            ownerId={item.ownerId}
            description={item.description}
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={Products}
      renderItem={renderItem}
    />
  )
}

MainScreen.navigationOptions = navData => {
  title = {
    text:
      'All Products',
    style: {
      color: Colors.textLight,
      fontSize: 20
    }
  }
  let itemCount = navData.navigation.getParam('count')
  return {
    header: (
      <Header backgroundColor={Colors.primary}
        leftComponent={
          <Icon
            name='menu'
            color={Colors.textLight}
            size={23}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />}
        centerComponent={title}
        rightComponent={
          <TouchableOpacity onPress={() => {
            navData.navigation.navigate('CardDetails');
          }}>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Text
                  style={styles.number}>
                  {itemCount > 0 ? itemCount : null}
                </Text>
              </View>
              <View>
                <Icon
                  name='shopping-cart'
                  type='font-awesome'
                  color={Colors.textLight}
                  size={23}
                />
              </View>
            </View>
          </TouchableOpacity>
        }
      />)
  };
}

const styles = StyleSheet.create({
  number: {
    fontSize: 20,
    color: 'white',
    marginLeft: 15,
    fontWeight: 'bold'
  },
  item: {
    borderColor: 'white',
    borderWidth: 1
  }
});

export default MainScreen;
