import React from 'react'
import {  View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import MainScreen from '../screens/shop/MainScreen';
import AuthScreen from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import CartScreen from '../components/CartScreen';
import CartDetailsScreen from '../screens/shop/CartDetailsScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: 'white'
};

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons
        name='ios-cart'
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavOptions
});
const ProductsNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Cart: CartScreen,
    CardDetails: CartDetailsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name='ios-cart'
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const User = createStackNavigator({
  Auth: AuthScreen
});

export default createAppContainer(
  createMaterialBottomTabNavigator(
    {
      Home: {
        screen: ShopNavigator,
        navigationOptions: {
          tabBarLabel: <Text >Home</Text>,
          tabBarOnPress: ({ navigation }) => {
            navigation.closeDrawer();
            navigation.navigate('Main');
          },
          tabBarIcon: () => (
            <View>
              <Icon
                size={25} name={'home'} />
            </View>),
          activeColor: Colors.primary,
          barStyle: { backgroundColor: Colors.accent },
        }
      },
     
      User: {
        screen: User,
        navigationOptions: {
          tabBarLabel: <Text >User</Text>,
          tabBarOnPress: ({ navigation }) => {   
            navigation.navigate('Auth');
          },
          tabBarIcon:<View>
              <Icon size={25} name={'person'} />
            </View>,
          activeColor: Colors.primary,
          barStyle: { backgroundColor: Colors.accent },
        }
      }
    }
  )
);

