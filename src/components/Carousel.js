import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const {height, width} = Dimensions.get('window');
const sliderWidth = width - 40;
const itemWidth = width - 40;

const CarouselData = [
  {
    id: 1,
    img_url:
      'https://i.pinimg.com/originals/b7/3a/f4/b73af48b22fc1c924b8476c27bba7921.jpg',
  },
  {
    id: 2,
    img_url: 'https://m.media-amazon.com/images/I/81ifRLQEuyL._SL1500_.jpg',
  },
  {
    id: 3,
    img_url:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOWt683zBV3ItHF-ymOtiKVfcM_OnZ0dtj6Q&usqp=CAU',
  },
];

const CarouselContainer = () => {
  const [activeSlide, setactiveSlide] = useState(0);
  return (
    <View style={styles.carousel}>
      <Carousel
        ref={c => {
          arousel = c;
        }}
        data={CarouselData}
        loop={true}
        renderItem={({item, index}) => {
          return (
            <View style={styles.carouselCard}>
              <Image
                source={{
                  uri: item.img_url,
                }}
                style={styles.carouselCardImage}
              />
            </View>
          );
        }}
        onSnapToItem={index => setactiveSlide(index)}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
      <Pagination
        dotsLength={CarouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: '#fff',
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: '#000',
        }}
        dotStyle={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: '#176789',
        }}
        inactiveDotStyle={{
          borderWidth: 1,
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: '#fff',
          borderColor: '#176789',
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    </View>
  );
};

export default CarouselContainer;

const styles = StyleSheet.create({
  carousel: {
    marginTop: 30,
    // borderRadius: 10,
    backgroundColor: '#fff',
  },
  carouselCard: {
    backgroundColor: '#fff',
    width: width - 40,
    borderRadius: 10,
    height: 250,
    elevation: 2,
    borderRadius: 10,
  },
  carouselCardImage: {
    width: width - 40,
    borderRadius: 10,
    height: 250,
    resizeMode: 'cover',
  },
});
