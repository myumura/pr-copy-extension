// PRまたはIssueページかどうかをチェック
if (window.location.href.match(/\/(pull|issues)\/\d+/)) {
  // タイトル要素を取得（複数のセレクタを試す）
  const titleElement = document.querySelector('[data-testid="issue-title"]') ||
                       document.querySelector('.js-issue-title') ||
                       document.querySelector('bdi.js-issue-title') ||
                       document.querySelector('h1.gh-header-title');

  if (titleElement) {
    // ボタンを作成
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.id = 'pr-copy-button';
    copyButton.style.cssText = `
      margin-left: 12px;
      padding: 6px 12px;
      background-color: #2ea44f;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      vertical-align: middle;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    `;

    // ホバー効果
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.backgroundColor = '#2c974b';
    });
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.backgroundColor = '#2ea44f';
    });

    // クリックイベント
    copyButton.addEventListener('click', async () => {
      try {
        const url = window.location.href;

        const title = titleElement.textContent.trim();
        const pathMatch = url.match(/\/([^\/]+\/[^\/]+)\/(pull|issues)\/\d+/);
        const repo = pathMatch ? pathMatch[1] : '';

        const displayText = `${repo} - ${title}`;
        const htmlContent = `<a href="${url}">${displayText}</a>`;
        const plainText = `${displayText}\n${url}`;

        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([htmlContent], { type: 'text/html' }),
            'text/plain': new Blob([plainText], { type: 'text/plain' })
          })
        ]);

        showMessage('Copied', 'success');
      } catch (error) {
        console.error(error);
        showMessage('エラーが発生しました', 'error');
      }
    });

    // メッセージ表示用の関数
    function showMessage(text, type) {
      const originalText = copyButton.textContent;
      copyButton.textContent = text;
      copyButton.style.backgroundColor = type === 'success' ? '#2c974b' : '#dc3545';

      setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.style.backgroundColor = '#2ea44f';
      }, 2000);
    }

    // タイトルの親要素にボタンを追加
    titleElement.parentElement.appendChild(copyButton);
  }
}
