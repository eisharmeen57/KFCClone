import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { ChevronDown, Minus, Plus, X } from 'lucide-react-native';

export default function BurgerCustomizationModal({ isOpen, onClose, item }) {
  const [quantity, setQuantity] = useState(1);
  const [drinkExpanded, setDrinkExpanded] = useState(false);
  const [addOnsExpanded, setAddOnsExpanded] = useState(false);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Modal visible={isOpen} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color="white" size={24} />
          </TouchableOpacity>

          <View style={styles.section}>
            <View style={styles.optionContainer}>
              <Text style={styles.sectionTitle}>Choose an option</Text>
              <View style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <View style={styles.optionDot} />
                  <Text style={styles.optionText}>{item.name}</Text>
                </View>
                <Text style={styles.optionPrice}>Rs {item.price}</Text>
              </View>
            </View>

            <View style={styles.expandableSection}>
              <TouchableOpacity
                style={styles.expandableButton}
                onPress={() => setDrinkExpanded(!drinkExpanded)}
              >
                <Text style={styles.expandableButtonText}>Drink</Text>
                <View style={styles.expandableButtonRight}>
                  <Text style={styles.optionalText}>(Optional)</Text>
                  <ChevronDown color="white" size={20} style={[styles.chevron, drinkExpanded && styles.chevronRotated]} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.expandableButton}
                onPress={() => setAddOnsExpanded(!addOnsExpanded)}
              >
                <Text style={styles.expandableButtonText}>Add Ons</Text>
                <View style={styles.expandableButtonRight}>
                  <Text style={styles.optionalText}>(Optional)</Text>
                  <ChevronDown color="white" size={20} style={[styles.chevron, addOnsExpanded && styles.chevronRotated]} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.itemDetails}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <Image source={item.image} style={styles.itemImage} />
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                <Minus color="white" size={16} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                <Plus color="white" size={16} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addToBucketButton}>
              <Text style={styles.addToBucketPrice}>Rs {item.price * quantity}</Text>
              <View style={styles.addToBucketRight}>
                <Text style={styles.addToBucketText}>ADD TO BUCKET</Text>
                <ChevronDown color="white" size={20} style={styles.addToBucketChevron} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  optionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    padding: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E4002B',
    marginRight: 12,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  optionPrice: {
    color: 'white',
    fontSize: 16,
  },
  expandableSection: {
    marginTop: 16,
  },
  expandableButton: {
    backgroundColor: '#E4002B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  expandableButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expandableButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionalText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginRight: 8,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '180deg' }],
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    padding: 16,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  addToBucketButton: {
    backgroundColor: '#E4002B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  addToBucketPrice: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToBucketRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToBucketText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  addToBucketChevron: {
    transform: [{ rotate: '-90deg' }],
  },
});