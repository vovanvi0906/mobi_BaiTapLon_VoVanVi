// app/(tabs)/explore.tsx
import COLORS from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type TabType = 'ongoing' | 'history';

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'ongoing' && styles.tabActive]}
        onPress={() => setActiveTab('ongoing')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'ongoing' && styles.tabTextActive,
          ]}
        >
          Ongoing
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'history' && styles.tabActive]}
        onPress={() => setActiveTab('history')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'history' && styles.tabTextActive,
          ]}
        >
          History
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderOngoingOrders = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="receipt-outline" size={64} color={COLORS.textLight} />
      </View>
      <Text style={styles.emptyTitle}>No ongoing orders</Text>
      <Text style={styles.emptyText}>
        Your current orders will appear here
      </Text>
      <TouchableOpacity style={styles.browseButton}>
        <Text style={styles.browseButtonText}>Browse restaurants</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrderHistory = () => (
    <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderDate}>Oct 28, 2024</Text>
            <Text style={styles.orderRestaurant}>Hana Chicken</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.orderItemText}>Fried Chicken (L) x1</Text>
          <Text style={styles.orderItemText}>Chicken Salad (M) x1</Text>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: $42</Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Ionicons name="repeat" size={16} color={COLORS.primary} />
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderDate}>Oct 25, 2024</Text>
            <Text style={styles.orderRestaurant}>Bamsu Restaurant</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.orderItemText}>Chicken Salad x2</Text>
          <Text style={styles.orderItemText}>Chicken Sandwich x1</Text>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: $52</Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Ionicons name="repeat" size={16} color={COLORS.primary} />
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderDate}>Oct 20, 2024</Text>
            <Text style={styles.orderRestaurant}>B'Fresh Coffee</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: COLORS.secondaryLight }]}>
            <Text style={[styles.statusText, { color: COLORS.secondary }]}>
              Cancelled
            </Text>
          </View>
        </View>

        <View style={styles.orderItems}>
          <Text style={styles.orderItemText}>Latte x2</Text>
          <Text style={styles.orderItemText}>Croissant x1</Text>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>Total: $18</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My order</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {renderTabs()}

      {activeTab === 'ongoing' ? renderOngoingOrders() : renderOrderHistory()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.backgroundGray,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyList: {
    flex: 1,
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  orderRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.success,
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItemText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  reorderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
});