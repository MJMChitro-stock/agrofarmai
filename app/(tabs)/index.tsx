import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Camera, Leaf, TrendingUp, Search, Bell } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles, FontFamily, Spacing, BorderRadius } from '@/constants/Theme';
import AnimalSelector from '@/components/AnimalSelector';
import DiagnosisCard from '@/components/DiagnosisCard';
import ProfitTipCard from '@/components/ProfitTipCard';
import FeatureCard from '@/components/FeatureCard';

export default function HomeScreen() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId === selectedAnimal ? null : animalId);
  };

  const navigateToDiagnose = () => {
    router.push('/diagnose');
  };

  const navigateToRemedies = () => {
    router.push('/remedies');
  };

  const navigateToProfit = () => {
    router.push('/profit');
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.farmerName}>John's Farm</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={24} color={Colors.neutral[700]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Bell size={24} color={Colors.neutral[700]} />
            </TouchableOpacity>
          </View>
        </View>

        <AnimalSelector 
          selectedAnimal={selectedAnimal} 
          onSelectAnimal={handleAnimalSelect} 
        />

        <View style={styles.featuresContainer}>
          <FeatureCard
            title="AI Diagnosis"
            description="Upload photos or describe symptoms for instant health analysis"
            icon={<Camera size={24} color={Colors.primary[700]} />}
            backgroundColor={Colors.primary[50]}
            onPress={navigateToDiagnose}
          />
          <FeatureCard
            title="Natural Remedies"
            description="Natural treatments for common livestock health issues"
            icon={<Leaf size={24} color={Colors.success[700]} />}
            backgroundColor={Colors.success[50]}
            onPress={navigateToRemedies}
          />
          <FeatureCard
            title="Profit Maximization"
            description="Optimize breeding, feeding, and housing for better returns"
            icon={<TrendingUp size={24} color={Colors.secondary[700]} />}
            backgroundColor={Colors.secondary[50]}
            onPress={navigateToProfit}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={GlobalStyles.spaceBetween}>
            <Text style={styles.sectionTitle}>Recent Diagnoses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <DiagnosisCard
            title="Foot Rot"
            date="June 10, 2025"
            animalType="Cow"
            animalIcon="🐄"
            symptoms={['Lameness', 'Swelling between toes', 'Foul odor']}
            confidence={85}
            onPress={() => {}}
          />
          
          <DiagnosisCard
            title="Mastitis"
            date="June 5, 2025"
            animalType="Goat"
            animalIcon="🐐"
            symptoms={['Swollen udder', 'Abnormal milk', 'Reduced production']}
            confidence={92}
            onPress={() => {}}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={GlobalStyles.spaceBetween}>
            <Text style={styles.sectionTitle}>Profit Tips</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ProfitTipCard
            title="Optimize Feeding Schedule"
            description="Adjusting your feeding times can reduce waste and improve feed conversion by up to 15%."
            impactLevel="high"
            category="Nutrition"
            onPress={() => {}}
          />
          
          <ProfitTipCard
            title="Breeding Season Planning"
            description="Strategic breeding timing can increase birth rates and optimize market prices for your livestock."
            impactLevel="medium"
            category="Breeding"
            onPress={() => {}}
          />
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.neutral[600],
  },
  farmerName: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: Colors.neutral[800],
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  featuresContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: Colors.neutral[800],
    marginBottom: Spacing.md,
  },
  viewAllText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.primary[600],
  },
  bottomPadding: {
    height: 80,
  },
});