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
import { LineChart, PieChart } from 'react-native-chart-kit';
import { DollarSign, TrendingUp, TrendingDown, Plus, Minus, CreditCard, PiggyBank, CircleAlert as AlertCircle, X, Calendar, Receipt } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const FinanceCard = ({ title, amount, subtitle, icon: Icon, color, trend }) => (
  <View style={styles.financeCard}>
    <View style={styles.cardHeader}>
      <Icon size={24} color={color} />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardAmount}>{amount}</Text>
    <View style={styles.cardFooter}>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      {trend && (
        <View style={styles.trendContainer}>
          {trend > 0 ? (
            <TrendingUp size={16} color="#10b981" />
          ) : (
            <TrendingDown size={16} color="#ef4444" />
          )}
          <Text style={[styles.trendText, { color: trend > 0 ? '#10b981' : '#ef4444' }]}>
            {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </View>
  </View>
);

const TransactionItem = ({ transaction, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
    <View style={styles.transactionLeft}>
      <View style={[styles.transactionIcon, { backgroundColor: transaction.color }]}>
        <Receipt size={16} color="#ffffff" />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{transaction.title}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
    <Text style={[styles.transactionAmount, { color: transaction.type === 'expense' ? '#ef4444' : '#10b981' }]}>
      {transaction.type === 'expense' ? '-' : '+'}KES {transaction.amount}
    </Text>
  </TouchableOpacity>
);

const AddTransactionModal = ({ visible, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState('expense');

  const categories = {
    expense: ['Food', 'Transport', 'Books', 'Entertainment', 'Bills', 'Other'],
    income: ['Scholarship', 'Part-time', 'Allowance', 'Other'],
  };

  const handleSave = () => {
    if (title && amount) {
      onSave({
        title,
        amount: parseFloat(amount),
        category,
        type,
        date: new Date().toISOString().split('T')[0],
        color: type === 'expense' ? '#ef4444' : '#10b981',
      });
      setTitle('');
      setAmount('');
      setCategory('Food');
      setType('expense');
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
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.typeSelector}>
            <TouchableOpacity
              onPress={() => setType('expense')}
              style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]}>
              <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setType('income')}
              style={[styles.typeButton, type === 'income' && styles.typeButtonActive]}>
              <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter transaction title"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Amount (KES)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {categories[type].map((cat) => (
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

          <View style={styles.modalFooter}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function FinanceScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'Lunch at Cafeteria',
      amount: 350,
      category: 'Food',
      type: 'expense',
      date: '2024-01-15',
      color: '#ef4444',
    },
    {
      id: 2,
      title: 'Bus Fare',
      amount: 120,
      category: 'Transport',
      type: 'expense',
      date: '2024-01-15',
      color: '#ef4444',
    },
    {
      id: 3,
      title: 'Part-time Job',
      amount: 5000,
      category: 'Part-time',
      type: 'income',
      date: '2024-01-14',
      color: '#10b981',
    },
  ]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([{ ...newTransaction, id: Date.now() }, ...transactions]);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2000, 4500, 2800, 8000, 9900, 4300],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const pieData = [
    { name: 'Food', population: 45, color: '#ef4444', legendFontColor: '#7F7F7F' },
    { name: 'Transport', population: 25, color: '#f59e0b', legendFontColor: '#7F7F7F' },
    { name: 'Books', population: 20, color: '#10b981', legendFontColor: '#7F7F7F' },
    { name: 'Entertainment', population: 10, color: '#8b5cf6', legendFontColor: '#7F7F7F' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finance</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Plus size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Balance Overview */}
        <View style={styles.balanceContainer}>
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={styles.balanceGradient}>
            <Text style={styles.balanceLabel}>Current Balance</Text>
            <Text style={styles.balanceAmount}>KES {balance.toLocaleString()}</Text>
            <View style={styles.balanceButtons}>
              <TouchableOpacity style={styles.balanceButton}>
                <Plus size={16} color="#ffffff" />
                <Text style={styles.balanceButtonText}>Add Money</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceButton}>
                <Minus size={16} color="#ffffff" />
                <Text style={styles.balanceButtonText}>Send Money</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Finance Cards */}
        <View style={styles.cardsContainer}>
          <FinanceCard
            title="Total Income"
            amount={`KES ${totalIncome.toLocaleString()}`}
            subtitle="This month"
            icon={TrendingUp}
            color="#10b981"
            trend={12}
          />
          <FinanceCard
            title="Total Expenses"
            amount={`KES ${totalExpenses.toLocaleString()}`}
            subtitle="This month"
            icon={TrendingDown}
            color="#ef4444"
            trend={-5}
          />
          <FinanceCard
            title="Savings Goal"
            amount="KES 25,000"
            subtitle="68% complete"
            icon={PiggyBank}
            color="#f59e0b"
          />
          <FinanceCard
            title="M-Pesa Balance"
            amount="KES 8,450"
            subtitle="Last updated: Now"
            icon={CreditCard}
            color="#8b5cf6"
          />
        </View>

        {/* Spending Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Spending Trend</Text>
          <LineChart
            data={chartData}
            width={width - 60}
            height={220}
            yAxisLabel="KES "
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Expense Categories */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Expense Categories</Text>
          <PieChart
            data={pieData}
            width={width - 60}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
            style={styles.chart}
          />
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {transactions.slice(0, 5).map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onPress={() => Alert.alert('Transaction Details', `${transaction.title}\nAmount: KES ${transaction.amount}\nCategory: ${transaction.category}\nDate: ${transaction.date}`)}
            />
          ))}
        </View>

        {/* Budget Alert */}
        <View style={styles.alertContainer}>
          <View style={styles.alertCard}>
            <AlertCircle size={24} color="#f59e0b" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Budget Alert</Text>
              <Text style={styles.alertText}>
                You've spent 78% of your monthly budget for Food category
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
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
  content: {
    flex: 1,
  },
  balanceContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceGradient: {
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#ffffff',
    fontSize: 16,
    opacity: 0.9,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  balanceButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  balanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  balanceButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  financeCard: {
    width: (width - 55) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSubtitle: {
    fontSize: 10,
    color: '#6b7280',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  transactionsContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  viewAllText: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alertContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  alertCard: {
    backgroundColor: '#fef3c7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  alertText: {
    fontSize: 12,
    color: '#b45309',
    marginTop: 2,
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
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: '#3b82f6',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  typeButtonTextActive: {
    color: '#ffffff',
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