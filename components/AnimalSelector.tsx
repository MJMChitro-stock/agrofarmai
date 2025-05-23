import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Animals, AnimalType } from '@/constants/Animals';
import { Colors } from '@/constants/Colors';
import { FontFamily, BorderRadius, Spacing } from '@/constants/Theme';

type AnimalSelectorProps = {
  selectedAnimal: string | null;
  onSelectAnimal: (animalId: string) => void;
};

export default function AnimalSelector({ selectedAnimal, onSelectAnimal }: AnimalSelectorProps) {
  const renderAnimalItem = ({ item }: { item: AnimalType }) => {
    const isSelected = selectedAnimal === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.animalItem,
          isSelected && styles.selectedAnimalItem
        ]}
        onPress={() => onSelectAnimal(item.id)}
      >
        <Text style={styles.animalIcon}>{item.icon}</Text>
        <Text style={[
          styles.animalName,
          isSelected && styles.selectedAnimalName
        ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Animal</Text>
      <FlatList
        data={Animals}
        renderItem={renderAnimalItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.neutral[700],
    marginBottom: Spacing.sm,
  },
  listContainer: {
    paddingVertical: Spacing.sm,
  },
  animalItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginRight: Spacing.md,
    width: 80,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  selectedAnimalItem: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[500],
  },
  animalIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  animalName: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
    textAlign: 'center',
  },
  selectedAnimalName: {
    color: Colors.primary[700],
  },
});