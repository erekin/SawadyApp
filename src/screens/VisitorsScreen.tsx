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
interface Visitor {
  id: string;
  name: string;
  email: string;
  checkInTime: string;
  isOnline: boolean;
}

const VisitorsScreen: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all');

  // 仮のデータ（後でFirestoreから取得）
  const mockVisitors: Visitor[] = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      checkInTime: '2024-01-15 19:30',
      isOnline: true,
    },
    {
      id: '2',
      name: '佐藤花子',
      email: 'sato@example.com',
      checkInTime: '2024-01-15 20:15',
      isOnline: true,
    },
    {
      id: '3',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      checkInTime: '2024-01-15 18:45',
      isOnline: false,
    },
  ];

  useEffect(() => {
    loadVisitors();
  }, []);

  const loadVisitors = async () => {
    // TODO: Firestoreからリアルタイムでデータを取得
    setVisitors(mockVisitors);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadVisitors();
    setRefreshing(false);
  };

  const filteredVisitors = visitors.filter(visitor => {
    if (filter === 'online') return visitor.isOnline;
    if (filter === 'offline') return !visitor.isOnline;
    return true;
  });

  const renderVisitor = ({ item }: { item: Visitor }) => (
    <View style={styles.visitorCard}>
      <View style={styles.visitorInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.visitorName}>{item.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: item.isOnline ? '#4CAF50' : '#9E9E9E' }]} />
        </View>
        <Text style={styles.visitorEmail}>{item.email}</Text>
        <Text style={styles.checkInTime}>入店時間: {item.checkInTime}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="person-add-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>来店者リスト</Text>
        <Text style={styles.subtitle}>
          現在の来店者: {visitors.filter(v => v.isOnline).length}人
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            すべて ({visitors.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'online' && styles.filterButtonActive]}
          onPress={() => setFilter('online')}
        >
          <Text style={[styles.filterText, filter === 'online' && styles.filterTextActive]}>
            オンライン ({visitors.filter(v => v.isOnline).length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'offline' && styles.filterButtonActive]}
          onPress={() => setFilter('offline')}
        >
          <Text style={[styles.filterText, filter === 'offline' && styles.filterTextActive]}>
            オフライン ({visitors.filter(v => !v.isOnline).length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredVisitors}
        renderItem={renderVisitor}
        keyExtractor={(item) => item.id}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>
              {filter === 'all' ? '来店者がいません' : 
               filter === 'online' ? 'オンラインの来店者がいません' : 
               'オフラインの来店者がいません'}
            </Text>
          </View>
        }
      />
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'white',
  },
  list: {
    flex: 1,
  },
  visitorCard: {
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
  visitorInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  visitorEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  checkInTime: {
    fontSize: 12,
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
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

export default VisitorsScreen; 