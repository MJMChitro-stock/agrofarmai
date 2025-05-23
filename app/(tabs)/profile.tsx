import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Switch
} from 'react-native';
import { Image } from 'expo-image';
import { Settings, Bell, Download, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { GlobalStyles, FontFamily, Spacing, BorderRadius, Shadow } from '@/constants/Theme';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [offlineModeEnabled, setOfflineModeEnabled] = React.useState(false);

  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleOfflineMode = () => setOfflineModeEnabled(prev => !prev);

  const menuItems = [
    {
      icon: <Bell size={22} color={Colors.neutral[600]} />,
      title: 'Notifications',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: toggleNotifications,
    },
    {
      icon: <Download size={22} color={Colors.neutral[600]} />,
      title: 'Offline Mode',
      subtitle: 'Save data for offline use',
      type: 'switch',
      value: offlineModeEnabled,
      onToggle: toggleOfflineMode,
    },
    {
      icon: <Settings size={22} color={Colors.neutral[600]} />,
      title: 'Preferences',
      type: 'link',
    },
    {
      icon: <HelpCircle size={22} color={Colors.neutral[600]} />,
      title: 'Help & Support',
      type: 'link',
    },
    {
      icon: <LogOut size={22} color={Colors.error[600]} />,
      title: 'Logout',
      type: 'danger',
    },
  ];

  const renderMenuItem = (item: any, index: number) => {
    return (
      <TouchableOpacity 
        key={index}
        style={[
          styles.menuItem,
          index === menuItems.length - 1 && styles.lastMenuItem
        ]}
        disabled={item.type === 'switch'}
      >
        <View style={styles.menuItemLeft}>
          <View style={styles.menuItemIconContainer}>{item.icon}</View>
          <View>
            <Text style={[
              styles.menuItemTitle,
              item.type === 'danger' && styles.dangerText
            ]}>
              {item.title}
            </Text>
            {item.subtitle && (
              <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
            )}
          </View>
        </View>
        
        {item.type === 'switch' ? (
          <Switch
            trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.neutral[300]}
            onValueChange={item.onToggle}
            value={item.value}
          />
        ) : (
          <ChevronRight size={20} color={Colors.neutral[400]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>John's Farm</Text>
          <Text style={styles.profileEmail}>john@farmexample.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Animals</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>15</Text>
            <Text style={styles.statLabel}>Diagnoses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Remedies</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(renderMenuItem)}
        </View>

        <View style={styles.appInfoSection}>
          <Text style={styles.appVersion}>AgroFarm AI v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2025 AgroFarm AI</Text>
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
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadow.medium,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.neutral[800],
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.neutral[600],
    marginBottom: Spacing.md,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary[50],
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary[200],
  },
  editProfileText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.primary[600],
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    ...Shadow.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: 24,
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[600],
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.neutral[200],
    alignSelf: 'center',
  },
  menuSection: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadow.small,
    marginBottom: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuItemTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.neutral[800],
  },
  menuItemSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  dangerText: {
    color: Colors.error[600],
  },
  appInfoSection: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  appVersion: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  appCopyright: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.neutral[500],
  },
  bottomPadding: {
    height: 80,
  },
});