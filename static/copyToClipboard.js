// コピー
async function copyToClipboard () {
    let msg = "";
    const previewContents = document.getElementById('preview').querySelectorAll('span');
    for (const previewContent of previewContents) {
        if (previewContent.innerText === '') {
            // 空文字列はスルー
        } else {
            msg += previewContent.innerText + "\n";
        }
    }
    await navigator.clipboard.writeText(msg.trim());
    window.alert('クリップボードにコピーしました。');
}