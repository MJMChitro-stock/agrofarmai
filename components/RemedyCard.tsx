import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Leaf, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';

type RemedyCardProps = {
  title: string;
  healthIssue: string;
  ingredients: string[];
  isNatural: boolean;
  onPress: () => void;
};

export default function RemedyCard({
  title,
  healthIssue,
  ingredients,
  isNatural,
  onPress,
}: RemedyCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.healthIssue}>For: {healthIssue}</Text>
        </View>
        {isNatural && (
          <View style={styles.naturalBadge}>
            <Leaf size={14} color={Colors.success[600]} />
            <Text style={styles.naturalText}>Natural</Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Key Ingredients:</Text>
        <View style={styles.ingredientsList}>
          {ingredients.slice(0, 3).map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
          {ingredients.length > 3 && (
            <Text style={styles.moreIngredients}>+{ingredients.length - 3} more</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Recipe</Text>
        <ArrowRight size={16} color={Colors.white} />
      </TouchableOpacity>
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
  titleContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  healthIssue: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[600],
  },
  naturalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    borderRadius: BorderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  naturalText: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.success[600],
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Spacing.sm,
  },
  ingredientsContainer: {
    marginBottom: Spacing.md,
  },
  ingredientsTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 6,
  },
  ingredientsList: {
    marginLeft: Spacing.xs,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary[500],
    marginRight: 8,
  },
  ingredientText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[700],
  },
  moreIngredients: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.secondary[600],
    marginTop: 2,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[600],
    borderRadius: BorderRadius.sm,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  viewButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.white,
    marginRight: 8,
  },
});