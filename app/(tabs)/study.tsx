import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Send,
  Paperclip,
  Mic,
  BookOpen,
  FileText,
  Lightbulb,
  Clock,
  Target,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ChatMessage = ({ message, isUser }) => (
  <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
    <Text style={[styles.messageText, { color: isUser ? '#ffffff' : '#1f2937' }]}>
      {message}
    </Text>
  </View>
);

const StudyToolCard = ({ title, description, icon: Icon, color, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.toolCard}>
    <LinearGradient colors={[color, `${color}DD`]} style={styles.toolGradient}>
      <Icon size={24} color="#ffffff" />
      <Text style={styles.toolTitle}>{title}</Text>
      <Text style={styles.toolDescription}>{description}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      Alert.alert(
        isBreak ? 'Break Over!' : 'Study Session Complete!',
        isBreak ? 'Time to get back to studying!' : 'Time for a break!'
      );
      setIsBreak(!isBreak);
      setTime(isBreak ? 25 * 60 : 5 * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, isBreak]);

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
    setTime(isBreak ? 5 * 60 : 25 * 60);
  };

  return (
    <View style={styles.pomodoroContainer}>
      <Text style={styles.pomodoroTitle}>
        {isBreak ? 'Break Time' : 'Study Time'}
      </Text>
      <Text style={styles.pomodoroTime}>{formatTime(time)}</Text>
      <View style={styles.pomodoroControls}>
        <TouchableOpacity onPress={toggleTimer} style={styles.pomodoroButton}>
          {isRunning ? <Pause size={24} color="#ffffff" /> : <Play size={24} color="#ffffff" />}
        </TouchableOpacity>
        <TouchableOpacity onPress={resetTimer} style={[styles.pomodoroButton, styles.resetButton]}>
          <RotateCcw size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function StudyScreen() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI study assistant. How can I help you today?", isUser: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = { text: inputText, isUser: true };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          text: "I understand you're asking about that topic. Let me help you with that...",
          isUser: false,
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const studyTools = [
    {
      title: 'Flashcards',
      description: 'Create and review flashcards',
      icon: BookOpen,
      color: '#3b82f6',
    },
    {
      title: 'Summarize',
      description: 'Get AI-powered summaries',
      icon: FileText,
      color: '#10b981',
    },
    {
      title: 'Quiz Me',
      description: 'Generate practice questions',
      icon: Lightbulb,
      color: '#f59e0b',
    },
    {
      title: 'Study Goals',
      description: 'Set and track goals',
      icon: Target,
      color: '#8b5cf6',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Study Assistant</Text>
          <Text style={styles.headerSubtitle}>Your personal learning companion</Text>
        </View>

        {/* Study Tools */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScroll}>
          {studyTools.map((tool, index) => (
            <StudyToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              color={tool.color}
              onPress={() => Alert.alert(tool.title, `Opening ${tool.title} feature...`)}
            />
          ))}
        </ScrollView>

        {/* Pomodoro Timer */}
        <View style={styles.pomodoroSection}>
          <PomodoroTimer />
        </View>

        {/* Chat Interface */}
        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message.text} isUser={message.isUser} />
            ))}
            {isTyping && (
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>AI is typing...</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={20} color="#6b7280" />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about your studies..."
              multiline
              returnKeyType="send"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={20} color="#6b7280" />
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Send size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  toolsScroll: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  toolCard: {
    width: 140,
    height: 100,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  toolGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  toolTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  toolDescription: {
    color: '#ffffffDD',
    fontSize: 10,
  },
  pomodoroSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  pomodoroContainer: {
    alignItems: 'center',
  },
  pomodoroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  pomodoroTime: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 20,
  },
  pomodoroControls: {
    flexDirection: 'row',
    gap: 16,
  },
  pomodoroButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#6b7280',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 4,
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  typingIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
  },
  typingText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  attachButton: {
    padding: 10,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  micButton: {
    padding: 10,
    marginLeft: 8,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    padding: 10,
    marginLeft: 8,
  },
});