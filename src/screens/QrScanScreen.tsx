import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const QrScanScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setIsScanning(false);
    
    // QRコードデータの処理
    console.log('QR Code scanned:', data);
    
    // 仮の処理（後でFirestoreとの連携を実装）
    Alert.alert(
      'スキャン完了',
      `QRコードを読み取りました: ${data}`,
      [
        {
          text: '入店処理',
          onPress: () => {
            // TODO: 入店処理を実装
            console.log('入店処理実行');
          },
        },
        {
          text: 'キャンセル',
          onPress: () => setScanned(false),
          style: 'cancel',
        },
      ]
    );
  };

  const startScanning = () => {
    setScanned(false);
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>カメラの許可を確認中...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>カメラへのアクセスが許可されていません</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>設定を開く</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
            <Text style={styles.scanText}>QRコードを枠内に合わせてください</Text>
          </View>
          <TouchableOpacity style={styles.stopButton} onPress={stopScanning}>
            <Ionicons name="close-circle" size={50} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>QRコードスキャン</Text>
            <Text style={styles.subtitle}>
              入店・退店の際にQRコードをスキャンしてください
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.scanButton} onPress={startScanning}>
              <Ionicons name="qr-code" size={48} color="white" />
              <Text style={styles.scanButtonText}>スキャン開始</Text>
            </TouchableOpacity>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>使用方法</Text>
              <Text style={styles.infoText}>
                1. 「スキャン開始」をタップ{'\n'}
                2. QRコードをカメラで読み取り{'\n'}
                3. 入店または退店処理を選択
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  scanner: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  stopButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QrScanScreen; 