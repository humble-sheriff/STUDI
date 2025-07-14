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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Briefcase,
  User,
  FileText,
  Target,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Plus,
  Search,
  Filter,
  X,
  Award,
  Users,
  BookOpen,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CareerCard = ({ title, value, subtitle, icon: Icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.careerCard}>
    <LinearGradient colors={[color, `${color}DD`]} style={styles.cardGradient}>
      <Icon size={24} color="#ffffff" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const JobCard = ({ job, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.jobCard}>
    <View style={styles.jobHeader}>
      <View style={styles.jobInfo}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.jobCompany}>{job.company}</Text>
      </View>
      <View style={styles.jobMeta}>
        <Text style={styles.jobSalary}>{job.salary}</Text>
        <Text style={styles.jobType}>{job.type}</Text>
      </View>
    </View>
    <View style={styles.jobDetails}>
      <View style={styles.jobDetail}>
        <MapPin size={12} color="#6b7280" />
        <Text style={styles.jobLocation}>{job.location}</Text>
      </View>
      <View style={styles.jobDetail}>
        <Clock size={12} color="#6b7280" />
        <Text style={styles.jobTime}>{job.posted}</Text>
      </View>
    </View>
    <View style={styles.jobSkills}>
      {job.skills.slice(0, 3).map((skill, index) => (
        <View key={index} style={styles.skillTag}>
          <Text style={styles.skillText}>{skill}</Text>
        </View>
      ))}
      {job.skills.length > 3 && (
        <Text style={styles.moreSkills}>+{job.skills.length - 3} more</Text>
      )}
    </View>
  </TouchableOpacity>
);

