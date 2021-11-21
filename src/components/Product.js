import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Share,
  ToastAndroid,
  FlatList,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const Product = props => {
  const share = async () => {
    try {
      const result = await Share.share({
        message: 'Try out amazing app',
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWPLBeSS-JCga11dLqUQOjYTczozlgdYs5dJRv-6TnpkL2HnTARMekXL26YwEmx7QaaCQ&usqp=CAU',
      }}
      resizeMode="cover"
      imageStyle={{
        opacity: 0.3,
        borderRadius: 10,
      }}
      style={styles.product_card}>
      <View style={styles.product_left}>
        <Image
          style={styles.product_img}
          source={{
            uri: props.data.img_url,
          }}
        />
        <Text style={styles.product_qty}>{props.data.qty} capsules</Text>
      </View>
      <View style={styles.product_right}>
        <View style={styles.product_info}>
          <Text style={styles.product_title} numberOfLines={1}>
            {props.data.name}
          </Text>
          <Text style={styles.product_description} numberOfLines={3}>
            {props.data.description}
          </Text>
          <View style={styles.product_price}>
            <FontAwesome5
              style={styles.ruppe_icon}
              name="rupee-sign"
              size={14}
            />
            <Text style={styles.price}>{props.data.price}</Text>
          </View>
        </View>
        <View style={styles.product_quick_action}>
          <TouchableOpacity>
            <Text style={styles.addToCart}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={share}>
            <FontAwesome5
              style={styles.sharer_icon}
              name="share-alt"
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Product;

const styles = StyleSheet.create({
  product_card: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    marginHorizontal: 5,
    flexDirection: 'row',
    marginBottom: 20,
  },
  product_left: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#000',
    marginRight: 10,
  },
  product_img: {
    width: 60,
    height: 100,
    resizeMode: 'cover',
  },
  product_qty: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  product_right: {
    display: 'flex',
    justifyContent: 'space-between',
    width: width - 180,
  },
  product_info: {
    borderBottomWidth: 1,

    borderBottomColor: '#000',
  },
  product_title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  product_description: {},
  product_price: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  product_quick_action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCart: {
    color: '#176789',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  sharer_icon: {
    color: '#176789',
  },
});
