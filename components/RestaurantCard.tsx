// components/RestaurantCard.tsx
import COLORS from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance?: string;
  tags?: string[];
  categories?: string[];
  horizontal?: boolean;
}

export default function RestaurantCard({
  id,
  name,
  image,
  rating,
  reviews,
  deliveryTime,
  distance,
  tags = [],
  categories = [],
  horizontal = false,
}: RestaurantCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/restaurant/${id}`);
  };

  if (horizontal) {
    return (
      <TouchableOpacity style={styles.horizontalContainer} onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.horizontalImage} />
        
        <View style={styles.horizontalContent}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>

          {categories.length > 0 && (
            <Text style={styles.categories} numberOfLines={1}>
              {categories.join(', ')}
            </Text>
          )}

          <View style={styles.metaRow}>
            <Text style={styles.deliveryTime}>{deliveryTime}</Text>
            <Text style={styles.dot}>•</Text>
            <Ionicons name="star" size={14} color={COLORS.star} />
            <Text style={styles.rating}>{rating}</Text>
          </View>

          {tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.map((tag, index) => (
                <View
                  key={index}
                  style={[
                    styles.tag,
                    tag === 'Freeship' && styles.tagFreeship,
                    tag === 'Near you' && styles.tagNearYou,
                    tag === 'Deal $1' && styles.tagDeal,
                  ]}
                >
                  <Text
                    style={[
                      styles.tagText,
                      tag === 'Freeship' && styles.tagTextFreeship,
                      tag === 'Near you' && styles.tagTextNearYou,
                      tag === 'Deal $1' && styles.tagTextDeal,
                    ]}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.verticalContainer} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.verticalImage} />

      <View style={styles.verticalContent}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.deliveryTime}>{deliveryTime}</Text>
          <Text style={styles.dot}>•</Text>
          <Ionicons name="star" size={14} color={COLORS.star} />
          <Text style={styles.rating}>{rating}</Text>
        </View>

        {tags.length > 0 && (
          <View style={styles.tagsRow}>
            {tags.slice(0, 2).map((tag, index) => (
              <View
                key={index}
                style={[
                  styles.tag,
                  tag === 'Freeship' && styles.tagFreeship,
                  tag === 'Near you' && styles.tagNearYou,
                  tag === 'Deal $1' && styles.tagDeal,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    tag === 'Freeship' && styles.tagTextFreeship,
                    tag === 'Near you' && styles.tagTextNearYou,
                    tag === 'Deal $1' && styles.tagTextDeal,
                  ]}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Vertical Card Styles
  verticalContainer: {
    width: 180,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verticalImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  verticalContent: {
    padding: 12,
  },

  // Horizontal Card Styles
  horizontalContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  horizontalImage: {
    width: 120,
    height: 120,
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },

  // Common Styles
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  categories: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  deliveryTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  dot: {
    marginHorizontal: 4,
    color: COLORS.textLight,
    fontSize: 12,
  },
  rating: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  tagsRow: {
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
  tagFreeship: {
    backgroundColor: COLORS.secondaryLight,
  },
  tagNearYou: {
    backgroundColor: '#E8F5E9',
  },
  tagDeal: {
    backgroundColor: '#FFF8E1',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  tagTextFreeship: {
    color: COLORS.secondary,
  },
  tagTextNearYou: {
    color: COLORS.success,
  },
  tagTextDeal: {
    color: COLORS.warning,
  },
});