// app/restaurant/[id].tsx
import COLORS from '@/constants/colors';
import { menuItems, restaurants } from '@/constants/dummyData';
import { addToCart } from '@/redux/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const restaurant = restaurants.find((r) => r.id === id);
  const menu = menuItems.filter((item) => item.restaurantId === id);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Corn', 'Cheese Cheddar']);
  const [selectedSpiciness, setSelectedSpiciness] = useState<string>('Hot');
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  const handleItemPress = (item: any) => {
    setSelectedItem(item);
    setQuantity(1);
    setNote('');
    if (item.sizes) setSelectedSize(item.sizes[2].name);
    if (item.toppings) setSelectedToppings([]);
    if (item.spiciness) setSelectedSpiciness(item.spiciness[1].name);
    setModalVisible(true);
  };

  const calculateItemPrice = () => {
    if (!selectedItem) return 0;
    let price = selectedItem.price;

    // Add size price
    if (selectedItem.sizes) {
      const size = selectedItem.sizes.find((s: any) => s.name === selectedSize);
      if (size) price += size.price;
    }

    // Add toppings price
    if (selectedItem.toppings) {
      selectedToppings.forEach((toppingName) => {
        const topping = selectedItem.toppings.find((t: any) => t.name === toppingName);
        if (topping) price += topping.price;
      });
    }

    return price;
  };

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const itemPrice = calculateItemPrice();
    
    dispatch(
      addToCart({
        id: selectedItem.id,
        name: selectedItem.name,
        image: selectedItem.image,
        price: itemPrice,
        quantity,
        size: selectedSize,
        toppings: selectedToppings,
        spiciness: selectedSpiciness,
        note,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      })
    );

    setModalVisible(false);
    // Show success message or navigate to cart
  };

  const toggleTopping = (toppingName: string) => {
    if (selectedToppings.includes(toppingName)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== toppingName));
    } else {
      setSelectedToppings([...selectedToppings, toppingName]);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
      <View style={styles.headerOverlay}>
        <View style={styles.headerBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Deal $1</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: COLORS.success }]}>
            <Text style={styles.badgeText}>Near you</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderRestaurantInfo = () => (
    <View style={styles.infoContainer}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={16} color={COLORS.primary} />
        <Text style={styles.infoText}>6am - 9pm</Text>
        
        <Ionicons name="location-outline" size={16} color={COLORS.primary} style={{ marginLeft: 16 }} />
        <Text style={styles.infoText}>{restaurant.distance}</Text>
        
        <Ionicons name="cash-outline" size={16} color={COLORS.primary} style={{ marginLeft: 16 }} />
        <Text style={styles.infoText}>{restaurant.priceRange}</Text>
      </View>

      <TouchableOpacity style={styles.ratingRow}>
        <Ionicons name="star" size={18} color={COLORS.star} />
        <Text style={styles.ratingText}>{restaurant.rating} ({restaurant.reviews} reviews)</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.voucherRow}>
        <Ionicons name="ticket-outline" size={18} color={COLORS.primary} />
        <Text style={styles.voucherText}>2 discount voucher for restaurant</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.deliveryRow}>
        <Ionicons name="bicycle-outline" size={18} color={COLORS.primary} />
        <Text style={styles.deliveryText}>Delivery on {restaurant.deliveryTime}</Text>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
      </TouchableOpacity>
    </View>
  );

  const renderMenu = () => (
    <View style={styles.menuContainer}>
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>For you</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuGrid}>
        {menu.slice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuCard}
            onPress={() => handleItemPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.menuMeta}>
                <Ionicons name="star" size={12} color={COLORS.star} />
                <Text style={styles.menuRating}>{item.rating}</Text>
                <Text style={styles.menuReviews}>({item.reviews})</Text>
              </View>
              <Text style={styles.menuPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menu.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuRow}
            onPress={() => handleItemPress(item)}
          >
            <Image source={{ uri: item.image }} style={styles.menuRowImage} />
            <View style={styles.menuRowInfo}>
              <Text style={styles.menuRowName}>{item.name}</Text>
              <Text style={styles.menuRowDesc} numberOfLines={1}>{item.description}</Text>
              <Text style={styles.menuRowPrice}>${item.price}</Text>
            </View>
            <View style={styles.menuRowRating}>
              <Ionicons name="star" size={14} color={COLORS.star} />
              <Text style={styles.menuRowRatingText}>{item.rating} ({item.reviews})</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderItemModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setModalVisible(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="close-circle" size={32} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedItem && (
            <>
              <Image source={{ uri: selectedItem.image }} style={styles.modalImage} />
              
              <View style={styles.modalContent}>
                <View style={styles.modalTitleRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                    <Text style={styles.modalDesc}>{selectedItem.description}</Text>
                  </View>
                  <View style={styles.modalPriceContainer}>
                    <Text style={styles.modalPrice}>${selectedItem.price}</Text>
                    <Text style={styles.modalPriceLabel}>Base price</Text>
                  </View>
                </View>

                {selectedItem.sizes && (
                  <View style={styles.optionSection}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>Size</Text>
                      <View style={styles.requiredBadge}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                      </View>
                    </View>
                    {selectedItem.sizes.map((size: any) => (
                      <TouchableOpacity
                        key={size.id}
                        style={styles.optionRow}
                        onPress={() => setSelectedSize(size.name)}
                      >
                        <View style={styles.radioButton}>
                          {selectedSize === size.name && (
                            <View style={styles.radioButtonSelected} />
                          )}
                        </View>
                        <Text style={styles.optionText}>{size.name}</Text>
                        {size.price > 0 && (
                          <Text style={styles.optionPrice}>+${size.price}</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {selectedItem.toppings && (
                  <View style={styles.optionSection}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>Topping</Text>
                      <Text style={styles.optionalText}>(Optional)</Text>
                    </View>
                    {selectedItem.toppings.map((topping: any) => (
                      <TouchableOpacity
                        key={topping.id}
                        style={styles.optionRow}
                        onPress={() => toggleTopping(topping.name)}
                      >
                        <View style={styles.checkbox}>
                          {selectedToppings.includes(topping.name) && (
                            <Ionicons name="checkmark" size={16} color={COLORS.primary} />
                          )}
                        </View>
                        <Text style={styles.optionText}>{topping.name}</Text>
                        <Text style={styles.optionPrice}>+${topping.price}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {selectedItem.spiciness && (
                  <View style={styles.optionSection}>
                    <View style={styles.optionHeader}>
                      <Text style={styles.optionTitle}>Spiciness</Text>
                      <View style={styles.requiredBadge}>
                        <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                      </View>
                    </View>
                    {selectedItem.spiciness.map((spicy: any) => (
                      <TouchableOpacity
                        key={spicy.id}
                        style={styles.optionRow}
                        onPress={() => setSelectedSpiciness(spicy.name)}
                      >
                        <View style={styles.radioButton}>
                          {selectedSpiciness === spicy.name && (
                            <View style={styles.radioButtonSelected} />
                          )}
                        </View>
                        <Text style={styles.optionText}>{spicy.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <View style={styles.noteSection}>
                  <Text style={styles.noteTitle}>Note for restaurant</Text>
                  <TextInput
                    style={styles.noteInput}
                    placeholder="Special note"
                    placeholderTextColor={COLORS.textLight}
                    multiline
                    numberOfLines={3}
                    value={note}
                    onChangeText={setNote}
                  />
                </View>

                <View style={styles.quantitySection}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Ionicons name="remove" size={24} color={COLORS.textPrimary} />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={[styles.quantityButton, { backgroundColor: COLORS.primary }]}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.addToCartText}>
                    Add to cart (${(calculateItemPrice() * quantity).toFixed(2)})
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderRestaurantInfo()}
        {renderMenu()}
      </ScrollView>
      {renderItemModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 16,
  },
  headerBadges: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: COLORS.warning,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.backgroundGray,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
  },
  ratingText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  voucherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  voucherText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  deliveryText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  menuContainer: {
    padding: 16,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  menuCard: {
    width: '48%',
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  menuInfo: {
    padding: 8,
  },
  menuName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  menuMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuRating: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  menuReviews: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  menuSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  menuRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuRowImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  menuRowInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  menuRowName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  menuRowDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  menuRowPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  menuRowRating: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRowRatingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalImage: {
    width: '100%',
    height: 250,
  },
  modalContent: {
    padding: 16,
  },
  modalTitleRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  modalPriceContainer: {
    alignItems: 'flex-end',
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  modalPriceLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  optionSection: {
    marginBottom: 24,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 8,
  },
  requiredBadge: {
    marginLeft: 4,
  },
  optionalText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  optionPrice: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  noteSection: {
    marginBottom: 24,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 24,
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});