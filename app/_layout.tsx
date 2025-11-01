// app/_layout.tsx
import { store } from '@/redux/store';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="restaurant/[id]" 
          options={{ 
            headerShown: true,
            title: 'Restaurant',
            headerStyle: { backgroundColor: '#00BCD4' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="order/[id]" 
          options={{ 
            headerShown: true,
            title: 'Order Details',
            headerStyle: { backgroundColor: '#00BCD4' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="order/tracking" 
          options={{ 
            headerShown: true,
            title: 'Delivery Tracking',
            headerStyle: { backgroundColor: '#00BCD4' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="chat/[driverId]" 
          options={{ 
            headerShown: true,
            title: 'Chat with Driver',
            headerStyle: { backgroundColor: '#00BCD4' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Select Offer',
          }} 
        />
      </Stack>
    </Provider>
  );
}