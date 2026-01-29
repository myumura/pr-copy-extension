# PR Title & URL Copier

GitHub/GitHub EnterpriseのPull RequestとIssueのタイトルとURLをハイパーリンク形式で簡単にコピーできるChrome拡張機能です。

## 機能

- Pull RequestまたはIssueページのタイトル横に「Copy」ボタンを表示
- ワンクリックでハイパーリンク形式（リッチテキスト）でクリップボードにコピー
- Slack、Notion、Gmail、Googleドキュメントなどに貼り付けると、クリック可能なリンクとして表示されます
- GitHub.comとGitHub Enterprise両方に対応

## インストール方法

1. Chrome で `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を有効にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. このフォルダ (`pr-copy-extension`) を選択

## 使い方

1. GitHubまたはGitHub EnterpriseのPull Request/Issueページを開く
2. タイトルの横に表示される「Copy」ボタンをクリック
3. ボタンが「Copied」に変わり、クリップボードにコピーされます
4. Slackなどに貼り付けると、以下の形式で表示されます：
   - 表示: `owner/repo - タイトル` （クリック可能なリンク）
   - プレーンテキスト: `owner/repo - タイトル` + URL

## コピー形式

ハイパーリンク形式（HTML）でコピーされるため、以下のようなツールで便利に使えます：
- Slack
- Notion
- Gmail
- Googleドキュメント
- その他、リッチテキストをサポートするツール
