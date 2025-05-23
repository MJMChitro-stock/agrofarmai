import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Camera, FileText, Mic, Upload, ChevronDown } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Colors } from '@/constants/Colors';
import { GlobalStyles, FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';
import AnimalSelector from '@/components/AnimalSelector';

export default function DiagnoseScreen() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState<'photo' | 'text'>('photo');

  const handleAnimalSelect = (animalId: string) => {
    setSelectedAnimal(animalId === selectedAnimal ? null : animalId);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeSymptoms = () => {
    if (!selectedAnimal) {
      alert('Please select an animal first');
      return;
    }

    if (activeTab === 'photo' && !selectedImage) {
      alert('Please add an image or switch to text description');
      return;
    }

    if (activeTab === 'text' && !symptoms.trim()) {
      alert('Please describe the symptoms');
      return;
    }

    setIsAnalyzing(true);

    // Simulating API call
    setTimeout(() => {
      setIsAnalyzing(false);
      // Here you would navigate to results or show in-place
    }, 2000);
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Diagnose Health Issue</Text>
          <Text style={styles.headerSubtitle}>
            Upload a photo or describe symptoms for AI analysis
          </Text>
        </View>

        <AnimalSelector 
          selectedAnimal={selectedAnimal} 
          onSelectAnimal={handleAnimalSelect} 
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'photo' && styles.activeTab]}
            onPress={() => setActiveTab('photo')}
          >
            <Camera 
              size={18} 
              color={activeTab === 'photo' ? Colors.primary[600] : Colors.neutral[500]} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'photo' && styles.activeTabText]}
            >
              Photo/Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'text' && styles.activeTab]}
            onPress={() => setActiveTab('text')}
          >
            <FileText 
              size={18}
              color={activeTab === 'text' ? Colors.primary[600] : Colors.neutral[500]} 
            />
            <Text 
              style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}
            >
              Describe Symptoms
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'photo' ? (
          <View style={styles.photoContainer}>
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imagePreview}
                  contentFit="cover"
                />
                <TouchableOpacity 
                  style={styles.changeImageButton}
                  onPress={pickImage}
                >
                  <Text style={styles.changeImageText}>Change Image</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.uploadOptions}>
                <TouchableOpacity 
                  style={styles.uploadOption}
                  onPress={takePicture}
                >
                  <View style={styles.uploadIconContainer}>
                    <Camera size={24} color={Colors.primary[600]} />
                  </View>
                  <Text style={styles.uploadOptionText}>Take Photo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.uploadOption}
                  onPress={pickImage}
                >
                  <View style={styles.uploadIconContainer}>
                    <Upload size={24} color={Colors.primary[600]} />
                  </View>
                  <Text style={styles.uploadOptionText}>Upload Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.symptomsInput}
              placeholder="Describe the symptoms you've observed..."
              placeholderTextColor={Colors.neutral[400]}
              multiline
              numberOfLines={5}
              value={symptoms}
              onChangeText={setSymptoms}
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.additionalInfoContainer}>
          <TouchableOpacity style={styles.additionalInfoButton}>
            <Text style={styles.additionalInfoText}>Add Additional Information</Text>
            <ChevronDown size={18} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[
            styles.analyzeButton,
            isAnalyzing && styles.analyzeButtonDisabled,
            (!selectedAnimal || 
              (activeTab === 'photo' && !selectedImage) || 
              (activeTab === 'text' && !symptoms.trim())
            ) && styles.analyzeButtonDisabled
          ]}
          onPress={analyzeSymptoms}
          disabled={isAnalyzing || !selectedAnimal || 
            (activeTab === 'photo' && !selectedImage) || 
            (activeTab === 'text' && !symptoms.trim())
          }
        >
          <Text style={styles.analyzeButtonText}>
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.neutral[100],
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  activeTab: {
    backgroundColor: Colors.white,
    ...Shadow.small,
  },
  tabText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[500],
    marginLeft: 6,
  },
  activeTabText: {
    color: Colors.primary[600],
  },
  photoContainer: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.xs,
    height: 180,
    ...Shadow.small,
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  uploadOptionText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.neutral[700],
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  changeImageButton: {
    backgroundColor: Colors.neutral[100],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  changeImageText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[700],
  },
  textInputContainer: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  symptomsInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    paddingRight: 50,
    minHeight: 150,
    textAlignVertical: 'top',
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.neutral[800],
    ...Shadow.small,
  },
  micButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalInfoContainer: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  additionalInfoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.neutral[100],
    borderRadius: BorderRadius.md,
  },
  additionalInfoText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[600],
    marginRight: Spacing.xs,
  },
  analyzeButton: {
    backgroundColor: Colors.primary[600],
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
  },
  analyzeButtonDisabled: {
    backgroundColor: Colors.neutral[300],
  },
  analyzeButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    color: Colors.white,
  },
});