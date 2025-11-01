// app/rating.tsx
import COLORS from '@/constants/colors';
import { driverInfo } from '@/constants/dummyData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RatingScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Service',
    'Supportive',
    'Friendly',
    'Delivery',
  ]);
  const [feedback, setFeedback] = useState('');

  const tags = [
    'Service',
    'Supportive',
    'Friendly',
    'Delivery',
    'Contactless',
    'Fast',
    'Professional',
    'Polite',
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    // Submit rating and feedback
    console.log({
      rating,
      tags: selectedTags,
      feedback,
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#fff" />
          </View>
        </View>

        <Text style={styles.title}>Rate {driverInfo.name}</Text>

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={star <= rating ? COLORS.star : COLORS.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>Leave your feedback here</Text>

        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagSelected,
              ]}
              onPress={() => toggleTag(tag)}
            >
              {selectedTags.includes(tag) && (
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={COLORS.primary}
                  style={{ marginRight: 4 }}
                />
              )}
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.feedbackTitle}>Care to share more?</Text>

        <TextInput
          style={styles.feedbackInput}
          placeholder="Leave feedback about driver..."
          placeholderTextColor={COLORS.textLight}
          multiline
          numberOfLines={5}
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  starButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.backgroundGray,
    marginHorizontal: 4,
    marginBottom: 8,
  },
  tagSelected: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  tagText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  tagTextSelected: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  feedbackInput: {
    width: '100%',
    minHeight: 120,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  submitButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});