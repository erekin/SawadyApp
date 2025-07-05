import { Platform } from 'react-native';

// 日付フォーマット関数
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD HH:mm'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
};

// 相対時間表示関数
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '今';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分前`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}時間前`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}日前`;
  }
};

// メールアドレス検証関数
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// パスワード強度検証関数
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('パスワードは6文字以上である必要があります');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を含める必要があります');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('小文字を含める必要があります');
  }

  if (!/\d/.test(password)) {
    errors.push('数字を含める必要があります');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 数値のフォーマット関数
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ja-JP');
};

// ポイント表示用フォーマット関数
export const formatPoints = (points: number): string => {
  return `${formatNumber(points)}pt`;
};

// デバイス情報取得関数
export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  };
};

// ランダムID生成関数
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// 配列のシャッフル関数
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 文字列の省略関数
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// カラーコードの検証関数
export const isValidColor = (color: string): boolean => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return colorRegex.test(color);
};

// ファイルサイズのフォーマット関数
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 電話番号のフォーマット関数
export const formatPhoneNumber = (phoneNumber: string): string => {
  // 数字以外を除去
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // 日本の電話番号形式に変換
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  
  return phoneNumber;
};

// 深いコピー関数
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }

  return obj;
};

// デバウンス関数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// スロットル関数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}; 