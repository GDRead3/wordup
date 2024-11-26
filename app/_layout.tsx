// app/_layout.tsx
import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#95a5a6',
          tabBarStyle: { backgroundColor: '#2980b9' }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="hangman"
          options={{
            title: 'Hangman',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="human-handsdown" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="scores"
          options={{
            title: 'Scores',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="trophy" color={color} size={26} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}