// ボタンを追加する関数
function addCopyButton() {
  // PRまたはIssueページかどうかをチェック
  if (!window.location.href.match(/\/(pull|issues)\/\d+/)) {
    return;
  }

  // 既にボタンが存在する場合は追加しない
  if (document.getElementById('pr-copy-button')) {
    return;
  }

  // タイトル要素を取得（複数のセレクタを試す）
  const titleElement = document.querySelector('[data-testid="issue-title"]') ||
                       document.querySelector('.js-issue-title') ||
                       document.querySelector('bdi.js-issue-title') ||
                       document.querySelector('h1.gh-header-title');

  if (!titleElement) {
    return;
  }

  // ボタンを作成
  const copyButton = document.createElement('button');
  copyButton.innerHTML = `
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
  `;
  copyButton.id = 'pr-copy-button';
  copyButton.title = 'Copy PR/Issue title and URL';
  copyButton.style.cssText = `
    margin-left: 8px;
    padding: 6px;
    background-color: transparent;
    color: #57606a;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  `;

  // ホバー効果
  copyButton.addEventListener('mouseenter', () => {
    copyButton.style.backgroundColor = '#f3f4f6';
  });
  copyButton.addEventListener('mouseleave', () => {
    copyButton.style.backgroundColor = 'transparent';
  });

  // クリックイベント
  copyButton.addEventListener('click', async () => {
    try {
      const url = window.location.href;

      const title = titleElement.textContent.trim();
      const pathMatch = url.match(/\/([^\/]+\/[^\/]+)\/(pull|issues)\/(\d+)/);
      const repo = pathMatch ? pathMatch[1] : '';
      const type = pathMatch ? pathMatch[2] : 'pull';
      const number = pathMatch ? pathMatch[3] : '';

      // ベースURLを構築（/files などのタブを除く）
      const baseUrl = url.split(`/${type}/${number}`)[0] + `/${type}/${number}`;

      const displayText = `${repo} - ${title}`;
      const htmlContent = `<a href="${baseUrl}">${displayText}</a>`;
      const plainText = `${displayText}\n${baseUrl}`;

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
    const originalHTML = copyButton.innerHTML;
    const originalColor = copyButton.style.color;
    const checkIcon = `
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" fill="currentColor">
        <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
      </svg>
    `;

    if (type === 'success') {
      copyButton.innerHTML = checkIcon;
      copyButton.style.color = '#2da44e';
    } else {
      copyButton.innerHTML = '✗';
      copyButton.style.color = '#dc3545';
    }

    setTimeout(() => {
      copyButton.innerHTML = originalHTML;
      copyButton.style.color = originalColor;
    }, 2000);
  }

  // タイトルの親要素にボタンを追加
  titleElement.parentElement.appendChild(copyButton);
}

// 初回実行
addCopyButton();

// URL変更を監視（SPAのページ遷移に対応）
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // URL変更後、少し待ってからボタンを追加（DOMの更新を待つ）
    setTimeout(addCopyButton, 100);
  }
}).observe(document.body, { subtree: true, childList: true });

// turbo:load イベントでも追加を試みる（GitHub/GHEのSPA遷移に対応）
document.addEventListener('turbo:load', addCopyButton);
document.addEventListener('turbo:render', addCopyButton);
