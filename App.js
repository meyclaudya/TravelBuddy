import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';

const ACCENT = '#00b894';
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

// ─── Home Stack ───────────────────────────────────────────────
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

// ─── Search Stack (Nested Navigation Bonus) ──────────────────
function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="SearchDetail" component={DetailScreen} />
    </SearchStack.Navigator>
  );
}

// ─── Favorites Stack ─────────────────────────────────────────
function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen name="FavoritesMain" component={FavoritesScreen} />
      <FavoritesStack.Screen name="FavoriteDetail" component={DetailScreen} />
    </FavoritesStack.Navigator>
  );
}

// ─── Favorites Badge ─────────────────────────────────────────
function FavTabIcon({ color, focused }) {
  const { favorites } = useFavorites();
  return (
    <View>
      <Ionicons
        name={focused ? 'heart' : 'heart-outline'}
        size={24}
        color={color}
      />
      {favorites.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {favorites.length > 9 ? '9+' : favorites.length}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Main Tab Navigator ──────────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ACCENT,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: 'Cari',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStackNavigator}
        options={{
          tabBarLabel: 'Favorit',
          tabBarIcon: ({ color, focused }) => (
            <FavTabIcon color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Root App ────────────────────────────────────────────────
export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#e74c3c',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});