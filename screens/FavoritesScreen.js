import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const ACCENT = '#00b894';
const BG = '#f7f9fc';
const TEXT_PRIMARY = '#1a1a2e';
const TEXT_SECONDARY = '#6b7280';

export default function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite } = useFavorites();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('FavoriteDetail', { destination: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.cardMeta}>
          <Ionicons name="location-outline" size={12} color={TEXT_SECONDARY} />
          <Text style={styles.cardLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Text style={styles.cardPrice}>{item.price}</Text>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={11} color="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => removeFavorite(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="heart-dislike-outline" size={18} color="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Favorit</Text>
          <Text style={styles.headerSub}>{favorites.length} destinasi tersimpan</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{favorites.length}</Text>
        </View>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={64} color="#d1d5db" />
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptySubtext}>
              Tekan ikon ❤️ di detail destinasi untuk menyimpannya di sini
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#1a1a2e', letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: TEXT_SECONDARY, marginTop: 2 },
  countBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#fce8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: { fontSize: 18, fontWeight: '800', color: '#e74c3c' },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardImage: { width: 72, height: 72, borderRadius: 10 },
  cardInfo: { flex: 1, gap: 4 },
  cardName: { fontSize: 15, fontWeight: '700', color: '#1a1a2e' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardLocation: { fontSize: 12, color: TEXT_SECONDARY, flex: 1 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice: { fontSize: 13, fontWeight: '600', color: ACCENT },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#fef9ec',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  ratingText: { fontSize: 11, fontWeight: '600', color: '#92400e' },
  removeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#fce8e8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 40, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: TEXT_SECONDARY },
  emptySubtext: { fontSize: 13, color: '#9ca3af', textAlign: 'center', lineHeight: 20 },
});