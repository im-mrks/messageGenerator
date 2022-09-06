'use strict';

// プレビュー自動更新用イベントリスナー
function autoPreview(event) {
    const preview = document.getElementById(event.currentTarget.dataset.previewId);
    preview.innerText = event.currentTarget.value;
    preview.innerHTML = setHyperlink(preview.innerHTML);
}

// ブロックを上にずらす
function moveUpper(obj) {
    // ブロック位置変更
    const pElement = obj.parentElement.parentElement;
    const upperPElement = pElement.previousElementSibling;
    if (upperPElement.className !== 'edit-block') {
        // 一番上なので何もしない
        return;
    }
    pElement.parentElement.insertBefore(pElement, upperPElement);

    // プレビュー更新
    const blockID = pElement.id;
    const previewHeader = document.getElementById('preview-header-' + blockID);
    const previewContent = document.getElementById('preview-content-' + blockID);
    const upperHeader = previewHeader.previousElementSibling.previousElementSibling;
    upperHeader.parentElement.insertBefore(previewHeader, upperHeader);
    upperHeader.parentElement.insertBefore(previewContent, upperHeader);
}

// ブロックを下にずらす
function moveLower(obj) {
    // ブロック位置変更
    const pElement = obj.parentElement.parentElement;
    const lowerPElement = pElement.nextElementSibling;
    if (lowerPElement.style['display'] === 'none') {
        // 一番下なので何もしない
        return;
    }
    pElement.parentElement.insertBefore(lowerPElement, pElement);

    // プレビュー更新
    const blockID = pElement.id;
    const previewHeader = document.getElementById('preview-header-' + blockID);
    const lowerHeader = previewHeader.nextElementSibling.nextElementSibling;
    const lowerContent = lowerHeader.nextElementSibling;
    lowerContent.parentElement.insertBefore(lowerHeader, previewHeader);
    lowerContent.parentElement.insertBefore(lowerContent, previewHeader);
}

// ブロックを削除
function removeBlock(obj) {
    // ブロック削除
    const pElement = obj.parentElement.parentElement;
    pElement.remove();

    // プレビュー更新
    const blockID = pElement.id;
    const previewHeader = document.getElementById('preview-header-' + blockID);
    const previewContent = document.getElementById('preview-content-' + blockID);
    previewHeader.remove();
    previewContent.remove();
}

let newBlockCount = 0;
// ブロックを追加
function addBlock(obj) {
    // タイトル取得
    const titleInput = document.getElementById('add-input');
    if (titleInput.value === '') {
        // タイトルが入力されてないので何もしない
        return;
    }
    const title = titleInput.value;
    titleInput.value = '';

    // 追加するブロックのid
    const newID = 'original-block-' + newBlockCount++;

    // ブロック追加
    const hiddenBlock = obj.parentElement.previousElementSibling;
    const clonedBlock = hiddenBlock.cloneNode(true);
    clonedBlock.style['display'] = '';
    clonedBlock.id = newID;
    clonedBlock.querySelector('label').innerText = title;
    clonedBlock.querySelector('.edit-input').dataset.previewId = 'preview-content-' + newID;
    clonedBlock.querySelector('.edit-input').addEventListener('input', autoPreview)
    hiddenBlock.parentElement.insertBefore(clonedBlock, hiddenBlock);

    // プレビュー追加
    const previewPElement = document.getElementById('preview');
    const previewHeader = document.createElement('span');
    previewHeader.id = 'preview-header-' + newID;
    previewHeader.innerText =　"＜" + title + "＞";
    previewPElement.appendChild(previewHeader);
    const previewContent = document.createElement('span');
    previewContent.id = 'preview-content-' + newID;
    previewPElement.appendChild(previewContent);
}

// 現在時刻設定
const nowTime = new Date();
const nowHour = String(nowTime.getHours()).padStart(2, '0');
const nowMin  = String(nowTime.getMinutes()).padStart(2, '0');
document.getElementById("preview-header-time").innerHTML = "今日 " + nowHour + ":" + nowMin;

// プレビュー設定
for (const inputField of document.querySelectorAll('.edit-input')) {
    inputField.addEventListener('input', autoPreview);
}
