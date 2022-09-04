'use strict';
// 現在時刻設定
const nowTime = new Date();
const nowHour = String(nowTime.getHours()).padStart(2, '0');
const nowMin  = String(nowTime.getMinutes()).padStart(2, '0');
document.getElementById("preview-header-time").innerHTML = "今日 " + nowHour + ":" + nowMin;

// プレビュー設定
let inputField;
inputField = document.getElementById('edit-top').querySelector('input');
inputField.addEventListener('input', (event) => {
    const preview = document.getElementById('preview-content-top');
    preview.innerText = "出勤します。" + event.currentTarget.value;
    preview.innerHTML = setHyperlink(preview.innerHTML);
});
inputField = document.getElementById('edit-mdl').querySelector('textarea');
inputField.addEventListener('input', (event) => {
    const preview = document.getElementById('preview-content-mdl');
    preview.innerText = event.currentTarget.value;
    preview.innerHTML = setHyperlink(preview.innerHTML);
});