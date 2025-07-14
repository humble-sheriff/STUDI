import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Zap, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react-native';

interface AIInsightCardProps {
  type: 'academic' | 'financial' | 'wellness' | 'social';
  title: string;
  insight: string;
  confidence: number;
  actionable: boolean;
  onPress: () => void;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  type,
  title,
  insight,
  confidence,
  actionable,
  onPress,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return '#3b82f6';
      case 'financial': return '#10b981';
      case 'wellness': return '#ef4444';
      case 'social': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return Zap;
      case 'financial': return TrendingUp;
      case 'wellness': return AlertCircle;
      case 'social': return Zap;
      default: return Zap;
    }
  };

  const TypeIcon = getTypeIcon(type);
  const typeColor = getTypeColor(type);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${typeColor}20` }]}>
          <TypeIcon size={20} color={typeColor} />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceText}>
              {confidence}% confidence
            </Text>
            {actionable && (
              <View style={styles.actionableBadge}>
                <Text style={styles.actionableText}>ACTION</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.insight}>{insight}</Text>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap for detailed recommendations</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionableBadge: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  actionableText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  insight: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
});