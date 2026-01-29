# PR Title & URL Copier

GitHub/GitHub EnterpriseのPRとIssueのタイトルをハイパーリンク形式でコピーできるChrome拡張機能です。

## インストール

### 方法1: zipファイルからインストール（推奨）

1. [Releases](https://github.com/myumura/pr-copy-extension/releases)から最新の `pr-copy-extension.zip` をダウンロード
2. zipファイルを解凍
3. Chromeで `chrome://extensions/` を開く
4. 「デベロッパーモード」を有効化
5. 「パッケージ化されていない拡張機能を読み込む」をクリックし、解凍したフォルダを選択

### 方法2: リポジトリからインストール

```bash
git clone https://github.com/myumura/pr-copy-extension.git
```

その後、上記の手順3〜5を実行

## 使い方

PR/Issueページでタイトルの横に表示される「Copy」ボタンをクリックすると、`owner/repo - タイトル` の形式でハイパーリンクとしてコピーされます。

Slack、Notion、Gmail、Googleドキュメントなどに貼り付けると、クリック可能なリンクとして表示されます。
