import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {height, width} = Dimensions.get('window');

const RightCategory = props => {
  return (
    <ImageBackground
      source={require('../assets/bg_card.png')}
      resizeMode="cover"
      imageStyle={{
        opacity: 0.3,
        borderTopRightRadius: 70,
        borderBottomRightRadius: 70,
      }}
      style={styles.categoriesCard}>
      <View style={styles.categoriesInfo}>
        <Text style={styles.c_title}>{props.data.name}</Text>
        <Text style={styles.c_description} numberOfLines={3}>
          {props.data.description}
        </Text>
        <TouchableOpacity style={styles.c_explore_container}>
          <Text style={styles.c_explore}>Explore</Text>
          <FontAwesome5 name="chevron-right" color="#176789" size={18} />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={styles.categoriesImg}
          source={{
            uri: props.data.img_url,
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default RightCategory;

const styles = StyleSheet.create({
  categoriesCard: {
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopRightRadius: 70,
    borderBottomRightRadius: 70,
    margin: 5,
    elevation: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  categoriesImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  categoriesInfo: {
    marginRight: 10,
    width: width - 180,
  },
  c_title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  c_description: {
    fontSize: 12,
  },
  c_explore_container: {
    textAlign: 'right',
    marginTop: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  c_explore: {
    marginRight: 20,
    color: '#176789',
    fontSize: 18,
  },
});
