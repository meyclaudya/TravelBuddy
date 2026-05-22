import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import destinations from '../data/destinations';

const ACCENT = '#00b894';
const BG = '#f7f9fc';
const TEXT_PRIMARY = '#1a1a2e';
const TEXT_SECONDARY = '#6b7280';

const CATEGORIES = ['Semua', 'Alam', 'Budaya', 'Petualangan'];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchQuery =
        query.trim() === '' ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase());
      const matchCategory =
        activeCategory === 'Semua' || d.category === activeCategory;
      return matchQuery && matchCategory;
    });
  }, [query, activeCategory]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('SearchDetail', { destination: item })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.rowImage} />
      <View style={styles.rowInfo}>
        <Text style={styles.rowName}>{item.name}</Text>
        <View style={styles.rowMeta}>
          <Ionicons name="location-outline" size={12} color={TEXT_SECONDARY} />
          <Text style={styles.rowLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.rowPrice}>{item.price}</Text>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={11} color="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={TEXT_SECONDARY} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cari Destinasi</Text>
      </View>

      {/* Search input */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color={TEXT_SECONDARY} />
        <TextInput
          style={styles.input}
          placeholder="Cari nama atau lokasi..."
          placeholderTextColor={TEXT_SECONDARY}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={18} color={TEXT_SECONDARY} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips */}
      <View style={styles.chips}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, activeCategory === cat && styles.chipActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Results count */}
      <Text style={styles.resultsCount}>{filtered.length} destinasi ditemukan</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>Tidak ada hasil</Text>
            <Text style={styles.emptySubtext}>Coba kata kunci lain</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: TEXT_PRIMARY, letterSpacing: -0.5 },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  input: { flex: 1, fontSize: 14, color: TEXT_PRIMARY },
  chips: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 14,
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  chipActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  chipText: { fontSize: 13, color: TEXT_SECONDARY, fontWeight: '500' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  resultsCount: {
    paddingHorizontal: 20,
    marginTop: 14,
    marginBottom: 6,
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  list: { paddingHorizontal: 20, paddingBottom: 20, gap: 12 },
  row: {
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
  rowImage: { width: 72, height: 72, borderRadius: 10 },
  rowInfo: { flex: 1, gap: 4 },
  rowName: { fontSize: 15, fontWeight: '700', color: TEXT_PRIMARY },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  rowLocation: { fontSize: 12, color: TEXT_SECONDARY, flex: 1 },
  rowBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowPrice: { fontSize: 13, fontWeight: '600', color: ACCENT },
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
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyText: { fontSize: 16, fontWeight: '600', color: TEXT_SECONDARY },
  emptySubtext: { fontSize: 13, color: '#9ca3af' },
});