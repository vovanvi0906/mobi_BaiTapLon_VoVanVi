// app/order/[id].tsx
import COLORS from '@/constants/colors';
import { clearCart } from '@/redux/cartSlice';
import { createOrder } from '@/redux/orderSlice';
import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function OrderReviewScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const cart = useSelector((state: RootState) => state.cart);
  const selectedAddress = useSelector(
    (state: RootState) => state.user.selectedAddress
  );

  const total = cart.subtotal + cart.deliveryFee - cart.discount;

  const handlePlaceOrder = () => {
    // Create order
    const newOrder = {
      items: cart.items,
      restaurantId: cart.restaurantId!,
      restaurantName: cart.restaurantName!,
      deliveryAddress: selectedAddress?.address || '201 Katlian No.21 Street',
      deliveryLocation: {
        lat: selectedAddress?.lat || 10.7769,
        lng: selectedAddress?.lng || 106.7009,
      },
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      discount: cart.discount,
      total,
      status: 'looking_for_driver' as const,
      estimatedDeliveryTime: '20 mins',
    };

    dispatch(createOrder(newOrder));
    dispatch(clearCart());
    
    // Navigate to tracking
    router.push('/order/tracking');
  };

  const renderDeliveryAddress = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Delivered to</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change address</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addressRow}>
        <Ionicons name="location" size={20} color={COLORS.primary} />
        <Text style={styles.addressText}>
          {selectedAddress?.address || '201 Katlian No.21 Street'}
        </Text>
      </View>

      <View style={styles.addressRow}>
        <Ionicons name="time" size={20} color={COLORS.primary} />
        <Text style={styles.addressText}>20 mins</Text>
      </View>
    </View>
  );

  const renderOrderItems = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Order details</Text>
        <TouchableOpacity>
          <Text style={styles.addMoreText}>Add more</Text>
        </TouchableOpacity>
      </View>

      {cart.items.map((item, index) => (
        <View key={index} style={styles.orderItem}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            {item.size && (
              <Text style={styles.itemDetails}>Size: {item.size}</Text>
            )}
            {item.toppings && item.toppings.length > 0 && (
              <Text style={styles.itemDetails}>
                Topping: {item.toppings.join(', ')}
              </Text>
            )}
            {item.spiciness && (
              <Text style={styles.itemDetails}>Spiciness: {item.spiciness}</Text>
            )}
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>

          <View style={styles.quantityControls}>
            <TouchableOpacity style={styles.quantityButton}>
              <Ionicons name="remove" size={16} color={COLORS.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, styles.quantityButtonActive]}
            >
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAlsoOrdered = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Also ordered</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.alsoOrderedCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
            }}
            style={styles.alsoOrderedImage}
          />
          <Text style={styles.alsoOrderedName}>Saute Chicken Rice</Text>
          <Text style={styles.alsoOrderedPrice}>$15</Text>
        </View>
        <View style={styles.alsoOrderedCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398',
            }}
            style={styles.alsoOrderedImage}
          />
          <Text style={styles.alsoOrderedName}>Chicken Salad</Text>
          <Text style={styles.alsoOrderedPrice}>$12</Text>
        </View>
      </ScrollView>
    </View>
  );

  const renderPaymentDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment details</Text>

      <TouchableOpacity style={styles.paymentRow}>
        <Ionicons name="wallet" size={20} color={COLORS.primary} />
        <Text style={styles.paymentText}>E-wallet</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
      </TouchableOpacity>

      {cart.selectedVoucher && (
        <TouchableOpacity style={styles.paymentRow}>
          <Ionicons name="ticket" size={20} color={COLORS.primary} />
          <Text style={styles.paymentText}>- 30% for bill over $50</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
      )}

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Subtotal</Text>
        <Text style={styles.priceValue}>${cart.subtotal.toFixed(2)}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Delivery fee</Text>
        <Text style={styles.priceValue}>${cart.deliveryFee.toFixed(2)}</Text>
      </View>

      {cart.discount > 0 && (
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Promotion</Text>
          <Text style={[styles.priceValue, { color: COLORS.success }]}>
            -${cart.discount.toFixed(2)}
          </Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Payment method</Text>
        <Text style={styles.priceValue}>E-wallet</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderDeliveryAddress()}
        {renderOrderItems()}
        {renderAlsoOrdered()}
        {renderPaymentDetails()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.orderButtonText}>Order now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.backgroundGray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  changeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  addMoreText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonActive: {
    backgroundColor: COLORS.primary,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  alsoOrderedCard: {
    width: 100,
    marginRight: 12,
  },
  alsoOrderedImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  alsoOrderedName: {
    fontSize: 12,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  alsoOrderedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  orderButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});