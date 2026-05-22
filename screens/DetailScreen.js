import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const ACCENT = '#00b894';
const TEXT_PRIMARY = '#1a1a2e';
const TEXT_SECONDARY = '#6b7280';

export default function DetailScreen({ route, navigation }) {
  const { destination } = route.params;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(destination.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(destination.id);
    } else {
      addFavorite(destination);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Hero Image */}
      <View style={styles.heroContainer}>
        <Image source={{ uri: destination.image }} style={styles.heroImage} />
        <View style={styles.heroOverlay} />

        {/* Back & Favorite buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconBtn, favorited && styles.iconBtnActive]}
            onPress={toggleFavorite}
          >
            <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Hero text */}
        <View style={styles.heroContent}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{destination.category}</Text>
          </View>
          <Text style={styles.heroTitle}>{destination.name}</Text>
          <View style={styles.heroMeta}>
            <Ionicons name="location" size={14} color="rgba(255,255,255,0.9)" />
            <Text style={styles.heroLocation}>{destination.location}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="star" size={20} color="#fbbf24" />
            <Text style={styles.statValue}>{destination.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Ionicons name="wallet-outline" size={20} color={ACCENT} />
            <Text style={styles.statValue} numberOfLines={1}>{destination.price}</Text>
            <Text style={styles.statLabel}>Estimasi</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Ionicons name="map-outline" size={20} color="#8b5cf6" />
            <Text style={styles.statValue}>{destination.category}</Text>
            <Text style={styles.statLabel}>Tipe</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Destinasi</Text>
          <Text style={styles.description}>{destination.description}</Text>
        </View>

        {/* Info rows */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi</Text>
          <InfoRow icon="location-outline" label="Lokasi" value={destination.location} />
          <InfoRow icon="cash-outline" label="Harga Mulai" value={destination.price} />
          <InfoRow icon="star-outline" label="Rating" value={`${destination.rating} / 5.0`} />
          <InfoRow icon="pricetag-outline" label="Kategori" value={destination.category} />
        </View>

        {/* Favorite button */}
        <TouchableOpacity
          style={[styles.favButton, favorited && styles.favButtonActive]}
          onPress={toggleFavorite}
          activeOpacity={0.85}
        >
          <Ionicons
            name={favorited ? 'heart-dislike-outline' : 'heart-outline'}
            size={20}
            color="#fff"
          />
          <Text style={styles.favButtonText}>
            {favorited ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconWrap}>
      <Ionicons name={icon} size={16} color={ACCENT} />
    </View>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  heroContainer: {
    height: 320,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  headerButtons: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 56,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnActive: {
    backgroundColor: '#e74c3c',
  },
  heroContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: ACCENT,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroLocation: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
    paddingVertical: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: TEXT_SECONDARY,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#e8f8f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    flex: 1,
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    maxWidth: '55%',
    textAlign: 'right',
  },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: ACCENT,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 28,
    elevation: 3,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  favButtonActive: {
    backgroundColor: '#e74c3c',
    shadowColor: '#e74c3c',
  },
  favButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});