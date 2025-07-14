import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MessageCircle,
  Users,
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Heart,
  MessageSquare,
  Share2,
  Star,
  MapPin,
  X,
  Send,
} from 'lucide-react-native';

const CommunityCard = ({ title, members, description, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.communityCard}>
    <Image source={{ uri: image }} style={styles.communityImage} />
    <View style={styles.communityContent}>
      <Text style={styles.communityTitle}>{title}</Text>
      <Text style={styles.communityMembers}>{members} members</Text>
      <Text style={styles.communityDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const ForumPost = ({ post, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.forumPost}>
    <View style={styles.postHeader}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.postMeta}>
        <Text style={styles.postAuthor}>{post.author}</Text>
        <Text style={styles.postTime}>{post.time}</Text>
      </View>
    </View>
    <Text style={styles.postTitle}>{post.title}</Text>
    <Text style={styles.postContent}>{post.content}</Text>
    <View style={styles.postActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Heart size={16} color="#6b7280" />
        <Text style={styles.actionText}>{post.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <MessageSquare size={16} color="#6b7280" />
        <Text style={styles.actionText}>{post.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Share2 size={16} color="#6b7280" />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const MarketplaceItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.marketplaceItem}>
    <Image source={{ uri: item.image }} style={styles.itemImage} />
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>KES {item.price}</Text>
      <View style={styles.itemMeta}>
        <View style={styles.itemRating}>
          <Star size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <View style={styles.itemLocation}>
          <MapPin size={12} color="#6b7280" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const CreatePostModal = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');

  const categories = ['General', 'Study Help', 'Events', 'Jobs', 'Housing', 'Marketplace'];

  const handleSave = () => {
    if (title && content) {
      onSave({
        title,
        content,
        category,
        author: 'You',
        time: 'Just now',
        likes: 0,
        comments: 0,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      });
      setTitle('');
      setContent('');
      setCategory('General');
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
            <Text style={styles.modalTitle}>Create New Post</Text>
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
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter post title"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Content</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={content}
              onChangeText={setContent}
              placeholder="What's on your mind?"
              multiline
              numberOfLines={5}
            />
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('forums');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Study Group for Data Structures',
      content: 'Looking for people to join our study group for Data Structures. We meet every Tuesday and Thursday at 4 PM in the library.',
      author: 'Jane Doe',
      time: '2 hours ago',
      likes: 12,
      comments: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    },
    {
      id: 2,
      title: 'Free Tutoring Sessions',
      content: 'Offering free tutoring sessions for Mathematics and Physics. First year students welcome! Contact me for more details.',
      author: 'John Smith',
      time: '5 hours ago',
      likes: 24,
      comments: 8,
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    },
  ]);

  const communities = [
    {
      id: 1,
      title: 'Computer Science Students',
      members: '1,234',
      description: 'Connect with fellow CS students, share resources, and discuss latest tech trends.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    },
    {
      id: 2,
      title: 'Study Buddies',
      members: '856',
      description: 'Find study partners, form study groups, and motivate each other to succeed.',
      image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    },
    {
      id: 3,
      title: 'Campus Events',
      members: '2,105',
      description: 'Stay updated on campus events, workshops, and social activities.',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=200',
    },
  ];

  const marketplaceItems = [
    {
      id: 1,
      title: 'Calculus Textbook',
      price: '2,500',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      rating: 4.5,
      location: 'Main Campus',
    },
    {
      id: 2,
      title: 'Gaming Laptop',
      price: '45,000',
      image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      rating: 4.8,
      location: 'Hostel A',
    },
    {
      id: 3,
      title: 'Scientific Calculator',
      price: '1,200',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      rating: 4.2,
      location: 'Library',
    },
  ];

  const handleAddPost = (newPost) => {
    setPosts([{ ...newPost, id: Date.now() }, ...posts]);
  };

  const tabs = [
    { id: 'forums', title: 'Forums', icon: MessageCircle },
    { id: 'groups', title: 'Groups', icon: Users },
    { id: 'marketplace', title: 'Marketplace', icon: ShoppingBag },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'forums':
        return (
          <View style={styles.tabContent}>
            {posts.map((post) => (
              <ForumPost
                key={post.id}
                post={post}
                onPress={() => Alert.alert('Post Details', `${post.title}\n\n${post.content}`)}
              />
            ))}
          </View>
        );
      case 'groups':
        return (
          <View style={styles.tabContent}>
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                title={community.title}
                members={community.members}
                description={community.description}
                image={community.image}
                onPress={() => Alert.alert('Join Community', `Join ${community.title}?`)}
              />
            ))}
          </View>
        );
      case 'marketplace':
        return (
          <View style={styles.tabContent}>
            <View style={styles.marketplaceGrid}>
              {marketplaceItems.map((item) => (
                <MarketplaceItem
                  key={item.id}
                  item={item}
                  onPress={() => Alert.alert('Item Details', `${item.title}\nPrice: KES ${item.price}\nLocation: ${item.location}`)}
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
        <Text style={styles.headerTitle}>Community</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Plus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities, posts, items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}>
            <tab.icon size={20} color={activeTab === tab.id ? '#3b82f6' : '#6b7280'} />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>

      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddPost}
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
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
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
  communityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  communityImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
  },
  communityContent: {
    padding: 16,
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  communityMembers: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  communityDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  forumPost: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  postMeta: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  postTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  marketplaceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  marketplaceItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f3f4f6',
  },
  itemContent: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  itemMeta: {
    gap: 4,
  },
  itemRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
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
    height: 120,
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
    fontSize: 14,
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