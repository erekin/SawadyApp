// アプリ全体の定数
export const APP_NAME = 'SawadyApp';

// 色の定数
export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#f44336',
  info: '#2196F3',
  
  // 背景色
  background: '#f5f5f5',
  surface: '#ffffff',
  
  // テキスト色
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  
  // ボーダー色
  border: '#eeeeee',
  borderDark: '#dddddd',
};

// サイズの定数
export const SIZES = {
  // フォントサイズ
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  
  // スペーシング
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // ボーダー半径
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
};

// Firebase関連の定数
export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  VISITS: 'visits',
  FRIENDS: 'friends',
  POINTS: 'points',
  FRIEND_REQUESTS: 'friendRequests',
};

// ポイント関連の定数
export const POINTS = {
  CHECK_IN: 100,
  FRIEND_REFERRAL: 50,
  LONG_STAY: 150,
  DRINK_DISCOUNT: 100,
  SPECIAL_ITEM: 500,
  VIP_MEMBERSHIP: 1000,
};

// ナビゲーション関連の定数
export const ROUTES = {
  AUTH: 'Auth',
  LOGIN: 'Login',
  MAIN: 'Main',
  HOME: 'Home',
  QR_SCAN: 'QrScan',
  VISITORS: 'Visitors',
  FRIENDS: 'Friends',
  POINTS: 'Points',
};

// エラーメッセージ
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'ネットワークエラーが発生しました。',
  AUTH_ERROR: '認証エラーが発生しました。',
  PERMISSION_ERROR: '権限がありません。',
  CAMERA_PERMISSION: 'カメラの使用許可が必要です。',
  QR_SCAN_ERROR: 'QRコードの読み取りに失敗しました。',
  FIREBASE_ERROR: 'データベースエラーが発生しました。',
};

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'ログインしました。',
  SIGNUP_SUCCESS: 'アカウントを作成しました。',
  CHECK_IN_SUCCESS: '入店処理が完了しました。',
  CHECK_OUT_SUCCESS: '退店処理が完了しました。',
  FRIEND_REQUEST_SENT: 'ともだちリクエストを送信しました。',
  FRIEND_REQUEST_ACCEPTED: 'ともだちリクエストを承認しました。',
  POINTS_EARNED: 'ポイントを獲得しました。',
};

// 日付フォーマット
export const DATE_FORMATS = {
  DISPLAY: 'YYYY-MM-DD HH:mm',
  SHORT: 'MM/DD HH:mm',
  TIME_ONLY: 'HH:mm',
  DATE_ONLY: 'YYYY-MM-DD',
};

// アニメーション設定
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
}; 