import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, MapPin, Trash2, Plus, Minus, ChevronRight } from 'lucide-react-native';

export default function BucketScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [alternatePhone, setAlternatePhone] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, increment) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const addItem = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.16);
  const total = subtotal + gst;

  const recommendedItems = [
    {
      id: 'hot-wings',
      name: 'Hot Wings Bucket',
      image: require('../assets/images/Hot_Wings_Bucket.png'),
      price: 670
    },
    {
      id: 'zinger',
      name: 'Zinger Burger',
      image: require('../assets/images/Zinger_Burger.png'),
      price: 550
    },
    {
      id: 'fries',
      name: 'Fries',
      image: require('../assets/images/Fries.png'),
      price: 270
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Text style={styles.pickupText}>Pickup From</Text>
            <View style={styles.locationRow}>
              <MapPin color="#666" size={16} />
              <Text style={styles.locationText}>Johar town</Text>
            </View>
          </View>
        </View>
        <Image
          source={require('../assets/images/KFC.png')}
          style={styles.logo}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Bucket</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your bucket is empty. Add some items to get started!</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.itemInfo}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>Rs {item.price}</Text>
                </View>
                <Image source={item.image} style={styles.itemImage} />
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => removeItem(item.id)}>
                  <Trash2 color="#666" size={20} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, true)}>
                  <Plus color="#666" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.instructionsInput}>
          <Text style={styles.instructionsText}>
            Add Cooking/Delivery Instructions (Optional)
          </Text>
        </TouchableOpacity>

        <View style={styles.phoneInputContainer}>
          <TextInput
            style={styles.phoneInput}
            placeholder="Alternate Phone Number (Optional)"
            placeholderTextColor="#666"
            value={alternatePhone}
            onChangeText={setAlternatePhone}
          />
        </View>

        <TouchableOpacity 
          style={styles.exploreMenu}
          onPress={() => navigation.navigate('Menu')}
        >
          <View>
            <Text style={styles.exploreMenuTitle}>Explore Menu</Text>
            <Text style={styles.exploreMenuSubtitle}>Add more items in your bucket</Text>
          </View>
          <ChevronRight color="#666" size={24} />
        </TouchableOpacity>

        {cartItems.length > 0 && (
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sub Total</Text>
              <Text style={styles.summaryValue}>Rs {subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>GST (16 %)</Text>
              <Text style={styles.summaryValue}>Rs {gst}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>Rs {total}</Text>
            </View>
          </View>
        )}

        <Text style={styles.recommendedTitle}>You may also like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedItems}>
          {recommendedItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.recommendedItem} onPress={() => addItem(item)}>
              <Image source={item.image} style={styles.recommendedImage} />
              <Text style={styles.recommendedName}>{item.name}</Text>
              <Text style={styles.recommendedPrice}>Rs {item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.checkoutBar}>
          <View style={styles.checkoutInfo}>
            <Image source={cartItems[0].image} style={styles.checkoutImage} />
            <Text style={styles.checkoutItems}>{cartItems.length} Items</Text>
            <Text style={styles.checkoutPrice}>Rs {total}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
            <ChevronRight color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  locationContainer: {
    marginLeft: 8,
  },
  pickupText: {
    color: '#666',
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  emptyCartText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  cartItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  itemPrice: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 12,
    gap: 16,
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
  },
  instructionsInput: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  instructionsText: {
    color: '#666',
    fontSize: 14,
  },
  phoneInputContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 16,
  },
  phoneInput: {
    color: '#fff',
    padding: 16,
  },
  exploreMenu: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exploreMenuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exploreMenuSubtitle: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  orderSummary: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#666',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8,
    marginTop: 8,
  },
  recommendedTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recommendedItems: {
    marginBottom: 100,
  },
  recommendedItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 160,
  },
  recommendedImage: {
    width: 136,
    height: 136,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendedName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recommendedPrice: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E4002B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  checkoutInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  checkoutItems: {
    color: '#fff',
    fontSize: 14,
  },
  checkoutPrice: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});