# React Flow GUI Tool Specification

## 概要 (Overview)
React Flowを使用したインタラクティブなフローチャート・ダイアグラム作成ツールです。
An interactive flowchart and diagram creation tool using React Flow.

## 開発ルール (Development Rules)

### .cursor設定
プロジェクトの開発ルールとガイドラインは`.cursor`ディレクトリで管理されています。

#### 基本設定
- `chatrule.mdc`: チャットアシスタントの基本設定
- `config.mdc`: アシスタントの基本設定
- `responses.mdc`: レスポンステンプレート

#### 開発ルール
- `rules/coding_rules.mdc`: コーディング規約
- `rules/error_handling.mdc`: エラーハンドリング
- `rules/security.mdc`: セキュリティガイドライン
- `rules/performance.mdc`: パフォーマンス最適化
- `rules/accessibility.mdc`: アクセシビリティ
- `rules/snippets.mdc`: コードスニペット
- `rules/git_workflow.mdc`: Gitワークフロー
- `rules/development.mdc`: 開発環境設定

各ルールファイルはMarkdown形式で記述され、設定の意図や詳細な説明を含んでいます。

## 主要機能 (Main Features)

### 1. ノード操作 (Node Operations)
- ドラッグ&ドロップによるノードの配置
- ノードのサイズ変更
- ノードの回転
- ノードの複製
- ノードの削除
- ノードのグループ化/グループ解除
- カスタムノードの作成と保存

### 2. エッジ操作 (Edge Operations)
- ノード間の接続
- エッジの削除
- エッジのスタイル変更
- カスタムエッジの作成
- エッジのラベル付け

### 3. キャンバス操作 (Canvas Operations)
- ズームイン/アウト
- パン（移動）
- キャンバスのリセット
- グリッド表示/非表示
- スナップ機能
- ガイドライン表示
  - ノード配置のガイドライン
  - 等間隔配置のスナップ
  - グリッドのカスタマイズ

### 4. データ管理 (Data Management)
- フロー図のエクスポート機能
  - PNG画像として保存
  - SVG形式で保存
  - Markdown形式で保存（Mermaid記法）
  - JSON形式で保存（後で読み込み可能）
- クリップボードへのコピー機能
- ローカルストレージでの一時保存
- テンプレート機能
  - プリセットテンプレート（JSON形式で提供）
  - テンプレートのカスタマイズと保存
  - 新規作成時のテンプレート選択

### 5. UI/UX機能 (UI/UX Features)
- ダークモード/ライトモード切り替え
- カスタマイズ可能なテーマ
- ショートカットキー
- コンテキストメニュー
- ツールバー
- ミニマップ
- レスポンシブデザイン

## 技術要件 (Technical Requirements)

### 開発環境 (Development Environment)
- Node.js v22
- npm (パッケージマネージャー)
- 開発サーバーポート: 5174

### フロントエンド (Frontend)
- React 18以上
- TypeScript
- @xyflow/react (最新版)
- Tailwind CSS
- Zustand (状態管理)
- html2canvas (画像エクスポート用)
- mermaid-js (Markdownエクスポート用)

### 開発ツール (Development Tools)
- ESLint
- Prettier
- Jest
- Cypress
- GitHub Actions

## パフォーマンス要件 (Performance Requirements)
- 初期ロード時間: 2秒以内
- ノード描画: 1000ノード以上でも60FPSを維持
- エクスポート処理: 3秒以内

## セキュリティ要件 (Security Requirements)
- XSS対策
- 入力値のバリデーション
- ファイルダウンロードのセキュリティ

## アクセシビリティ要件 (Accessibility Requirements)
- WCAG 2.1準拠
- キーボード操作対応
- スクリーンリーダー対応
- 高コントラストモード

## ブラウザ対応 (Browser Support)
- Chrome (最新版)
- Brave (最新版)

## 実装判断 (Implementation Decisions)

### 実装する機能 (Features to Implement)
- テンプレート機能（JSON形式で提供）
- ガイドライン表示
- 基本的なノード・エッジ操作
- エクスポート機能
- ローカルストレージ保存

### 実装しない機能 (Features Not to Implement)
- ノードの検索・フィルタリング
- アンドゥ・リドゥ（後日検討）
- モバイルブラウザ対応
- 複雑なパフォーマンス最適化

## 開発フェーズ (Development Phases)

### Phase 1: 基本機能実装
- 基本的なノード操作
- 基本的なエッジ操作
- キャンバス操作
- ローカルストレージ保存
- ガイドライン表示

### Phase 2: 拡張機能実装
- カスタムノード
- カスタムエッジ
- テーマ機能
- エクスポート機能（PNG, SVG）
- テンプレート機能

### Phase 3: 追加機能実装
- Markdownエクスポート
- クリップボード機能
- ショートカットキー
- ミニマップ

### Phase 4: 最適化と改善
- アクセシビリティ対応
- テストカバレッジ向上
- ドキュメント作成

## ライセンス (License)
MIT License

## エラーハンドリング (Error Handling)
- エクスポート時のエラー処理
  - ファイル保存失敗時のエラーメッセージ表示
  - エクスポート処理中のプログレス表示
- ローカルストレージ関連
  - 容量不足時の警告表示
  - データ保存失敗時のフォールバック処理
- データ読み込み
  - 無効なJSONデータの検証
  - テンプレート読み込みエラーの処理
- ブラウザ互換性
  - 非対応ブラウザでの警告表示
  - 機能制限時の適切なメッセージ表示

## ショートカットキー管理 (Shortcut Key Management)
- キーバインド設定ファイル（`src/config/shortcuts.json`）で管理
- デフォルトショートカット
  - ズーム: Ctrl + マウスホイール
  - パン: スペース + ドラッグ
  - キャンバスリセット: Ctrl + R
  - 保存: Ctrl + S
  - エクスポート: Ctrl + E

## テンプレート管理 (Template Management)
- テンプレートディレクトリ構造
  ```
  src/
  ├── templates/
  │   ├── flowcharts/
  │   │   ├── basic.json
  │   │   ├── decision.json
  │   │   └── process.json
  │   ├── mindmaps/
  │   │   ├── basic.json
  │   │   └── hierarchical.json
  │   └── networks/
  │       ├── basic.json
  │       └── complex.json
  ```
- テンプレートの種類
  - フローチャート
    - 基本フロー
    - 判断フロー
    - プロセスフロー
  - マインドマップ
    - 基本マップ
    - 階層構造マップ
  - ネットワーク図
    - 基本ネットワーク
    - 複雑ネットワーク