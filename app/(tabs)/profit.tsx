import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import { TrendingUp, Wheat, Shapes, Goal, BarChart3 } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles, FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';
import AnimalSelector from '@/components/AnimalSelector';
import ProfitTipCard from '@/components/ProfitTipCard';

export default function ProfitScreen() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId === selectedAnimal ? null : animalId);
  };

  const categories = [
    { id: 'all', name: 'All Tips' },
    { id: 'feeding', name: 'Feeding', icon: <Wheat size={16} color={activeCategory === 'feeding' ? Colors.primary[600] : Colors.neutral[500]} /> },
    { id: 'housing', name: 'Housing', icon: <Shapes size={16} color={activeCategory === 'housing' ? Colors.primary[600] : Colors.neutral[500]} /> },
    { id: 'breeding', name: 'Breeding', icon: <Goal size={16} color={activeCategory === 'breeding' ? Colors.primary[600] : Colors.neutral[500]} /> },
  ];

  const profitTips = [
    {
      id: '1',
      title: 'Optimize Feeding Schedule',
      description: 'Adjusting your feeding times can reduce waste and improve feed conversion by up to 15%. Feed during cooler parts of the day to increase appetite.',
      impactLevel: 'high' as const,
      category: 'feeding',
      animals: ['cow', 'goat', 'sheep', 'chicken', 'duck', 'pig']
    },
    {
      id: '2',
      title: 'Rotational Grazing System',
      description: 'Implementing a rotational grazing system can increase pasture productivity by 30-70% and reduce parasite loads.',
      impactLevel: 'high' as const,
      category: 'feeding',
      animals: ['cow', 'goat', 'sheep', 'horse']
    },
    {
      id: '3',
      title: 'Housing Ventilation Upgrade',
      description: 'Proper ventilation can reduce respiratory diseases by up to 50% and improve weight gain by 8-12% in confined livestock.',
      impactLevel: 'medium' as const,
      category: 'housing',
      animals: ['cow', 'goat', 'sheep', 'chicken', 'duck', 'pig', 'rabbit']
    },
    {
      id: '4',
      title: 'Breeding Season Planning',
      description: 'Strategic breeding timing can increase birth rates and optimize market prices for your livestock.',
      impactLevel: 'medium' as const,
      category: 'breeding',
      animals: ['cow', 'goat', 'sheep', 'pig', 'rabbit']
    },
    {
      id: '5',
      title: 'Group Housing for Young Stock',
      description: 'Group housing for calves/kids can reduce labor costs by 40% while maintaining proper socialization.',
      impactLevel: 'low' as const,
      category: 'housing',
      animals: ['cow', 'goat', 'sheep']
    },
  ];

  // Filter tips based on selected animal and category
  const filteredTips = profitTips.filter(tip => {
    const animalMatch = !selectedAnimal || tip.animals.includes(selectedAnimal);
    const categoryMatch = activeCategory === 'all' || tip.category === activeCategory;
    return animalMatch && categoryMatch;
  });

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profit Maximizer</Text>
          <Text style={styles.headerSubtitle}>
            Smart strategies to increase your farm's profitability
          </Text>
        </View>

        <View style={styles.statsOverview}>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <TrendingUp size={24} color={Colors.success[500]} />
            </View>
            <View>
              <Text style={styles.statValue}>+23%</Text>
              <Text style={styles.statLabel}>Potential Profit Increase</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewAnalyticsButton}>
            <BarChart3 size={16} color={Colors.primary[600]} />
            <Text style={styles.viewAnalyticsText}>View Analytics</Text>
          </TouchableOpacity>
        </View>

        <AnimalSelector 
          selectedAnimal={selectedAnimal} 
          onSelectAnimal={handleAnimalSelect} 
        />

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              {category.icon}
              <Text
                style={[
                  styles.categoryButtonText,
                  activeCategory === category.id && styles.activeCategoryButtonText
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.tipsContainer}>
          {filteredTips.length > 0 ? (
            filteredTips.map(tip => (
              <ProfitTipCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                impactLevel={tip.impactLevel}
                category={tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}
                onPress={() => {}}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No profit tips available for the selected criteria</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
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
  statsOverview: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    ...Shadow.small,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.success[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.success[600],
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[600],
  },
  viewAnalyticsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
  },
  viewAnalyticsText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.primary[600],
    marginLeft: Spacing.xs,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  categoryButton: {
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
  activeCategoryButton: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[200],
  },
  categoryButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
    marginLeft: category => category.icon ? Spacing.xs : 0,
  },
  activeCategoryButtonText: {
    color: Colors.primary[700],
  },
  tipsContainer: {
    paddingHorizontal: Spacing.md,
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
  bottomPadding: {
    height: 80,
  },
});