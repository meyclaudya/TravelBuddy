import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import destinations from '../data/destinations';
import { useFavorites } from '../context/FavoritesContext';

const ACCENT = '#00b894';
const BG = '#f7f9fc';
const CARD_BG = '#ffffff';
const TEXT_PRIMARY = '#1a1a2e';
const TEXT_SECONDARY = '#6b7280';

const CategoryBadge = ({ label }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{label}</Text>
  </View>
);

const DestinationCard = ({ item, onPress }) => {
  const { isFavorite } = useFavorites();
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardOverlay} />
      <CategoryBadge label={item.category} />
      {isFavorite(item.id) && (
        <View style={styles.favIcon}>
          <Ionicons name="heart" size={14} color="#fff" />
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.cardRow}>
          <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.85)" />
          <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const handlePress = (destination) => {
    navigation.navigate('Detail', { destination });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Selamat Datang 👋</Text>
          <Text style={styles.headerTitle}>Destinations</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="compass" size={26} color={ACCENT} />
        </View>
      </View>

      {/* Stats bar */}
      <View style={styles.statsBar}>
        <Ionicons name="map-outline" size={14} color={ACCENT} />
        <Text style={styles.statsText}>{destinations.length} destinasi tersedia</Text>
      </View>

      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinationCard item={item} onPress={handlePress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerSub: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    letterSpacing: -0.5,
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#e8f8f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  statsText: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    height: 210,
    backgroundColor: CARD_BG,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    backgroundImage: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.65) 100%)',
  },
  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: ACCENT,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  favIcon: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#e74c3c',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cardName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  cardLocation: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    flex: 1,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});