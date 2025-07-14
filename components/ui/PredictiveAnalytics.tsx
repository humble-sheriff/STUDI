import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TrendingUp, TrendingDown, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

interface PredictiveAnalyticsProps {
  predictions: {
    gpa: {
      current: number;
      predicted: number;
      confidence: number;
      trend: 'up' | 'down' | 'stable';
    };
    retention: {
      risk: 'low' | 'medium' | 'high';
      factors: string[];
      confidence: number;
    };
    graduation: {
      onTime: boolean;
      probability: number;
      timeline: string;
    };
  };
  onViewDetails: (type: string) => void;
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({
  predictions,
  onViewDetails,
}) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'medium': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return TrendingUp;
    }
  };

  const RiskIcon = getRiskIcon(predictions.retention.risk);
  const TrendIcon = getTrendIcon(predictions.gpa.trend);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Predictive Analytics</Text>
      
      {/* GPA Prediction */}
      <TouchableOpacity 
        style={styles.predictionCard}
        onPress={() => onViewDetails('gpa')}
      >
        <View style={styles.cardHeader}>
          <TrendIcon size={20} color={predictions.gpa.trend === 'up' ? '#10b981' : '#ef4444'} />
          <Text style={styles.cardTitle}>GPA Forecast</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.currentValue}>Current: {predictions.gpa.current}</Text>
          <Text style={styles.predictedValue}>
            Predicted: {predictions.gpa.predicted} ({predictions.gpa.confidence}% confidence)
          </Text>
        </View>
      </TouchableOpacity>

      {/* Retention Risk */}
      <TouchableOpacity 
        style={styles.predictionCard}
        onPress={() => onViewDetails('retention')}
      >
        <View style={styles.cardHeader}>
          <RiskIcon size={20} color={getRiskColor(predictions.retention.risk)} />
          <Text style={styles.cardTitle}>Retention Risk</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={[styles.riskLevel, { color: getRiskColor(predictions.retention.risk) }]}>
            {predictions.retention.risk.toUpperCase()} RISK
          </Text>
          <Text style={styles.confidenceText}>
            {predictions.retention.confidence}% confidence
          </Text>
          <Text style={styles.factorsText}>
            Key factors: {predictions.retention.factors.slice(0, 2).join(', ')}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Graduation Timeline */}
      <TouchableOpacity 
        style={styles.predictionCard}
        onPress={() => onViewDetails('graduation')}
      >
        <View style={styles.cardHeader}>
          <CheckCircle size={20} color={predictions.graduation.onTime ? '#10b981' : '#f59e0b'} />
          <Text style={styles.cardTitle}>Graduation Forecast</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.timelineText}>
            Expected: {predictions.graduation.timeline}
          </Text>
          <Text style={styles.probabilityText}>
            On-time probability: {predictions.graduation.probability}%
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  predictionCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  cardContent: {
    gap: 4,
  },
  currentValue: {
    fontSize: 14,
    color: '#374151',
  },
  predictedValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  riskLevel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confidenceText: {
    fontSize: 12,
    color: '#6b7280',
  },
  factorsText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  timelineText: {
    fontSize: 14,
    color: '#374151',
  },
  probabilityText: {
    fontSize: 12,
    color: '#6b7280',
  },
});