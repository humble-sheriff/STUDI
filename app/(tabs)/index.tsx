import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Clock,
  TrendingUp,import { Clock, TrendingUp, DollarSign, BookOpen, Target, Bell, ChevronRight, Calendar, Star, Award, Brain, Users, Heart, Shield, Zap, MapPin, Camera, MessageCircle, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, X, Plus, Activity } from 'lucide-react-native'ubtitle, icon: Icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <LinearGradient
      colors={[color, `${color}DD`]}
      style={styles.cardGradient}>
      <View style={styles.cardHeader}>
        <Icon size={24} color="#ffffff" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const QuickActionButton = ({ title, icon: Icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.quickAction}>
    <Icon size={20} color="#3b82f6" />
    <Text style={styles.quickActionText}>{title}</Text>
  </TouchableOpacity>
);

const UpcomingItem = ({ title, time, type, color }) => (
  <View style={styles.upcomingItem}>
    <View style={[styles.itemIndicator, { backgroundColor: color }]} />
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemTime}>{time}</Text>
    </View>
    <Text style={styles.itemType}>{type}</Text>
  </View>
);

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.userNameText}>John Doe</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#3b82f6" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Stats Cards */}
        <View style={styles.statsGrid}>
          <DashboardCard
            title="Current GPA"
            value="3.7"
            subtitle="↑ 0.2 from last semester"
            icon={TrendingUp}
            color="#10b981"
          />
          <DashboardCard
            title="Budget Status"
            value="KES 15,240"
            subtitle="68% of monthly budget"
            icon={DollarSign}
            color="#f59e0b"
          />
          <DashboardCard
            title="Study Hours"
            value="24h"
            subtitle="This week"
            icon={Clock}
            color="#8b5cf6"
          />
          <DashboardCard
            title="Assignments"
            value="5"
            subtitle="Due this week"
            icon={BookOpen}
            color="#ef4444"
          />
        </View>

        {/* Today's Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>65% Complete</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Target size={16} color="#10b981" />
              <Text style={styles.progressStatText}>4/6 Goals</Text>
            </View>
            <View style={styles.progressStat}>
              <Star size={16} color="#f59e0b" />
              <Text style={styles.progressStatText}>125 XP</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <QuickActionButton
              title="Ask AI Tutor"
              icon={Brain}
              onPress={() => {}}
            />
            <QuickActionButton
              title="New Task"
              icon={Target}
              onPress={() => {}}
            />
            <QuickActionButton
              title="Track Expense"
              icon={DollarSign}
              onPress={() => {}}
            />
            <QuickActionButton
              title="Join Study Group"
              icon={Users}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Next Up</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <View style={styles.upcomingList}>
            <UpcomingItem
              title="Data Structures Lecture"
              time="2:00 PM"
              type="Class"
              color="#3b82f6"
            />
            <UpcomingItem
              title="Algorithm Assignment"
              time="11:59 PM"
              type="Due"
              color="#ef4444"
            />
            <UpcomingItem
              title="Study Group - Physics"
              time="4:00 PM"
              type="Meeting"
              color="#10b981"
            />
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementCard}>
            <Award size={24} color="#f59e0b" />
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Study Streak Champion</Text>
              <Text style={styles.achievementSubtitle}>7 days in a row!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  welcomeText: {
    fontSize: 16,
    color: '#6b7280',
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 4,
  },
  headerRight: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  card: {
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressStatText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    width: (width - 84) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  upcomingList: {
    gap: 12,
  },
  upcomingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  itemIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  itemTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  itemType: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
  },
  achievementContent: {
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  achievementSubtitle: {
    fontSize: 12,
    color: '#b45309',
    marginTop: 2,
  },
});