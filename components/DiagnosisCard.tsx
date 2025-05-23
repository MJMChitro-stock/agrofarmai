import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, ArrowRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';

type DiagnosisCardProps = {
  title: string;
  date: string;
  animalType: string;
  animalIcon: string;
  symptoms: string[];
  confidence: number;
  onPress: () => void;
};

export default function DiagnosisCard({
  title,
  date,
  animalType,
  animalIcon,
  symptoms,
  confidence,
  onPress,
}: DiagnosisCardProps) {
  // Function to determine confidence color
  const getConfidenceColor = (value: number) => {
    if (value >= 80) return Colors.success[500];
    if (value >= 60) return Colors.warning[500];
    return Colors.error[500];
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dateContainer}>
            <Calendar size={14} color={Colors.neutral[500]} />
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <View style={styles.animalContainer}>
          <Text style={styles.animalIcon}>{animalIcon}</Text>
          <Text style={styles.animalType}>{animalType}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.symptomsContainer}>
        <Text style={styles.symptomsTitle}>Symptoms:</Text>
        <View style={styles.symptomsList}>
          {symptoms.slice(0, 2).map((symptom, index) => (
            <View key={index} style={styles.symptomItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
          {symptoms.length > 2 && (
            <Text style={styles.moreSymptoms}>+{symptoms.length - 2} more</Text>
          )}
        </View>
      </View>
      
      <View style={styles.footer}>
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>AI Confidence:</Text>
          <View style={styles.confidenceBarContainer}>
            <View 
              style={[
                styles.confidenceBar, 
                { 
                  width: `${confidence}%`,
                  backgroundColor: getConfidenceColor(confidence)
                }
              ]} 
            />
          </View>
          <Text style={[
            styles.confidenceValue,
            { color: getConfidenceColor(confidence) }
          ]}>
            {confidence}%
          </Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View</Text>
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
    marginBottom: Spacing.md,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  animalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalIcon: {
    fontSize: 24,
    marginBottom: 2,
  },
  animalType: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: Colors.neutral[600],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: Spacing.sm,
  },
  symptomsContainer: {
    marginBottom: Spacing.md,
  },
  symptomsTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 6,
  },
  symptomsList: {
    marginLeft: Spacing.xs,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary[500],
    marginRight: 8,
  },
  symptomText: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[700],
  },
  moreSymptoms: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.primary[600],
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  confidenceLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  confidenceBarContainer: {
    height: 6,
    backgroundColor: Colors.neutral[200],
    borderRadius: BorderRadius.xs,
    marginBottom: 4,
    overflow: 'hidden',
  },
  confidenceBar: {
    height: '100%',
    borderRadius: BorderRadius.xs,
  },
  confidenceValue: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    alignSelf: 'flex-end',
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