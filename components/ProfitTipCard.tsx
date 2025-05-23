import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TrendingUp, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';

type ProfitTipCardProps = {
  title: string;
  description: string;
  impactLevel: 'low' | 'medium' | 'high';
  category: string;
  onPress: () => void;
};

export default function ProfitTipCard({
  title,
  description,
  impactLevel,
  category,
  onPress,
}: ProfitTipCardProps) {
  // Function to determine impact color and icon count
  const getImpactDetails = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'high':
        return { color: Colors.success[500], count: 3 };
      case 'medium':
        return { color: Colors.warning[500], count: 2 };
      case 'low':
        return { color: Colors.primary[500], count: 1 };
      default:
        return { color: Colors.primary[500], count: 1 };
    }
  };

  const impactDetails = getImpactDetails(impactLevel);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: Colors.secondary[50] }]}>
          <Text style={[styles.categoryText, { color: Colors.secondary[700] }]}>{category}</Text>
        </View>
        <View style={styles.impactContainer}>
          {Array(impactDetails.count).fill(0).map((_, index) => (
            <TrendingUp key={index} size={16} color={impactDetails.color} style={styles.impactIcon} />
          ))}
        </View>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
      
      <View style={styles.footer}>
        <View style={styles.impactLevelContainer}>
          <Text style={styles.impactLevelLabel}>Profit Impact:</Text>
          <Text style={[
            styles.impactLevelValue,
            { color: impactDetails.color }
          ]}>
            {impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)}
          </Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Details</Text>
          <ArrowRight size={16} color={Colors.primary[600]} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.small,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactIcon: {
    marginLeft: 2,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 6,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  impactLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactLevelLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.neutral[600],
    marginRight: 4,
  },
  impactLevelValue: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.sm,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  viewButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.primary[600],
    marginRight: 4,
  },
});