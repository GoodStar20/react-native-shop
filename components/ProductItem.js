import React from 'react';
import Colors from '../constants/Colors';
import {  View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'

const ProductItem = (props) => {
  return (    
      <ListItem
        title={props.title}
        titleStyle={{ color: Colors.dark, fontWeight: 'bold' }}
        subtitle={<View>
          <Text>Price ${props.price.toString()}</Text>
        </View>}
        leftAvatar={
          {
            source: { uri: props.imageUrl },
            size: 'xlarge',
            rounded: false,
            title: ''
          }
        }
        bottomDivider
        chevron={{ color: Colors.accent }}
      />
  )
}

export default ProductItem;
