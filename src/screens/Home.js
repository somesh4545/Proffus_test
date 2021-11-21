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

import firestore from '@react-native-firebase/firestore';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

// importing components
import Product from '../components/Product';
import RightCategory from '../components/RightCategory';
import LeftCategory from '../components/LeftCategory';
import Carousel from '../components/Carousel';

const {height, width} = Dimensions.get('window');
const sliderWidth = width - 40;
const itemWidth = width - 40;

const Home = ({navigation}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [mostPurchasedData, setMostPurchasedData] = useState([]);
  const [mediaData, setMediaData] = useState([]);
  // const [featuredLoading, setFeaturedLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: 'Proffus',
      titleShown: false,
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity
          style={{paddingRight: 20}}
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="align-right" color="#000" size={20} />
        </TouchableOpacity>
      ),
      headerShown: true,
    });
    getCategoryData();
    getFeaturedProducts();
    getMostPurchasedProducts();
    getMediaAssociates();
  }, []);

  // function to get categories
  const getCategoryData = async () => {
    setCategoryData([]);
    const categories = await firestore()
      .collection('categories')
      .limit(4)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setCategoryData(prev => [...prev, doc.data()]);
        });
      });
  };

  // function to get featured product based on boolean
  const getFeaturedProducts = async () => {
    setFeaturedData([]);
    const categories = await firestore()
      .collection('products')
      .where('featured', '==', true)
      .limit(4)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setFeaturedData(prev => [...prev, doc.data()]);
        });
      });
    // setFeaturedLoading(false);
  };

  // function to get most purchased products
  const getMostPurchasedProducts = async () => {
    setMostPurchasedData([]);
    const categories = await firestore()
      .collection('products')
      .where('sales', '>=', '500')
      .limit(4)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setMostPurchasedData(prev => [...prev, doc.data()]);
        });
      });
  };

  // function to get the media associates
  const getMediaAssociates = async () => {
    setMediaData([]);
    const mediaAssociates = await firestore()
      .collection('mediaAssociates')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setMediaData(prev => [...prev, doc.data()]);
        });
      });

    // setMediaData(mediaAssociates.data());
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.greetings}>Hello there,</Text>
          <Text style={styles.subTitle}>how can we serve you today...</Text>
        </View>
        {/* carousel container */}
        <Carousel />

        {/* Quick action container */}
        <View style={styles.quickActionContainer}>
          <TouchableOpacity activeOpacity={0.5}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <FontAwesome5 name="list-ol" color="#fff" size={20} />
              <Text style={styles.actionCardTitle}>View orders</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <MaterialCommunityIcons
                name="map-marker-path"
                color="#fff"
                size={20}
              />
              <Text style={styles.actionCardTitle}>Track orders</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <MaterialCommunityIcons
                name="brightness-percent"
                color="#fff"
                size={20}
              />
              <Text style={styles.actionCardTitle}>Best offers</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <FontAwesome5 name="comments" color="#fff" size={20} />
              <Text style={styles.actionCardTitle}>Chat</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <FontAwesome5 name="user-plus" color="#fff" size={20} />
              <Text style={styles.actionCardTitle}>Refer patient</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <LinearGradient
              colors={['#347279', '#5da597']}
              style={styles.actionCard}>
              <FontAwesome5 name="credit-card" color="#fff" size={20} />
              <Text style={styles.actionCardTitle}>Payment</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* categories container */}
        <View style={styles.categoriesContainer}>
          <View style={styles.categoriesHead}>
            <Text style={styles.title}>Categories</Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesBody}>
            {categoryData.map((item, index) => {
              if ((index + 1) % 2 === 0) {
                return <RightCategory data={item} />;
              } else {
                return <LeftCategory data={item} />;
              }
            })}
          </View>
        </View>

        {/* featured container */}
        <View style={styles.featuredContainer}>
          <Text style={styles.title}>Featured Products</Text>
          <View style={styles.productBox}>
            <FlatList
              data={featuredData}
              renderItem={({index, item}) => {
                return <Product key={index} data={item} />;
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        {/* most purchased container */}
        <View style={styles.mostPurchasedContainer}>
          <Text style={styles.title}>Most Purchased Products</Text>
          <View style={styles.productBox}>
            <FlatList
              data={mostPurchasedData}
              renderItem={({index, item}) => {
                return <Product key={index} data={item} />;
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        {/* media section */}
        <View style={styles.mediaContainer}>
          <Text style={styles.title}>Our Media Associates</Text>
          <View style={styles.mediaBox}>
            {mediaData.map(item => {
              return (
                <View key={item.id} style={styles.mediaCard}>
                  <Image
                    source={{
                      uri: item.img_url,
                    }}
                    style={styles.mediaImg}
                  />
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <Text>© ND Care Niogoram Pvt. Ltd. All rights reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleContainer: {
    marginTop: 5,
  },
  greetings: {
    color: '#176789',
    fontSize: 25,
  },
  subTitle: {
    color: '#176789',
    fontSize: 15,
    fontWeight: '600',
  },

  quickActionContainer: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'center',
    justifyContent: 'space-between',
  },
  actionCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    margin: 5,
    width: (width - 40) / 3 - 15,
    backgroundColor: 'green',
    elevation: 10,
    borderRadius: 10,
  },
  actionCardTitle: {
    marginTop: 10,
    color: '#fff',
  },
  categoriesContainer: {
    marginTop: 30,
  },
  categoriesHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '700',
  },
  viewAll: {
    color: '#176789',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  categoriesBody: {
    marginTop: 15,
  },

  featuredContainer: {
    marginTop: 30,
  },
  productBox: {
    marginTop: 20,
  },
  mostPurchasedContainer: {
    marginTop: 30,
  },
  mediaContainer: {
    marginTop: 30,
  },
  mediaBox: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mediaCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    margin: 5,
    marginBottom: 10,
    elevation: 5,
    width: (width - 40) / 3 - 15,
    borderRadius: 10,
    backgroundColor: '#e0ecde',
  },
  mediaImg: {
    width: (width - 40) / 3 - 30,
    height: 60,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});
