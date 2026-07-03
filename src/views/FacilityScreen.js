import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FacilityScreen = ({ route }) => {
  const facilities = route.params?.facilities || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Facilities</Text>
      <FlatList
        data={facilities}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name || item.iaCode || 'Facility'}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No facility data available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f9fc',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
  emptyText: {
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
  },
});

export default FacilityScreen;
