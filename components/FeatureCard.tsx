import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';
import { Colors } from '@/constants/Colors';
import { ArrowRight } from 'lucide-react-native';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor: string;
  onPress: () => void;
};

export default function FeatureCard({
  title,
  description,
  icon,
  backgroundColor,
  onPress,
}: FeatureCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
      <View style={styles.arrowContainer}>
        <ArrowRight size={20} color={Colors.neutral[700]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.small,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[600],
    lineHeight: 20,
  },
  arrowContainer: {
    padding: Spacing.xs,
  },
});