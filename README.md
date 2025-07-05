# SawadyApp

会員制 BAR 向けのモックアプリケーションです。React Native + Expo + Firebase を使用して開発されています。

## 機能

### MVP 機能（実装予定）

1. **ユーザー認証機能**

   - Firebase Auth を使用したメール/パスワード認証
   - 新規登録・ログイン機能

2. **QR コード入退店処理**

   - Expo Barcode Scanner を使用した QR コードスキャン
   - 入店・退店の自動処理

3. **リアルタイム来店者リスト**

   - Firestore との連携によるリアルタイム更新
   - オンライン/オフライン状態の表示

4. **ともだち機能**

   - ユーザー同士の簡易リンク機能
   - ともだちリクエストの送受信
   - ともだち検索・追加機能

5. **ポイント管理システム**
   - 来店ポイントの獲得・使用
   - ポイント履歴の表示
   - 特典との交換機能

## 技術スタック

- **フロントエンド**: React Native
- **開発環境**: Expo
- **バックエンド**: Firebase
  - Authentication
  - Firestore
  - Cloud Functions（予定）
- **言語**: TypeScript
- **ナビゲーション**: React Navigation v6

## セットアップ

### 前提条件

- Node.js (v16 以上)
- npm または yarn
- Expo CLI
- Firebase プロジェクト

### インストール

1. リポジトリをクローン

```bash
git clone <repository-url>
cd SawadyApp
```

2. 依存関係をインストール

```bash
npm install
# または
yarn install
```

3. Firebase 設定

   - Firebase Console でプロジェクトを作成
   - Authentication、Firestore を有効化
   - 設定情報を`src/firebase/firebaseConfig.ts`に追加

4. 環境変数の設定

```bash
# .envファイルを作成
cp .env.example .env
# Firebase設定情報を.envファイルに追加
```

5. アプリを起動

```bash
npm start
# または
yarn start
```

## プロジェクト構造

```
src/
├── components/          # 共通コンポーネント
│   ├── Button.tsx
│   └── Header.tsx
├── screens/            # 画面コンポーネント
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── QrScanScreen.tsx
│   ├── VisitorsScreen.tsx
│   ├── FriendsScreen.tsx
│   └── PointsScreen.tsx
├── firebase/           # Firebase設定・ロジック
│   └── firebaseConfig.ts
├── utils/              # ユーティリティ関数
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx             # メインアプリコンポーネント
```

## 開発ガイドライン

### コーディング規約

- **TypeScript**: すべてのファイルで TypeScript を使用
- **命名規則**:
  - 変数・関数: camelCase
  - コンポーネント: PascalCase
  - 定数: UPPER_SNAKE_CASE
- **コンポーネント**: 関数コンポーネントのみ使用
- **ナビゲーション**: React Navigation v6 を使用

### ファイル命名規則

- 画面ファイル: `ScreenNameScreen.tsx`
- コンポーネントファイル: `ComponentName.tsx`
- ユーティリティファイル: `fileName.ts`

## Firebase 設定

### 必要なサービス

1. **Authentication**

   - メール/パスワード認証を有効化

2. **Firestore Database**
   - セキュリティルールを設定
   - 以下のコレクションを作成:
     - `users`: ユーザー情報
     - `visits`: 来店履歴
     - `friends`: ともだち関係
     - `points`: ポイント履歴
     - `friendRequests`: ともだちリクエスト

### セキュリティルール例

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のデータのみ読み書き可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 来店履歴は認証済みユーザーのみ読み取り可能
    match /visits/{visitId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## デプロイ

### Expo Build

```bash
# iOS用ビルド
expo build:ios

# Android用ビルド
expo build:android
```

### App Store / Google Play Store

1. Expo Build でビルド
2. 各ストアの開発者アカウントでアプリを登録
3. ビルドファイルをアップロード

## トラブルシューティング

### よくある問題

1. **Firebase 接続エラー**

   - 設定情報が正しいか確認
   - ネットワーク接続を確認

2. **カメラ権限エラー**

   - デバイスの設定でカメラ権限を確認
   - `expo-barcode-scanner`の設定を確認

3. **ナビゲーションエラー**
   - React Navigation の依存関係を確認
   - 型定義が正しいか確認

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 貢献

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## サポート

問題や質問がある場合は、Issue を作成してください。
