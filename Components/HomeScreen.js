import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const categories = [
    { id: 1, title: 'Everyday Value', image: require('../assets/images/EveryDay_value.png') },
    { id: 2, title: 'Ala-Carte & Combos', image: require('../assets/images/Ala_Carte_&_Combos.png') },
    { id: 3, title: 'Promotion', image: require('../assets/images/Promotions.png') },
    { id: 4, title: 'Signature Boxes', image: require('../assets/images/Signature_Boxes.png') },
    { id: 5, title: 'Sharing', image: require('../assets/images/Sharing.png') },
  ];

  const bestSellers = [
    { id: 1, title: 'Krunch Burger', price: 310, image: require('../assets/images/Krunch_Burger.png') },
    { id: 2, title: 'Krunch Combo', price: 590, image: require('../assets/images/Krunch_Combo.png') },
    { id: 3, title: 'Chicken & Chips', price: 620, image: require('../assets/images/Chicken_&_Chips.png') },
    { id: 4, title: 'Hot Wings Bucket', price: 670, image: require('../assets/images/Hot_Wings_Bucket.png') },
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate('Menu', { category: category.title });
  };

  const handleItemPress = (item) => {
    navigation.navigate('Menu', { item: item.title });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../assets/images/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/images/KFC.png')} style={styles.logo} />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.deliveryButton}>
            <Text style={styles.deliveryText}>DELIVERY</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartCount}>0</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Image 
          source={require('../assets/images/Main_Promo.jpg')}
          style={styles.heroBanner}
        />

        <Text style={styles.sectionTitle}>EXPLORE MENU</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => handleCategoryPress(category)}>
              <View style={styles.categoryImageContainer}>
                <Image source={category.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>BEST SELLERS</Text>
        <View style={styles.gridContainer}>
          {bestSellers.map((item) => (
            <TouchableOpacity key={item.id} style={styles.gridItem} onPress={() => handleItemPress(item)}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+ ADD TO BUCKET</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pickupSection}>
          <Text style={styles.pickupTitle}>PICK-UP FROM STORE</Text>
          <Text style={styles.pickupSubtitle}>Beat the queue & place the order online!</Text>
          <View style={styles.stepsContainer}>
            {/* Add step indicators here */}
          </View>
          <TouchableOpacity style={styles.orderNowButton}>
            <Text style={styles.orderNowText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#000',
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  logo: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryButton: {
    backgroundColor: '#E4002B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  deliveryText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#E4002B',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCount: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  heroBanner: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
  categoriesContainer: {
    paddingLeft: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryTitle: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
    width: 80,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  gridItem: {
    width: (width - 48) / 2,
    backgroundColor: '#1C1C1C',
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#E4002B',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#E4002B',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pickupSection: {
    padding: 16,
    backgroundColor: '#1C1C1C',
    margin: 16,
    borderRadius: 8,
  },
  pickupTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickupSubtitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  orderNowButton: {
    backgroundColor: '#E4002B',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  orderNowText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});