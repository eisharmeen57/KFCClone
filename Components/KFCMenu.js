import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BurgerCustomizationModal from './BurgerCustomizationModal';

export default function KFCMenu() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      name: "Krunch Burger",
      description: "Krunch fillet, spicy mayo, lettuce, sandwiched between a sesame seed bun",
      price: 310,
      image: require('../assets/images/Krunch_Burger.png'),
      category: "EVERYDAY VALUE"
    },
    {
      id: 2,
      name: "Zinger atha",
      description: "Tender boneless strips, sliced onions, tangy imli chutney, mint sauce in paratha",
      price: 390,
      image: require('../assets/images/Zingeratha.png'),
      category: "EVERYDAY VALUE"
    },
    {
      id: 3,
      name: "Rice & Spice",
      description: "Spiced and buttery rice with 6 pcs of Hot Shots topped with special sauce",
      price: 390,
      image: require('../assets/images/Riceandspice.png'),
      category: "EVERYDAY VALUE"
    },
    {
      id: 4,
      name: "Zinger Burger",
      description: "Our hero- crispy Zinger fillet, signature mayo and lettuce",
      price: 690,
      image: require('../assets/images/Zinger_Burger.png'),
      category: "ALA-CARTE-&-COMBOS"
    },
    {
      id: 5,
      name: "Zinger Stacker",
      description: "Double krunch fillet, jalapenos, spicy mayo, lettuce and cheese",
      price: 690,
      image: require('../assets/images/Zinger_Stacker.png'),
      category: "ALA-CARTE-&-COMBOS"
    },
    {
      id: 6,
      name: "Kentucky Burger",
      description: "OG Zinger fillet layered with beef pepperoni, crispy fried onions",
      price: 690,
      image: require('../assets/images/Kentucky_Burger.png'),
      category: "ALA-CARTE-&-COMBOS"
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, quantity: 1 }]);
  };

  const openCustomizationModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeCustomizationModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const navigateToBucket = () => {
    navigation.navigate('Bucket', { cart });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KFC Menu</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {["EVERYDAY VALUE", "ALA-CARTE-&-COMBOS"].map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => openCustomizationModal(item)}>
                  <Image source={item.image} style={styles.itemImage} />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemPrice}>Rs {item.price}</Text>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.addButtonText}>ADD TO BUCKET</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Text style={[
                      styles.favoriteIcon,
                      favorites.includes(item.id) && styles.favoritedIcon
                    ]}>♥</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.cartSummary}>
          <Text style={styles.cartText}>
            {cart.length} item{cart.length > 1 ? 's' : ''} | Rs {cart.reduce((acc, item) => acc + item.price, 0)}
          </Text>
          <TouchableOpacity style={styles.viewBucketButton} onPress={navigateToBucket}>
            <Text style={styles.viewBucketText}>View Bucket</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedItem && (
        <BurgerCustomizationModal
          isOpen={isModalOpen}
          onClose={closeCustomizationModal}
          item={selectedItem}
          addToCart={addToCart}
        />
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    color: '#E4002B',
    fontSize: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#999',
    fontSize: 12,
    marginBottom: 8,
  },
  itemPrice: {
    color: '#E4002B',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#E4002B',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  favoriteIcon: {
    fontSize: 24,
    color: '#FFF',
  },
  favoritedIcon: {
    color: '#E4002B',
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cartText: {
    color: '#FFF',
    fontSize: 14,
  },
  viewBucketButton: {
    backgroundColor: '#E4002B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  viewBucketText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});