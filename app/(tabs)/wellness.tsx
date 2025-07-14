import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Heart,
  Brain,
  Moon,
  Activity,
  Smile,
  Frown,
  Meh,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Phone,
  MessageCircle,
  Book,
  Users,
  Calendar,
  X,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WellnessCard = ({ title, value, subtitle, icon: Icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.wellnessCard}>
    <LinearGradient colors={[color, `${color}DD`]} style={styles.cardGradient}>
      <Icon size={24} color="#ffffff" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { id: 'great', icon: Smile, color: '#10b981', label: 'Great' },
    { id: 'good', icon: Smile, color: '#3b82f6', label: 'Good' },
    { id: 'okay', icon: Meh, color: '#f59e0b', label: 'Okay' },
    { id: 'bad', icon: Frown, color: '#ef4444', label: 'Bad' },
    { id: 'terrible', icon: Frown, color: '#991b1b', label: 'Terrible' },
  ];

  return (
    <View style={styles.moodSelector}>
      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <View style={styles.moodGrid}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            onPress={() => onMoodSelect(mood.id)}
            style={[
              styles.moodButton,
              selectedMood === mood.id && { backgroundColor: mood.color },
            ]}>
            <mood.icon 
              size={24} 
              color={selectedMood === mood.id ? '#ffffff' : mood.color} 
            />
            <Text 
              style={[
                styles.moodLabel,
                selectedMood === mood.id && { color: '#ffffff' },
              ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const MeditationTimer = () => {
  const [time, setTime] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(5);

  const durations = [3, 5, 10, 15, 20];

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      Alert.alert('Session Complete!', 'Great job! You completed your meditation session.');
      setTime(selectedDuration * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, selectedDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(selectedDuration * 60);
  };

  const changeDuration = (duration) => {
    setSelectedDuration(duration);
    setTime(duration * 60);
    setIsRunning(false);
  };

  return (
    <View style={styles.meditationContainer}>
      <Text style={styles.meditationTitle}>Meditation Timer</Text>
      
      <View style={styles.durationSelector}>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            onPress={() => changeDuration(duration)}
            style={[
              styles.durationButton,
              selectedDuration === duration && styles.durationButtonActive,
            ]}>
            <Text
              style={[
                styles.durationText,
                selectedDuration === duration && styles.durationTextActive,
              ]}>
              {duration}m
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.timerDisplay}>
        <View style={styles.timerCircle}>
          <Text style={styles.timerTime}>{formatTime(time)}</Text>
        </View>
      </View>

      <View style={styles.timerControls}>
        <TouchableOpacity onPress={toggleTimer} style={styles.timerButton}>
          {isRunning ? <Pause size={24} color="#ffffff" /> : <Play size={24} color="#ffffff" />}
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={[styles.timerButton, styles.resetButton]}>
          <RotateCcw size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ResourceCard = ({ title, description, icon: Icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.resourceCard}>
    <View style={[styles.resourceIcon, { backgroundColor: color }]}>
      <Icon size={20} color="#ffffff" />
    </View>
    <View style={styles.resourceContent}>
      <Text style={styles.resourceTitle}>{title}</Text>
      <Text style={styles.resourceDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const CrisisModal = ({ visible, onClose }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Crisis Support</Text>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.crisisText}>
          If you're experiencing a mental health crisis, please reach out for help immediately.
        </Text>

        <View style={styles.crisisOptions}>
          <TouchableOpacity style={styles.crisisButton}>
            <Phone size={20} color="#ffffff" />
            <Text style={styles.crisisButtonText}>Call Crisis Hotline</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.crisisButton}>
            <MessageCircle size={20} color="#ffffff" />
            <Text style={styles.crisisButtonText}>Text Crisis Line</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.crisisButton}>
            <Users size={20} color="#ffffff" />
            <Text style={styles.crisisButtonText}>Campus Counseling</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          <Text style={styles.emergencyText}>Kenya Crisis Helpline: 1192</Text>
          <Text style={styles.emergencyText}>Campus Counseling: 0700-123-456</Text>
          <Text style={styles.emergencyText}>Emergency Services: 999</Text>
        </View>
      </View>
    </View>
  </Modal>
);

export default function WellnessScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [crisisModalVisible, setCrisisModalVisible] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const newEntry = {
      mood,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
    };
    setMoodHistory([newEntry, ...moodHistory.slice(0, 6)]);
    Alert.alert('Mood Logged', 'Thank you for sharing how you feel today!');
  };

  const resources = [
    {
      title: 'Guided Meditation',
      description: 'Calming sessions for stress relief',
      icon: Brain,
      color: '#8b5cf6',
    },
    {
      title: 'Sleep Stories',
      description: 'Relaxing stories for better sleep',
      icon: Moon,
      color: '#3b82f6',
    },
    {
      title: 'Breathing Exercises',
      description: 'Quick techniques for anxiety relief',
      icon: Activity,
      color: '#10b981',
    },
    {
      title: 'Wellness Articles',
      description: 'Educational content on mental health',
      icon: Book,
      color: '#f59e0b',
    },
    {
      title: 'Support Groups',
      description: 'Connect with peers facing similar challenges',
      icon: Users,
      color: '#ef4444',
    },
    {
      title: 'Book Counseling',
      description: 'Schedule session with campus counselor',
      icon: Calendar,
      color: '#6366f1',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellness</Text>
        <TouchableOpacity 
          onPress={() => setCrisisModalVisible(true)}
          style={styles.crisisButton}>
          <Phone size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Wellness Overview */}
        <View style={styles.cardsContainer}>
          <WellnessCard
            title="Mood Score"
            value="7.2"
            subtitle="This week average"
            icon={Heart}
            color="#ef4444"
          />
          <WellnessCard
            title="Meditation"
            value="45m"
            subtitle="Total this week"
            icon={Brain}
            color="#8b5cf6"
          />
          <WellnessCard
            title="Sleep"
            value="7.5h"
            subtitle="Last night"
            icon={Moon}
            color="#3b82f6"
          />
          <WellnessCard
            title="Activities"
            value="8"
            subtitle="Completed today"
            icon={Activity}
            color="#10b981"
          />
        </View>

        {/* Mood Tracker */}
        <View style={styles.section}>
          <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
          
          {moodHistory.length > 0 && (
            <View style={styles.moodHistory}>
              <Text style={styles.historyTitle}>Recent Mood History</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {moodHistory.map((entry, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyDate}>{entry.date}</Text>
                    <Text style={styles.historyMood}>{entry.mood}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Meditation Timer */}
        <View style={styles.section}>
          <MeditationTimer />
        </View>

        {/* Daily Wellness Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Wellness Tip</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              "Take a 5-minute break every hour to stretch and breathe deeply. Your mind and body will thank you!"
            </Text>
          </View>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Resources</Text>
          <View style={styles.resourcesGrid}>
            {resources.map((resource, index) => (
              <ResourceCard
                key={index}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                color={resource.color}
                onPress={() => Alert.alert(resource.title, resource.description)}
              />
            ))}
          </View>
        </View>

        {/* Wellness Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7-Day Wellness Challenge</Text>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>Mindful Moments</Text>
            <Text style={styles.challengeDescription}>
              Practice mindfulness for 10 minutes daily this week
            </Text>
            <View style={styles.challengeProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '43%' }]} />
              </View>
              <Text style={styles.progressText}>Day 3 of 7</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <CrisisModal
        visible={crisisModalVisible}
        onClose={() => setCrisisModalVisible(false)}
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
  crisisButton: {
    backgroundColor: '#ef4444',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  wellnessCard: {
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
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  moodSelector: {
    marginBottom: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  moodLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  moodHistory: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 10,
    color: '#6b7280',
  },
  historyMood: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  meditationContainer: {
    alignItems: 'center',
  },
  meditationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  durationSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  durationButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  durationButtonActive: {
    backgroundColor: '#8b5cf6',
  },
  durationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  durationTextActive: {
    color: '#ffffff',
  },
  timerDisplay: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#8b5cf6',
  },
  timerTime: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  timerControls: {
    flexDirection: 'row',
    gap: 16,
  },
  timerButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#6b7280',
  },
  tipCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  resourcesGrid: {
    gap: 12,
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  resourceDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  challengeCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#047857',
    marginBottom: 12,
  },
  challengeProgress: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#d1fae5',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#047857',
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
    maxWidth: 400,
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
  crisisText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  crisisOptions: {
    gap: 12,
    marginBottom: 20,
  },
  crisisButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emergencyInfo: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#7f1d1d',
    marginBottom: 4,
  },
});