import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 仮のデータ型定義
interface PointHistory {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  date: string;
  balance: number;
}

const PointsScreen: React.FC = () => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [pointHistory, setPointHistory] = useState<PointHistory[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');

  // 仮のデータ（後でFirestoreから取得）
  const mockHistory: PointHistory[] = [
    {
      id: '1',
      type: 'earned',
      amount: 100,
      description: '入店ボーナス',
      date: '2024-01-15 19:30',
      balance: 1250,
    },
    {
      id: '2',
      type: 'earned',
      amount: 50,
      description: 'ともだち紹介ボーナス',
      date: '2024-01-14 20:15',
      balance: 1150,
    },
    {
      id: '3',
      type: 'spent',
      amount: -200,
      description: 'ドリンク割引',
      date: '2024-01-13 21:00',
      balance: 1100,
    },
    {
      id: '4',
      type: 'earned',
      amount: 100,
      description: '入店ボーナス',
      date: '2024-01-12 18:45',
      balance: 1300,
    },
    {
      id: '5',
      type: 'earned',
      amount: 150,
      description: '長時間滞在ボーナス',
      date: '2024-01-11 22:30',
      balance: 1200,
    },
  ];

  useEffect(() => {
    loadPointData();
  }, []);

  const loadPointData = async () => {
    // TODO: Firestoreからデータを取得
    setPointHistory(mockHistory);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPointData();
    setRefreshing(false);
  };

  const renderHistoryItem = ({ item }: { item: PointHistory }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyInfo}>
        <Text style={styles.historyDescription}>{item.description}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <View style={styles.historyAmount}>
        <Text style={[
          styles.amountText,
          { color: item.type === 'earned' ? '#4CAF50' : '#f44336' }
        ]}>
          {item.type === 'earned' ? '+' : ''}{item.amount}
        </Text>
        <Text style={styles.balanceText}>残高: {item.balance}</Text>
      </View>
    </View>
  );

  const getTotalEarned = () => {
    return pointHistory
      .filter(item => item.type === 'earned')
      .reduce((sum, item) => sum + item.amount, 0);
  };

  const getTotalSpent = () => {
    return Math.abs(pointHistory
      .filter(item => item.type === 'spent')
      .reduce((sum, item) => sum + item.amount, 0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ポイント</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            概要
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            履歴
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' ? (
        <View style={styles.overviewContainer}>
          <View style={styles.pointsCard}>
            <Text style={styles.pointsLabel}>現在のポイント</Text>
            <Text style={styles.pointsAmount}>{currentPoints.toLocaleString()}</Text>
            <View style={styles.pointsIcon}>
              <Ionicons name="star" size={32} color="#FFD700" />
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
              <Text style={styles.statAmount}>{getTotalEarned().toLocaleString()}</Text>
              <Text style={styles.statLabel}>獲得ポイント</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="trending-down" size={24} color="#f44336" />
              <Text style={styles.statAmount}>{getTotalSpent().toLocaleString()}</Text>
              <Text style={styles.statLabel}>使用ポイント</Text>
            </View>
          </View>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>ポイントの使い方</Text>
            
            <View style={styles.benefitItem}>
              <Ionicons name="wine" size={20} color="#007AFF" />
              <Text style={styles.benefitText}>ドリンク割引</Text>
              <Text style={styles.benefitPoints}>100pt</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons name="gift" size={20} color="#007AFF" />
              <Text style={styles.benefitText}>特典アイテム</Text>
              <Text style={styles.benefitPoints}>500pt</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons name="card" size={20} color="#007AFF" />
              <Text style={styles.benefitText}>VIPメンバーシップ</Text>
              <Text style={styles.benefitPoints}>1000pt</Text>
            </View>
          </View>

          <View style={styles.earnContainer}>
            <Text style={styles.earnTitle}>ポイントを獲得する方法</Text>
            
            <View style={styles.earnItem}>
              <Ionicons name="qr-code" size={20} color="#4CAF50" />
              <Text style={styles.earnText}>入店時にQRコードスキャン</Text>
              <Text style={styles.earnPoints}>+100pt</Text>
            </View>
            
            <View style={styles.earnItem}>
              <Ionicons name="people" size={20} color="#4CAF50" />
              <Text style={styles.earnText}>ともだち紹介</Text>
              <Text style={styles.earnPoints}>+50pt</Text>
            </View>
            
            <View style={styles.earnItem}>
              <Ionicons name="time" size={20} color="#4CAF50" />
              <Text style={styles.earnText}>長時間滞在</Text>
              <Text style={styles.earnPoints}>+150pt</Text>
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={pointHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          style={styles.historyList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="star-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>ポイント履歴がありません</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  overviewContainer: {
    flex: 1,
    padding: 20,
  },
  pointsCard: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  pointsAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  pointsIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  benefitsContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  benefitPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  earnContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  earnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  earnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  earnText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  earnPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  historyList: {
    flex: 1,
  },
  historyCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyInfo: {
    flex: 1,
  },
  historyDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  balanceText: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default PointsScreen; 