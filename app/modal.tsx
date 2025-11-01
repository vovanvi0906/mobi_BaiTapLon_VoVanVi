// app/modal.tsx
import COLORS from '@/constants/colors';
import { vouchers } from '@/constants/dummyData';
import { applyVoucher } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function VoucherModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const cartSubtotal = useSelector((state: RootState) => state.cart.subtotal);

  const handleSelectVoucher = (voucherId: string) => {
    setSelectedVoucher(voucherId);
  };

  const handleUseVoucher = () => {
    if (selectedVoucher) {
      const voucher = vouchers.find((v) => v.id === selectedVoucher);
      if (voucher) {
        let discountAmount = 0;
        
        if (voucher.type === 'percentage') {
          discountAmount = (cartSubtotal * voucher.value) / 100;
        } else if (voucher.type === 'fixed') {
          discountAmount = voucher.value;
        } else if (voucher.type === 'freeship') {
          discountAmount = voucher.value;
        }

        dispatch(
          applyVoucher({
            voucherId: voucher.id,
            discount: discountAmount,
          })
        );
      }
    }
    router.back();
  };

  const renderVoucherItem = ({ item, index }: { item: any; index: number }) => {
    const isDisabled = item.minOrder && cartSubtotal < item.minOrder;
    const isSelected = selectedVoucher === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.voucherCard,
          isSelected && styles.voucherCardSelected,
          isDisabled && styles.voucherCardDisabled,
        ]}
        onPress={() => !isDisabled && handleSelectVoucher(item.id)}
        disabled={isDisabled}
      >
        <View style={styles.voucherIcon}>
          <Text style={styles.voucherEmoji}>{item.icon}</Text>
        </View>

        <View style={styles.voucherInfo}>
          <Text
            style={[
              styles.voucherDiscount,
              isDisabled && styles.voucherTextDisabled,
            ]}
          >
            {item.discount}
          </Text>
          <Text
            style={[
              styles.voucherDescription,
              isDisabled && styles.voucherTextDisabled,
            ]}
          >
            {item.description}
          </Text>
          {item.minOrder && (
            <Text style={styles.voucherCondition}>
              Min. order: ${item.minOrder}
              {isDisabled && ' (Not eligible)'}
            </Text>
          )}
        </View>

        <View style={styles.radioButton}>
          {isSelected && <View style={styles.radioButtonSelected} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select offer</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Add or search for voucher"
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={vouchers}
        renderItem={renderVoucherItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.voucherList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.useButton,
            !selectedVoucher && styles.useButtonDisabled,
          ]}
          onPress={handleUseVoucher}
          disabled={!selectedVoucher}
        >
          <Text
            style={[
              styles.useButtonText,
              !selectedVoucher && styles.useButtonTextDisabled,
            ]}
          >
            Use now
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  voucherList: {
    padding: 16,
  },
  voucherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  voucherCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  voucherCardDisabled: {
    opacity: 0.5,
  },
  voucherIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  voucherEmoji: {
    fontSize: 28,
  },
  voucherInfo: {
    flex: 1,
  },
  voucherDiscount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  voucherDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  voucherCondition: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  voucherTextDisabled: {
    color: COLORS.textLight,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioButtonSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  useButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  useButtonDisabled: {
    backgroundColor: COLORS.backgroundGray,
  },
  useButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  useButtonTextDisabled: {
    color: COLORS.textLight,
  },
});