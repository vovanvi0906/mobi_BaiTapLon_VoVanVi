// app/(tabs)/index.tsx
import COLORS from '@/constants/colors';
import { categories, restaurants } from '@/constants/dummyData';
import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const selectedAddress = useSelector(
    (state: RootState) => state.user.selectedAddress
  );
  const [searchQuery, setSearchQuery] = useState('');

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color={COLORS.textWhite} />
        <Text style={styles.locationText}>Home</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={COLORS.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1' }}
        style={styles.bannerImage}
      />
      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>Join Party</Text>
        <Text style={styles.bannerPrice}>$1</Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>SEE MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryItem, { backgroundColor: category.color }]}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderVoucherBanner = () => (
    <TouchableOpacity 
      style={styles.voucherBanner}
      onPress={() => router.push('/modal')}
    >
      <Ionicons name="gift" size={24} color={COLORS.primary} />
      <Text style={styles.voucherText}>You have 5 voucher here</Text>
      <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  const renderCollections = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Collections</Text>
      <View style={styles.collectionsGrid}>
        <TouchableOpacity style={styles.collectionCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' }}
            style={styles.collectionImage}
          />
          <Text style={styles.collectionLabel}>FREESHIP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.collectionCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb' }}
            style={styles.collectionImage}
          />
          <Text style={styles.collectionLabel}>DEAL $1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.collectionCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' }}
            style={styles.collectionImage}
          />
          <Text style={styles.collectionLabel}>NEAR YOU</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.collectionCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd' }}
            style={styles.collectionImage}
          />
          <Text style={styles.collectionLabel}>POPULAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRestaurants = (title: string, showBadge?: boolean) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurants.slice(0, 3).map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.restaurantCard}
            onPress={() => router.push(`/restaurant/${restaurant.id}`)}
          >
            <Image
              source={{ uri: restaurant.image }}
              style={styles.restaurantImage}
            />
            {showBadge && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-25%</Text>
              </View>
            )}
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <View style={styles.restaurantMeta}>
                <Text style={styles.restaurantTime}>{restaurant.deliveryTime}</Text>
                <Text style={styles.restaurantDot}>•</Text>
                <Ionicons name="star" size={14} color={COLORS.star} />
                <Text style={styles.restaurantRating}>{restaurant.rating}</Text>
              </View>
              <View style={styles.restaurantTags}>
                {restaurant.tags.slice(0, 2).map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tag,
                      tag === 'Freeship' && { backgroundColor: COLORS.secondaryLight },
                      tag === 'Near you' && { backgroundColor: '#E8F5E9' },
                      tag === 'Deal $1' && { backgroundColor: '#FFF8E1' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        tag === 'Freeship' && { color: COLORS.secondary },
                        tag === 'Near you' && { color: COLORS.success },
                        tag === 'Deal $1' && { color: COLORS.warning },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderBanner()}
        {renderCategories()}
        {renderVoucherBanner()}
        {renderCollections()}
        {renderRestaurants('Recommended for you')}
        {renderRestaurants('Sale up to 50%', true)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingTop: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    color: COLORS.textWhite,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.textWhite,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: 140,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(138, 82, 248, 0.7)',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  bannerPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  bannerButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  bannerButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: 16,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 10,
    marginTop: 4,
    color: COLORS.textPrimary,
  },
  voucherBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  voucherText: {
    flex: 1,
    marginLeft: 12,
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  collectionCard: {
    width: (width - 48) / 2,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  collectionImage: {
    width: '100%',
    height: 100,
  },
  collectionLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: COLORS.textWhite,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  restaurantCard: {
    width: 180,
    marginLeft: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  restaurantDot: {
    marginHorizontal: 4,
    color: COLORS.textLight,
  },
  restaurantRating: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  restaurantTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
});