// ハイパーリンクを付ける
const setHyperlink = (str) => str.replace(/https?:\/\/[\w/:%#$&?()~.=+\-]+/g, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>')