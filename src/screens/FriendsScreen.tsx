import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 仮のデータ型定義
interface Friend {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
  lastSeen: string;
  mutualFriends: number;
}

const FriendsScreen: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  // 仮のデータ（後でFirestoreから取得）
  const mockFriends: Friend[] = [
    {
      id: '1',
      name: '田中太郎',
      email: 'tanaka@example.com',
      isOnline: true,
      lastSeen: '今',
      mutualFriends: 5,
    },
    {
      id: '2',
      name: '佐藤花子',
      email: 'sato@example.com',
      isOnline: false,
      lastSeen: '2時間前',
      mutualFriends: 3,
    },
    {
      id: '3',
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      isOnline: true,
      lastSeen: '今',
      mutualFriends: 8,
    },
  ];

  const mockRequests: Friend[] = [
    {
      id: '4',
      name: '高橋美咲',
      email: 'takahashi@example.com',
      isOnline: false,
      lastSeen: '1日前',
      mutualFriends: 2,
    },
  ];

  const mockSuggestions: Friend[] = [
    {
      id: '5',
      name: '伊藤健太',
      email: 'ito@example.com',
      isOnline: true,
      lastSeen: '今',
      mutualFriends: 4,
    },
    {
      id: '6',
      name: '渡辺由美',
      email: 'watanabe@example.com',
      isOnline: false,
      lastSeen: '30分前',
      mutualFriends: 6,
    },
  ];

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = async () => {
    // TODO: Firestoreからデータを取得
    setFriends(mockFriends);
  };

  const handleAcceptRequest = (friendId: string) => {
    Alert.alert('確認', 'ともだちリクエストを承認しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '承認', onPress: () => console.log('承認:', friendId) },
    ]);
  };

  const handleRejectRequest = (friendId: string) => {
    Alert.alert('確認', 'ともだちリクエストを拒否しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '拒否', onPress: () => console.log('拒否:', friendId) },
    ]);
  };

  const handleAddFriend = (friendId: string) => {
    Alert.alert('確認', 'ともだちに追加しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '追加', onPress: () => console.log('追加:', friendId) },
    ]);
  };

  const renderFriend = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <View style={styles.nameContainer}>
          <Text style={styles.friendName}>{item.name}</Text>
          <View style={[styles.statusDot, { backgroundColor: item.isOnline ? '#4CAF50' : '#9E9E9E' }]} />
        </View>
        <Text style={styles.friendEmail}>{item.email}</Text>
        <Text style={styles.lastSeen}>
          {item.isOnline ? 'オンライン' : `最終ログイン: ${item.lastSeen}`}
        </Text>
        <Text style={styles.mutualFriends}>共通のともだち: {item.mutualFriends}人</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="person-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRequest = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
        <Text style={styles.mutualFriends}>共通のともだち: {item.mutualFriends}人</Text>
      </View>
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.requestButton, styles.acceptButton]}
          onPress={() => handleAcceptRequest(item.id)}
        >
          <Text style={styles.acceptButtonText}>承認</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.requestButton, styles.rejectButton]}
          onPress={() => handleRejectRequest(item.id)}
        >
          <Text style={styles.rejectButtonText}>拒否</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSuggestion = ({ item }: { item: Friend }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendEmail}>{item.email}</Text>
        <Text style={styles.mutualFriends}>共通のともだち: {item.mutualFriends}人</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => handleAddFriend(item.id)}
      >
        <Text style={styles.addButtonText}>追加</Text>
      </TouchableOpacity>
    </View>
  );

  const getCurrentData = () => {
    switch (activeTab) {
      case 'friends':
        return friends.filter(friend => 
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'requests':
        return mockRequests.filter(friend => 
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      case 'suggestions':
        return mockSuggestions.filter(friend => 
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          friend.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      default:
        return [];
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ともだち</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            ともだち ({friends.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            リクエスト ({mockRequests.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && styles.activeTab]}
          onPress={() => setActiveTab('suggestions')}
        >
          <Text style={[styles.tabText, activeTab === 'suggestions' && styles.activeTabText]}>
            おすすめ ({mockSuggestions.length})
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="検索..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={getCurrentData()}
        renderItem={
          activeTab === 'friends' ? renderFriend :
          activeTab === 'requests' ? renderRequest :
          renderSuggestion
        }
        keyExtractor={(item) => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>
              {activeTab === 'friends' ? 'ともだちがいません' :
               activeTab === 'requests' ? 'リクエストがありません' :
               'おすすめのともだちがいません'}
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
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  friendCard: {
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
  friendInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendName: {
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
  friendEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  mutualFriends: {
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
  requestActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rejectButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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

export default FriendsScreen; 