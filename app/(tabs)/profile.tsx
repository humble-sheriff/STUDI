import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard as Edit, Bell, Shield, CircleHelp as HelpCircle, LogOut, Camera, Mail, Phone, MapPin, Calendar, GraduationCap, Award, TrendingUp, X, Save, Eye, EyeOff } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileHeader = ({ onEditPress }) => (
  <View style={styles.profileHeader}>
    <LinearGradient
      colors={['#3b82f6', '#1d4ed8']}
      style={styles.headerGradient}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <User size={48} color="#ffffff" />
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>John Doe</Text>
      <Text style={styles.userEmail}>john.doe@university.ac.ke</Text>
      <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
        <Edit size={16} color="#ffffff" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  </View>
);

const StatsCard = ({ title, value, icon: Icon, color }) => (
  <View style={styles.statsCard}>
    <View style={[styles.statsIcon, { backgroundColor: color }]}>
      <Icon size={20} color="#ffffff" />
    </View>
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsTitle}>{title}</Text>
  </View>
);

const SettingsItem = ({ title, subtitle, icon: Icon, onPress, rightElement }) => (
  <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
    <View style={styles.settingsLeft}>
      <View style={styles.settingsIcon}>
        <Icon size={20} color="#6b7280" />
      </View>
      <View style={styles.settingsContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {rightElement}
  </TouchableOpacity>
);

const EditProfileModal = ({ visible, onClose, onSave }) => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@university.ac.ke');
  const [phone, setPhone] = useState('+254 700 123 456');
  const [university, setUniversity] = useState('University of Nairobi');
  const [course, setCourse] = useState('Computer Science');
  const [year, setYear] = useState('3rd Year');

  const handleSave = () => {
    onSave({
      firstName,
      lastName,
      email,
      phone,
      university,
      course,
      year,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>University</Text>
              <TextInput
                style={styles.input}
                value={university}
                onChangeText={setUniversity}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Course</Text>
                <TextInput
                  style={styles.input}
                  value={course}
                  onChangeText={setCourse}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Save size={16} color="#ffffff" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const NotificationSettings = ({ visible, onClose }) => {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <View style={styles.settingsGroup}>
              <Text style={styles.settingsGroupTitle}>General</Text>
              <View style={styles.settingsToggle}>
                <Text style={styles.toggleLabel}>Push Notifications</Text>
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor={pushNotifications ? '#ffffff' : '#f4f3f4'}
                />
              </View>
              <View style={styles.settingsToggle}>
                <Text style={styles.toggleLabel}>Email Notifications</Text>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor={emailNotifications ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.settingsGroupTitle}>Academic</Text>
              <View style={styles.settingsToggle}>
                <Text style={styles.toggleLabel}>Study Reminders</Text>
                <Switch
                  value={studyReminders}
                  onValueChange={setStudyReminders}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor={studyReminders ? '#ffffff' : '#f4f3f4'}
                />
              </View>
              <View style={styles.settingsToggle}>
                <Text style={styles.toggleLabel}>Assignment Alerts</Text>
                <Switch
                  value={assignmentAlerts}
                  onValueChange={setAssignmentAlerts}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor={assignmentAlerts ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </View>

            <View style={styles.settingsGroup}>
              <Text style={styles.settingsGroupTitle}>Community</Text>
              <View style={styles.settingsToggle}>
                <Text style={styles.toggleLabel}>Community Updates</Text>
                <Switch
                  value={communityUpdates}
                  onValueChange={setCommunityUpdates}
                  trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                  thumbColor={communityUpdates ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function ProfileScreen() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  const handleEditProfile = (profileData) => {
    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ProfileHeader onEditPress={() => setEditModalVisible(true)} />

        {/* Profile Stats */}
        <View style={styles.statsContainer}>
          <StatsCard
            title="Current GPA"
            value="3.7"
            icon={TrendingUp}
            color="#10b981"
          />
          <StatsCard
            title="Courses"
            value="12"
            icon={GraduationCap}
            color="#3b82f6"
          />
          <StatsCard
            title="Achievements"
            value="8"
            icon={Award}
            color="#f59e0b"
          />
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Mail size={16} color="#6b7280" />
              <Text style={styles.infoText}>john.doe@university.ac.ke</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={16} color="#6b7280" />
              <Text style={styles.infoText}>+254 700 123 456</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={16} color="#6b7280" />
              <Text style={styles.infoText}>Nairobi, Kenya</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={16} color="#6b7280" />
              <Text style={styles.infoText}>Joined January 2022</Text>
            </View>
            <View style={styles.infoItem}>
              <GraduationCap size={16} color="#6b7280" />
              <Text style={styles.infoText}>Computer Science • 3rd Year</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <SettingsItem
              title="Notifications"
              subtitle="Manage your notification preferences"
              icon={Bell}
              onPress={() => setNotificationModalVisible(true)}
            />
            <SettingsItem
              title="Privacy & Security"
              subtitle="Control your privacy settings"
              icon={Shield}
              onPress={() => Alert.alert('Privacy Settings', 'Privacy settings coming soon!')}
            />
            <SettingsItem
              title="Help & Support"
              subtitle="Get help and contact support"
              icon={HelpCircle}
              onPress={() => Alert.alert('Help & Support', 'Support resources coming soon!')}
            />
            <SettingsItem
              title="App Settings"
              subtitle="Customize your app experience"
              icon={Settings}
              onPress={() => Alert.alert('App Settings', 'App settings coming soon!')}
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingsList}>
            <SettingsItem
              title="Change Password"
              subtitle="Update your account password"
              icon={Eye}
              onPress={() => Alert.alert('Change Password', 'Password change coming soon!')}
            />
            <SettingsItem
              title="Logout"
              subtitle="Sign out of your account"
              icon={LogOut}
              onPress={handleLogout}
            />
          </View>
        </View>

        {/* App Information */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>StudentLife AI v1.0.0</Text>
          <Text style={styles.appInfoText}>© 2024 StudentLife AI. All rights reserved.</Text>
        </View>
      </ScrollView>

      <EditProfileModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEditProfile}
      />

      <NotificationSettings
        visible={notificationModalVisible}
        onClose={() => setNotificationModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#ffffffDD',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    minWidth: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statsTitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  settingsList: {
    gap: 4,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalBody: {
    flex: 1,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 8,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  settingsGroupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  settingsToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#374151',
  },
});