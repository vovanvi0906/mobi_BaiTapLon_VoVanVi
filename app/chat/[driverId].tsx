// app/chat/[driverId].tsx
import COLORS from '@/constants/colors';
import { driverInfo } from '@/constants/dummyData';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  image?: string;
  sender: 'user' | 'driver';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

export default function ChatScreen() {
  const { driverId } = useLocalSearchParams();
  const flatListRef = useRef<FlatList>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi, the restaurant is quite busy now so the delivery may be late 15 mins. Please wait for me.',
      sender: 'driver',
      timestamp: '12:03',
      status: 'read',
    },
    {
      id: '2',
      text: 'Sure! Thank you',
      sender: 'user',
      timestamp: '12:04',
      status: 'read',
    },
    {
      id: '3',
      text: 'Could you please ask the restaurant to give me cutlery? I just need these items.',
      sender: 'user',
      timestamp: '12:04',
      status: 'read',
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1606787620819-8bdf0c44c293',
      sender: 'user',
      timestamp: '12:04',
      status: 'read',
    },
    {
      id: '5',
      text: 'Yes, let me tell the restaurant.',
      sender: 'driver',
      timestamp: 'Just now',
      status: 'read',
    },
  ]);

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Auto scroll to bottom when new message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
        status: 'sent',
      };

      setMessages([...messages, newMessage]);
      setInputText('');

      // Simulate driver response
      setTimeout(() => {
        const driverResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Okay, I will do that!',
          sender: 'driver',
          timestamp: 'Just now',
          status: 'read',
        };
        setMessages((prev) => [...prev, driverResponse]);
      }, 2000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.driverMessageContainer,
        ]}
      >
        {!isUser && (
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>
              {driverInfo.name.charAt(0)}
            </Text>
          </View>
        )}

        <View style={{ flex: 1 }}>
          {item.image ? (
            <View
              style={[
                styles.imageMessageContainer,
                isUser ? styles.userImageMessage : styles.driverImageMessage,
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            </View>
          ) : (
            <View
              style={[
                styles.messageBubble,
                isUser ? styles.userMessage : styles.driverMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  isUser ? styles.userMessageText : styles.driverMessageText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          )}
          
          <View style={[styles.messageFooter, isUser && styles.userMessageFooter]}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {isUser && item.status && (
              <Ionicons
                name={
                  item.status === 'sent'
                    ? 'checkmark'
                    : item.status === 'delivered'
                    ? 'checkmark-done'
                    : 'checkmark-done'
                }
                size={16}
                color={item.status === 'read' ? COLORS.primary : COLORS.textLight}
                style={{ marginLeft: 4 }}
              />
            )}
          </View>
        </View>

        {isUser && (
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
            style={styles.userAvatar}
          />
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.driverInfo}>
        <View style={styles.headerAvatar}>
          <Text style={styles.headerAvatarText}>
            {driverInfo.name.charAt(0)}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerName}>{driverInfo.name}</Text>
          <Text style={styles.headerStatus}>Active now</Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="videocam" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="call" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {renderHeader()}
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="add-circle" size={28} color={COLORS.textLight} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor={COLORS.textLight}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />

        <TouchableOpacity style={styles.emojiButton}>
          <Ionicons name="happy-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sendButton,
            inputText.trim() && styles.sendButtonActive,
          ]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() ? '#fff' : COLORS.textLight}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    backgroundColor: '#fff',
  },
  driverInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  headerStatus: {
    fontSize: 12,
    color: COLORS.success,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  driverMessageContainer: {
    alignSelf: 'flex-start',
  },
  driverAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  driverAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    maxWidth: '100%',
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  driverMessage: {
    backgroundColor: COLORS.backgroundGray,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#fff',
  },
  driverMessageText: {
    color: COLORS.textPrimary,
  },
  imageMessageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  userImageMessage: {
    borderBottomRightRadius: 4,
  },
  driverImageMessage: {
    borderBottomLeftRadius: 4,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  userMessageFooter: {
    justifyContent: 'flex-end',
  },
  timestamp: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: '#fff',
  },
  attachButton: {
    padding: 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  emojiButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: COLORS.backgroundGray,
  },
  sendButtonActive: {
    backgroundColor: COLORS.primary,
  },
});