const MentorCard = ({ mentor, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.mentorCard}>
    <View style={styles.mentorHeader}>
      <View style={styles.mentorAvatar}>
        <User size={24} color="#3b82f6" />
      </View>
      <View style={styles.mentorInfo}>
        <Text style={styles.mentorName}>{mentor.name}</Text>
        <Text style={styles.mentorRole}>{mentor.role}</Text>
        <Text style={styles.mentorCompany}>{mentor.company}</Text>
      </View>
    </View>
    <Text style={styles.mentorBio}>{mentor.bio}</Text>
    <View style={styles.mentorStats}>
      <View style={styles.statItem}>
        <Users size={12} color="#6b7280" />
        <Text style={styles.statText}>{mentor.mentees} mentees</Text>
      </View>
      <View style={styles.statItem}>
        <Award size={12} color="#6b7280" />
        <Text style={styles.statText}>{mentor.rating} rating</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SkillCard = ({ skill, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{skill.name}</Text>
      <Text style={styles.skillLevel}>{skill.level}%</Text>
    </View>
    <View style={styles.skillProgress}>
      <View style={[styles.skillBar, { width: `${skill.level}%` }]} />
    </View>
    <Text style={styles.skillCategory}>{skill.category}</Text>
  </TouchableOpacity>
);

const CreateGoalModal = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('Skill Development');

  const categories = ['Skill Development', 'Job Search', 'Networking', 'Education', 'Certification'];

  const handleSave = () => {
    if (title && description && deadline) {
      onSave({
        title,
        description,
        deadline,
        category,
        progress: 0,
      });
      setTitle('');
      setDescription('');
      setDeadline('');
      setCategory('Skill Development');
      onClose();
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Career Goal</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.categoryButton,
                    category === cat && styles.categoryButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      category === cat && styles.categoryButtonTextActive,
                    ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Goal Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g., Learn React Native"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your goal and action plan..."
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Target Deadline</Text>
            <TextInput
              style={styles.input}
              value={deadline}
              onChangeText={setDeadline}
              placeholder="e.g., March 2024"
            />
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Create Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function CareerScreen() {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const jobMatches = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Kenya',
      salary: 'KES 40,000 - 60,000',
      type: 'Internship',
      location: 'Nairobi, Kenya',
      posted: '2 days ago',
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
      match: 85,
    },
    {
      id: 2,
      title: 'Mobile App Developer',
      company: 'StartupHub',
      salary: 'KES 80,000 - 120,000',
      type: 'Full-time',
      location: 'Remote',
      posted: '1 week ago',
      skills: ['React Native', 'Flutter', 'Firebase', 'API Integration'],
      match: 78,
    },
    {
      id: 3,
      title: 'Data Analyst Trainee',
      company: 'DataCorp',
      salary: 'KES 50,000 - 70,000',
      type: 'Graduate Program',
      location: 'Mombasa, Kenya',
      posted: '3 days ago',
      skills: ['Python', 'SQL', 'Excel', 'Tableau', 'Statistics'],
      match: 72,
    },
  ];

  const mentors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'Google',
      bio: 'Passionate about mentoring the next generation of developers. 8+ years in tech.',
      mentees: 15,
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      bio: 'Former startup founder, now helping students transition into tech careers.',
      mentees: 23,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Amina Hassan',
      role: 'Data Scientist',
      company: 'Safaricom',
      bio: 'Kenyan tech leader focused on AI and machine learning career guidance.',
      mentees: 18,
      rating: 4.9,
    },
  ];

  const skills = [
    { name: 'JavaScript', level: 75, category: 'Programming' },
    { name: 'React', level: 60, category: 'Frontend' },
    { name: 'Python', level: 45, category: 'Programming' },
    { name: 'Communication', level: 80, category: 'Soft Skills' },
    { name: 'Problem Solving', level: 70, category: 'Soft Skills' },
    { name: 'Leadership', level: 55, category: 'Soft Skills' },
  ];

  const tabs = [
    { id: 'overview', title: 'Overview' },
    { id: 'jobs', title: 'Jobs' },
    { id: 'mentors', title: 'Mentors' },
    { id: 'skills', title: 'Skills' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            <View style={styles.cardsContainer}>
              <CareerCard
                title="Profile Match"
                value="85%"
                subtitle="Industry average"
                icon={Target}
                color="#10b981"
              />
              <CareerCard
                title="Applications"
                value="12"
                subtitle="3 pending"
                icon={FileText}
                color="#3b82f6"
              />
              <CareerCard
                title="Network"
                value="45"
                subtitle="Professional connections"
                icon={Users}
                color="#8b5cf6"
              />
              <CareerCard
                title="Skill Score"
                value="78%"
                subtitle="Above average"
                icon={TrendingUp}
                color="#f59e0b"
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <View style={styles.activityList}>
                <View style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Briefcase size={16} color="#3b82f6" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Applied to Frontend Developer position</Text>
                    <Text style={styles.activityTime}>2 hours ago</Text>
                  </View>
                </View>
                <View style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Award size={16} color="#10b981" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Completed JavaScript certification</Text>
                    <Text style={styles.activityTime}>1 day ago</Text>
                  </View>
                </View>
                <View style={styles.activityItem}>
                  <View style={styles.activityIcon}>
                    <Users size={16} color="#8b5cf6" />
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>Connected with Sarah Johnson</Text>
                    <Text style={styles.activityTime}>3 days ago</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        );
      case 'jobs':
        return (
          <View style={styles.tabContent}>
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color="#6b7280" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            {jobMatches.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onPress={() => Alert.alert('Job Details', `${job.title} at ${job.company}\n\nSalary: ${job.salary}\nLocation: ${job.location}\nMatch: ${job.match}%`)}
              />
            ))}
          </View>
        );
      case 'mentors':
        return (
          <View style={styles.tabContent}>
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onPress={() => Alert.alert('Connect with Mentor', `Send a connection request to ${mentor.name}?`)}
              />
            ))}
          </View>
        );
      case 'skills':
        return (
          <View style={styles.tabContent}>
            <View style={styles.skillsGrid}>
              {skills.map((skill, index) => (
                <SkillCard
                  key={index}
                  skill={skill}
                  onPress={() => Alert.alert('Skill Details', `${skill.name}\nLevel: ${skill.level}%\nCategory: ${skill.category}`)}
                />
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Career Hub</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>

      <CreateGoalModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(goal) => {
          Alert.alert('Goal Created', `Your goal "${goal.title}" has been created successfully!`);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 8,
  },
  tabContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3b82f6',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 20,
  },
  careerCard: {
    width: (width - 55) / 2,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ffffffDD',
    fontSize: 10,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
  },
  jobCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  jobCompany: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  jobMeta: {
    alignItems: 'flex-end',
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  jobType: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  jobDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobLocation: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  jobTime: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  jobSkills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#1e40af',
  },
  moreSkills: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  mentorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mentorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  mentorRole: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  mentorCompany: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 2,
  },
  mentorBio: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  mentorStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  skillsGrid: {
    gap: 16,
  },
  skillCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  skillProgress: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  skillBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
  skillCategory: {
    fontSize: 12,
    color: '#6b7280',
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
  inputGroup: {
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#3b82f6',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});