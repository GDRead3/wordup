// app/_layout.tsx
import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#ffffff', //colour of icon you are currently on
          tabBarInactiveTintColor: '#3A86ff', // colour of unselected icons
          tabBarStyle: { backgroundColor: '#F49F0A' } //navigation bar colour
        }}
      >
        <Tabs.Screen
        name="index"
        options={{
          href: null, // This prevents the tab from showing
          }}
        />
        <Tabs.Screen
          name="home" // home screen
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="gameSelect" // Game selection screen
          options={{
            title: 'Games',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="gamepad-variant" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="scores" //High scores
          options={{
            title: 'Scores',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="trophy" color={color} size={26} />
            ),
          }}
        />
          <Tabs.Screen
          name="settings" //Settings page
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <AntDesign name="setting" color={color} size={26} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}