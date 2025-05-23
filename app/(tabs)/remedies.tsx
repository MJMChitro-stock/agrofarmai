import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  SafeAreaView
} from 'react-native';
import { Search, Filter, Heart } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles, FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';
import AnimalSelector from '@/components/AnimalSelector';
import RemedyCard from '@/components/RemedyCard';
import { NaturalRemedies, CommonHealthIssues } from '@/constants/Animals';

export default function RemediesScreen() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'natural' | 'favorites'>('all');

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId === selectedAnimal ? null : animalId);
  };

  // Filter remedies based on selected animal, search query, and active filter
  const filteredRemedies = NaturalRemedies.filter(remedy => {
    // Filter by animal if one is selected
    if (selectedAnimal) {
      const relatedHealthIssues = CommonHealthIssues.filter(issue => 
        issue.animals.includes(selectedAnimal) && remedy.healthIssueIds.includes(issue.id)
      );
      if (relatedHealthIssues.length === 0) return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const healthIssueNames = remedy.healthIssueIds.map(id => {
        const issue = CommonHealthIssues.find(i => i.id === id);
        return issue ? issue.name.toLowerCase() : '';
      });
      
      const nameMatch = remedy.name.toLowerCase().includes(query);
      const healthIssueMatch = healthIssueNames.some(name => name.includes(query));
      const ingredientMatch = remedy.ingredients.some(ing => ing.toLowerCase().includes(query));
      
      if (!nameMatch && !healthIssueMatch && !ingredientMatch) return false;
    }

    // Filter by type
    if (activeFilter === 'natural') {
      return true; // All remedies in our data are natural for this example
    } else if (activeFilter === 'favorites') {
      return false; // No favorites implemented in this example
    }

    return true;
  });

  const renderFilterButton = (filter: 'all' | 'natural' | 'favorites', label: string, icon?: React.ReactNode) => (
    <TouchableOpacity
      style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
      onPress={() => setActiveFilter(filter)}
    >
      {icon}
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Natural Remedies</Text>
        <Text style={styles.headerSubtitle}>
          Natural solutions for common livestock health issues
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={Colors.neutral[400]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search remedies, issues, or ingredients..."
            placeholderTextColor={Colors.neutral[400]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <AnimalSelector 
        selectedAnimal={selectedAnimal} 
        onSelectAnimal={handleAnimalSelect} 
      />

      <View style={styles.filtersContainer}>
        {renderFilterButton('all', 'All Remedies')}
        {renderFilterButton('natural', 'Natural Only', 
          <Filter size={16} color={activeFilter === 'natural' ? Colors.primary[600] : Colors.neutral[500]} style={styles.filterIcon} />
        )}
        {renderFilterButton('favorites', 'Favorites', 
          <Heart size={16} color={activeFilter === 'favorites' ? Colors.primary[600] : Colors.neutral[500]} style={styles.filterIcon} />
        )}
      </View>

      <FlatList
        data={filteredRemedies}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          // Find the health issue for this remedy
          const healthIssue = CommonHealthIssues.find(issue => 
            item.healthIssueIds.includes(issue.id)
          );

          return (
            <RemedyCard
              title={item.name}
              healthIssue={healthIssue ? healthIssue.name : 'Unknown Issue'}
              ingredients={item.ingredients}
              isNatural={true}
              onPress={() => {}}
            />
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No remedies found matching your criteria</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.neutral[600],
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    ...Shadow.small,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.neutral[800],
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  activeFilterButton: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[200],
  },
  filterIcon: {
    marginRight: Spacing.xs,
  },
  filterButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
  },
  activeFilterButtonText: {
    color: Colors.primary[700],
  },
  listContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: 80,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});