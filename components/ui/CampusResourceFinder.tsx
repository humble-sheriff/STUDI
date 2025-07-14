import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { MapPin, Clock, Phone, Star, Search } from 'lucide-react-native';

interface CampusResource {
  id: string;
  name: string;
  category: 'academic' | 'health' | 'financial' | 'social' | 'emergency';
  location: string;
  hours: string;
  phone?: string;
  rating: number;
  description: string;
  services: string[];
  waitTime?: string;
  availability: 'open' | 'closed' | 'busy';
}

interface CampusResourceFinderProps {
  onResourceSelect: (resource: CampusResource) => void;
}

export const CampusResourceFinder: React.FC<CampusResourceFinderProps> = ({
  onResourceSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const resources: CampusResource[] = [
    {
      id: '1',
      name: 'Academic Success Center',
      category: 'academic',
      location: 'Library Building, 2nd Floor',
      hours: 'Mon-Fri 9AM-8PM, Sat 10AM-6PM',
      phone: '(555) 123-4567',
      rating: 4.8,
      description: 'Free tutoring, study groups, and academic coaching',
      services: ['Tutoring', 'Study Groups', 'Writing Center', 'Math Lab'],
      waitTime: '15 min',
      availability: 'open',
    },
    {
      id: '2',
      name: 'Counseling & Mental Health',
      category: 'health',
      location: 'Student Health Center',
      hours: '24/7 Crisis Line, Mon-Fri 8AM-6PM',
      phone: '(555) 987-6543',
      rating: 4.9,
      description: 'Mental health support and counseling services',
      services: ['Individual Counseling', 'Group Therapy', 'Crisis Support', 'Workshops'],
      availability: 'open',
    },
    {
      id: '3',
      name: 'Financial Aid Office',
      category: 'financial',
      location: 'Administration Building, Room 150',
      hours: 'Mon-Fri 8AM-5PM',
      phone: '(555) 456-7890',
      rating: 4.2,
      description: 'Financial aid, scholarships, and work-study programs',
      services: ['FAFSA Help', 'Scholarships', 'Work-Study', 'Emergency Funds'],
      waitTime: '30 min',
      availability: 'busy',
    },
    {
      id: '4',
      name: 'Campus Food Bank',
      category: 'social',
      location: 'Student Union, Lower Level',
      hours: 'Mon, Wed, Fri 12PM-4PM',
      rating: 4.5,
      description: 'Free food assistance for students in need',
      services: ['Food Pantry', 'Meal Vouchers', 'Nutrition Counseling'],
      availability: 'open',
    },
    {
      id: '5',
      name: 'Campus Safety',
      category: 'emergency',
      location: 'Multiple locations',
      hours: '24/7',
      phone: '(555) 911-SAFE',
      rating: 4.7,
      description: 'Campus security and emergency services',
      services: ['Emergency Response', 'Safety Escorts', 'Lost & Found'],
      availability: 'open',
    },
  ];

  const categories = [
    { id: 'all', name: 'All', color: '#6b7280' },
    { id: 'academic', name: 'Academic', color: '#3b82f6' },
    { id: 'health', name: 'Health', color: '#ef4444' },
    { id: 'financial', name: 'Financial', color: '#10b981' },
    { id: 'social', name: 'Social', color: '#8b5cf6' },
    { id: 'emergency', name: 'Emergency', color: '#dc2626' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.services.some(service => 
                           service.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'open': return '#10b981';
      case 'busy': return '#f59e0b';
      case 'closed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'open': return 'Available';
      case 'busy': return 'Busy';
      case 'closed': return 'Closed';
      default: return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Resources</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6b7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources or services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && { backgroundColor: category.color },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && { color: '#ffffff' },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Resources List */}
      <ScrollView style={styles.resourcesList}>
        {filteredResources.map(resource => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => onResourceSelect(resource)}
          >
            <View style={styles.resourceHeader}>
              <Text style={styles.resourceName}>{resource.name}</Text>
              <View style={styles.availabilityContainer}>
                <View 
                  style={[
                    styles.availabilityDot, 
                    { backgroundColor: getAvailabilityColor(resource.availability) }
                  ]} 
                />
                <Text style={styles.availabilityText}>
                  {getAvailabilityText(resource.availability)}
                </Text>
              </View>
            </View>

            <Text style={styles.resourceDescription}>{resource.description}</Text>

            <View style={styles.resourceDetails}>
              <View style={styles.detailRow}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.detailText}>{resource.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.detailText}>{resource.hours}</Text>
              </View>
              {resource.phone && (
                <View style={styles.detailRow}>
                  <Phone size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{resource.phone}</Text>
                </View>
              )}
            </View>

            <View style={styles.resourceFooter}>
              <View style={styles.ratingContainer}>
                <Star size={14} color="#f59e0b" />
                <Text style={styles.ratingText}>{resource.rating}</Text>
              </View>
              {resource.waitTime && (
                <Text style={styles.waitTimeText}>~{resource.waitTime} wait</Text>
              )}
            </View>

            <View style={styles.servicesContainer}>
              {resource.services.slice(0, 3).map((service, index) => (
                <View key={index} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
              {resource.services.length > 3 && (
                <Text style={styles.moreServices}>+{resource.services.length - 3} more</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    padding: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  categoryScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  resourcesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resourceCard: {
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
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    color: '#6b7280',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  resourceDetails: {
    gap: 6,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 6,
  },
  resourceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  waitTimeText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  serviceTag: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  serviceText: {
    fontSize: 10,
    color: '#1e40af',
  },
  moreServices: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});