// app/(tabs)/inbox.tsx
import COLORS from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Message {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isActive: boolean;
}

const messages: Message[] = [
  {
    id: '1',
    driverId: 'd1',
    driverName: 'John Cooper',
    driverAvatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Yes, let me tell the restaurant.',
    timestamp: 'Just now',
    unread: 0,
    isActive: true,
  },
  {
    id: '2',
    driverId: 'd2',
    driverName: 'Sarah Miller',
    driverAvatar: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'Your order is on the way!',
    timestamp: '2h ago',
    unread: 2,
    isActive: false,
  },
  {
    id: '3',
    driverId: 'd3',
    driverName: 'Michael Chen',
    driverAvatar: 'https://i.pravatar.cc/150?img=33',
    lastMessage: 'Thank you for your order!',
    timestamp: 'Yesterday',
    unread: 0,
    isActive: false,
  },
];

export default function InboxScreen() {
  const router = useRouter();

  const handleMessagePress = (driverId: string) => {
    router.push(`/chat/${driverId}`);
  };

  const renderMessageItem = (message: Message) => (
    <TouchableOpacity
      key={message.id}
      style={styles.messageCard}
      onPress={() => handleMessagePress(message.driverId)}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: message.driverAvatar }}
          style={styles.avatar}
        />
        {message.isActive && <View style={styles.activeIndicator} />}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.driverName}>{message.driverName}</Text>
          <Text style={styles.timestamp}>{message.timestamp}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text
            style={[
              styles.lastMessage,
              message.unread > 0 && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {message.lastMessage}
          </Text>
          {message.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{message.unread}</Text>
            </View>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={COLORS.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => renderMessageItem(message))}
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  messagesList: {
    flex: 1,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: '#fff',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  unreadMessage: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadCount: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
});