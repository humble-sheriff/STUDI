import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Shield, Phone } from 'lucide-react-native';

interface EmergencyButtonProps {
  onPress?: () => void;
  style?: any;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onPress, style }) => {
  const handleEmergencyPress = () => {
    Alert.alert(
      'Emergency Support',
      'Choose your support option:',
      [
        {
          text: 'Campus Crisis Line',
          onPress: () => Alert.alert('Calling...', 'Campus Crisis Hotline: 1-800-XXX-XXXX'),
        },
        {
          text: 'Campus Counseling',
          onPress: () => Alert.alert('Booking...', 'Connecting you to campus counseling services'),
        },
        {
          text: 'Emergency Services',
          onPress: () => Alert.alert('Emergency', 'Calling Emergency Services: 911'),
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
    
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.emergencyButton, style]} 
      onPress={handleEmergencyPress}
    >
      <Shield size={16} color="#ffffff" />
      <Text style={styles.emergencyText}>Emergency</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: '#dc2626',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emergencyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});